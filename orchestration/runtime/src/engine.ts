import { randomUUID } from "node:crypto";
import { assertTransition } from "./state-machine.js";
import { StructuredConditionEvaluator, type StepConditionEvaluator } from "./conditions.js";
import type {
  AgentRunner, ExecutionEvent, ExecutionRecord, GateEvaluator, WorkflowContext,
  WorkflowDefinition, WorkflowStep
} from "./types.js";
import type { ExecutionStore } from "./store.js";
import type { ExecutionEventSink, MetricsCollector } from "./observability.js";

export class Orchestrator {
  constructor(
    private readonly agentRunner: AgentRunner,
    private readonly gateEvaluator: GateEvaluator,
    private readonly conditionEvaluator: StepConditionEvaluator = new StructuredConditionEvaluator(),
    private readonly executionStore?: ExecutionStore,
    private readonly eventSink?: ExecutionEventSink,
    private readonly metricsCollector?: MetricsCollector
  ) {}

  async execute(workflow: WorkflowDefinition, context: WorkflowContext): Promise<ExecutionRecord> {
    const record: ExecutionRecord = {
      executionId: randomUUID(),
      workflowId: workflow.id,
      workflowVersion: workflow.version,
      status: "CREATED",
      events: [],
      results: {}
    };

    this.transition(record, "INTAKE", "Execution created.");
    await this.executionStore?.create(record);

    for (const field of workflow.context.required) {
      if (!(field in context.values)) {
        this.transition(record, "BLOCKED", `Missing required context: ${field}`);
        return this.finish(record);
      }
    }

    this.transition(record, "CONTEXT_READY", "Required context is available.");

    let step: WorkflowStep | undefined = workflow.steps[0];

    while (step) {
      record.currentStep = step.id;

      const condition = this.conditionEvaluator.evaluate(step, context);
      this.emit(record, {
        timestamp: new Date().toISOString(),
        executionId: record.executionId,
        type: `STEP_CONDITION_${condition.decision}`,
        state: record.status,
        stepId: step.id,
        agent: step.agent,
        detail: `${condition.reason} Evidence: ${condition.evidence.join("; ")}`
      });

      if (condition.decision === "BLOCKED") {
        this.transition(record, "BLOCKED", `Condition for ${step.id} cannot be evaluated safely.`);
        return this.finish(record);
      }

      if (condition.decision === "NOT_REQUIRED") {
        if (record.status === "CONTEXT_READY" || record.status === "ACCEPTED") {
          this.transition(record, "STEP_READY", `Step ${step.id} skipped by structured condition.`);
        }
        step = this.nextStep(workflow, step);
        if (!step) {
          this.transition(record, "MEMORY_REVIEW", "Required execution steps completed.");
          this.transition(record, "COMPLETED", "Workflow completed.");
        }
        continue;
      }

      if (step.gates.length) {
        this.transition(record, "GATE_PENDING", `Gate required before ${step.id}.`);
        for (const gate of step.gates) {
          const decision = await this.gateEvaluator.evaluate(gate, context);
          this.emit(record, {
            timestamp: new Date().toISOString(),
            executionId: record.executionId,
            type: "GATE_EVALUATED",
            state: record.status,
            stepId: step.id,
            detail: `Gate ${gate}: ${decision.decision}`
          });
          if (decision.decision !== "APPROVED") {
            const target = decision.decision === "APPROVAL_REQUIRED"
              ? "APPROVAL_REQUIRED"
              : decision.decision === "ESCALATED"
                ? "ESCALATED"
                : "BLOCKED";
            this.emit(record, {
              timestamp: new Date().toISOString(),
              executionId: record.executionId,
              type: decision.decision === "APPROVAL_REQUIRED" ? "APPROVAL_REQUIRED" : "GATE_REJECTED",
              state: record.status,
              stepId: step.id,
              detail: decision.reason ?? `Gate ${gate} did not approve.`
            });
            this.transition(record, target, decision.reason ?? `Gate ${gate} did not approve.`);
            return this.finish(record);
          }
        }
        this.transition(record, "APPROVED", `Gates approved for ${step.id}.`);
      }

      this.transition(record, "STEP_READY", `Step ${step.id} ready.`);
      this.transition(record, "AGENT_RUNNING", `Running agent ${step.agent}.`);
      this.emit(record, {
        timestamp: new Date().toISOString(),
        executionId: record.executionId,
        type: "AGENT_STARTED",
        state: record.status,
        stepId: step.id,
        agent: step.agent,
        detail: `Running agent ${step.agent}.`
      });

      const result = await this.agentRunner.run(step, context);
      record.results[step.id] = result;

      if (result.status === "BLOCKED") {
        this.emit(record, {
          timestamp: new Date().toISOString(),
          executionId: record.executionId,
          type: "AGENT_BLOCKED",
          state: record.status,
          stepId: step.id,
          agent: step.agent
        });
        this.transition(record, "BLOCKED", `Agent blocked step ${step.id}.`);
        return this.finish(record);
      }
      if (result.status === "FAIL") {
        this.emit(record, {
          timestamp: new Date().toISOString(),
          executionId: record.executionId,
          type: "AGENT_FAILED",
          state: record.status,
          stepId: step.id,
          agent: step.agent
        });
        this.transition(record, "FAILED", `Agent failed step ${step.id}.`);
        return this.finish(record);
      }

      this.transition(record, "HANDOFF_VALIDATION", `Validating handoff from ${step.agent}.`);

      if (!this.isHandoffValid(result)) {
        this.emit(record, {
          timestamp: new Date().toISOString(),
          executionId: record.executionId,
          type: "HANDOFF_REJECTED",
          state: record.status,
          stepId: step.id,
          agent: step.agent,
          detail: `Handoff from ${step.agent} is incomplete.`
        });
        this.transition(record, "REJECTED", `Handoff from ${step.agent} is incomplete.`);
        return this.finish(record);
      }

      this.transition(record, "ACCEPTED", `Handoff from ${step.agent} accepted.`);

      step = this.nextStep(workflow, step);
      if (!step) {
        this.transition(record, "MEMORY_REVIEW", "Required execution steps completed.");
        this.transition(record, "COMPLETED", "Workflow completed.");
      }
    }

    return this.finish(record);
  }

  private async finish(record: ExecutionRecord): Promise<ExecutionRecord> {
    await this.executionStore?.save(record);
    this.metricsCollector?.observe(record);
    return record;
  }

  private nextStep(workflow: WorkflowDefinition, current: WorkflowStep): WorkflowStep | undefined {
    return current.next
      .map((id) => workflow.steps.find((item) => item.id === id))
      .find((candidate): candidate is WorkflowStep => candidate !== undefined);
  }

  private isHandoffValid(result: {
    status: string; objective: string; validation: readonly string[]; limitations: readonly string[];
  }): boolean {
    return Boolean(result.objective) &&
      Array.isArray(result.validation) &&
      Array.isArray(result.limitations) &&
      result.status !== "PARTIAL";
  }

  private emit(record: ExecutionRecord, event: ExecutionEvent) {
    record.events.push(event);
    void this.eventSink?.emit(event);
  }

  private transition(record: ExecutionRecord, next: ExecutionRecord["status"], detail: string) {
    assertTransition(record.status, next);
    record.status = next;
    this.emit(record, {
      timestamp: new Date().toISOString(),
      executionId: record.executionId,
      type: "STATE_TRANSITION",
      state: next,
      stepId: record.currentStep,
      detail
    });
  }
}

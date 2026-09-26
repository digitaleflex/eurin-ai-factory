import { randomUUID } from "node:crypto";
import { assertTransition } from "./state-machine.js";
import type {
  AgentRunner, ExecutionRecord, GateEvaluator, WorkflowContext,
  WorkflowDefinition, WorkflowStep
} from "./types.js";

export class Orchestrator {
  constructor(
    private readonly agentRunner: AgentRunner,
    private readonly gateEvaluator: GateEvaluator
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

    for (const field of workflow.context.required) {
      if (!(field in context.values)) {
        this.transition(record, "BLOCKED", `Missing required context: ${field}`);
        return record;
      }
    }

    this.transition(record, "CONTEXT_READY", "Required context is available.");

    const firstStep = workflow.steps[0];
    if (!firstStep) {
      this.transition(record, "MEMORY_REVIEW", "No executable step found.");
      this.transition(record, "COMPLETED", "Workflow completed.");
      return record;
    }

    let step: WorkflowStep | undefined = firstStep;

    while (step) {
      record.currentStep = step.id;

      if (step.gates.length) {
        this.transition(record, "GATE_PENDING", `Gate required before ${step.id}.`);
        for (const gate of step.gates) {
          const decision = await this.gateEvaluator.evaluate(gate, context);
          if (decision.decision !== "APPROVED") {
            const target = decision.decision === "ESCALATED" ? "ESCALATED" : "BLOCKED";
            this.transition(record, target, decision.reason ?? `Gate ${gate} did not approve.`);
            return record;
          }
        }
        this.transition(record, "APPROVED", `Gates approved for ${step.id}.`);
      }

      this.transition(record, "STEP_READY", `Step ${step.id} ready.`);
      this.transition(record, "AGENT_RUNNING", `Running agent ${step.agent}.`);

      const result = await this.agentRunner.run(step, context);
      record.results[step.id] = result;

      if (result.status === "BLOCKED") {
        this.transition(record, "BLOCKED", `Agent blocked step ${step.id}.`);
        return record;
      }
      if (result.status === "FAIL") {
        this.transition(record, "FAILED", `Agent failed step ${step.id}.`);
        return record;
      }

      this.transition(record, "HANDOFF_VALIDATION", `Validating handoff from ${step.agent}.`);

      if (!this.isHandoffValid(result)) {
        this.transition(record, "REJECTED", `Handoff from ${step.agent} is incomplete.`);
        return record;
      }

      this.transition(record, "ACCEPTED", `Handoff from ${step.agent} accepted.`);

      step = this.nextRequiredStep(workflow, step);
      if (!step) {
        this.transition(record, "MEMORY_REVIEW", "Required execution steps completed.");
        this.transition(record, "COMPLETED", "Workflow completed.");
      }
    }

    return record;
  }

  private nextRequiredStep(workflow: WorkflowDefinition, current: WorkflowStep) {
    for (const id of current.next) {
      const candidate = workflow.steps.find((item) => item.id === id);
      if (candidate?.condition === "REQUIRED") return candidate;
    }
    return undefined;
  }

  private isHandoffValid(result: {
    status: string; objective: string; validation: string[]; limitations: string[];
  }): boolean {
    return Boolean(result.objective) &&
      Array.isArray(result.validation) &&
      Array.isArray(result.limitations) &&
      result.status !== "PARTIAL";
  }

  private transition(record: ExecutionRecord, next: ExecutionRecord["status"], detail: string) {
    assertTransition(record.status, next);
    record.status = next;
    record.events.push({
      timestamp: new Date().toISOString(),
      executionId: record.executionId,
      type: "STATE_TRANSITION",
      state: next,
      stepId: record.currentStep,
      detail
    });
  }
}

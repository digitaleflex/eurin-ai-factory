import type { AgentResult, WorkflowContext, WorkflowStep } from "./types.js";

export interface AgentAdapter {
  readonly agentId: string;
  run(step: WorkflowStep, context: WorkflowContext): Promise<AgentResult>;
}

export class AgentAdapterRegistry {
  private readonly adapters = new Map<string, AgentAdapter>();

  register(adapter: AgentAdapter): void {
    if (!adapter.agentId.trim()) throw new Error("Agent adapter id is required.");
    if (this.adapters.has(adapter.agentId)) {
      throw new Error(`Duplicate agent adapter: ${adapter.agentId}`);
    }
    this.adapters.set(adapter.agentId, adapter);
  }

  registerAll(adapters: AgentAdapter[]): void {
    for (const adapter of adapters) this.register(adapter);
  }

  has(agentId: string): boolean {
    return this.adapters.has(agentId);
  }

  list(): string[] {
    return [...this.adapters.keys()].sort();
  }

  get(agentId: string): AgentAdapter {
    const adapter = this.adapters.get(agentId);
    if (!adapter) throw new Error(`Unknown agent adapter: ${agentId}`);
    return adapter;
  }
}

export class RegistryAgentRunner {
  constructor(private readonly registry: AgentAdapterRegistry) {}

  async run(step: WorkflowStep, context: WorkflowContext): Promise<AgentResult> {
    const adapter = this.registry.get(step.agent);
    const result = await adapter.run(step, context);
    return normalizeAgentResult(result, step);
  }
}

export function normalizeAgentResult(result: unknown, step: WorkflowStep): AgentResult {
  if (!result || typeof result !== "object") {
    throw new Error(`Agent ${step.agent} returned a malformed result.`);
  }

  const candidate = result as Partial<AgentResult>;
  const validStatuses = new Set(["PASS", "FAIL", "BLOCKED", "PARTIAL"]);

  const status = candidate.status;
  if (!status || !validStatuses.has(status)) {
    throw new Error(`Agent ${step.agent} returned an invalid status.`);
  }
  if (typeof candidate.objective !== "string" || !candidate.objective.trim()) {
    throw new Error(`Agent ${step.agent} result is missing objective.`);
  }
  if (typeof candidate.workPerformed !== "string") {
    throw new Error(`Agent ${step.agent} result is missing workPerformed.`);
  }

  for (const field of ["filesChanged", "validation", "risks", "assumptions", "limitations"] as const) {
    if (!Array.isArray(candidate[field])) {
      throw new Error(`Agent ${step.agent} result field ${field} must be an array.`);
    }
  }

  return {
    status,
    objective: candidate.objective,
    workPerformed: candidate.workPerformed,
    filesChanged: candidate.filesChanged as string[],
    validation: candidate.validation as string[],
    risks: candidate.risks as string[],
    assumptions: candidate.assumptions as string[],
    limitations: candidate.limitations as string[],
    nextAction: candidate.nextAction
  };
}

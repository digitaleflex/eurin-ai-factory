export type WorkflowStatus =
  | "CREATED" | "INTAKE" | "CONTEXT_READY" | "GATE_PENDING"
  | "BLOCKED" | "ESCALATED" | "APPROVAL_REQUIRED" | "APPROVED" | "STEP_READY"
  | "AGENT_RUNNING" | "FAILED" | "HANDOFF_VALIDATION"
  | "REJECTED" | "ACCEPTED" | "DELIVERY" | "MEMORY_REVIEW" | "COMPLETED";

export type StepCondition = "REQUIRED" | "CONDITIONAL" | "OPTIONAL";
export type FailurePolicy = "RETRY" | "REVISE" | "ESCALATE" | "BLOCK" | "ABORT";

export interface WorkflowStep {
  id: string;
  agent: string;
  objective: string;
  required: boolean;
  condition: StepCondition;
  inputs: readonly string[];
  skills: readonly string[];
  gates: readonly string[];
  outputs: readonly string[];
  failure_policy: FailurePolicy;
  next: readonly string[];
}

export interface WorkflowDefinition {
  id: string;
  version: string;
  purpose: string;
  owner?: string;
  trigger: string;
  context: { readonly required: readonly string[]; readonly optional?: readonly string[] };
  preconditions: ReadonlyArray<{ readonly condition: string; readonly failure_policy: FailurePolicy }>;
  steps: readonly WorkflowStep[];
  exit_criteria: readonly string[];
  memory_review?: { required: boolean };
}

export interface WorkflowContext { values: Record<string, unknown> }

export interface AgentResult {
  status: "PASS" | "FAIL" | "BLOCKED" | "PARTIAL";
  objective: string;
  workPerformed: string;
  filesChanged: readonly string[];
  validation: readonly string[];
  risks: readonly string[];
  assumptions: readonly string[];
  limitations: readonly string[];
  nextAction?: string;
}

export interface AgentRunner {
  run(step: WorkflowStep, context: WorkflowContext): Promise<AgentResult>;
}

export interface GateDecision {
  gateId: string;
  decision: "APPROVED" | "REJECTED" | "ESCALATED" | "APPROVAL_REQUIRED" | "BLOCKED";
  reason?: string;
}

export interface GateEvaluator {
  evaluate(gateId: string, context: WorkflowContext): Promise<GateDecision>;
}

export interface ExecutionEvent {
  timestamp: string;
  executionId: string;
  type: string;
  state: WorkflowStatus;
  stepId?: string;
  agent?: string;
  detail?: string;
}

export interface ExecutionRecord {
  executionId: string;
  workflowId: string;
  workflowVersion: string;
  status: WorkflowStatus;
  currentStep?: string;
  events: ExecutionEvent[];
  results: Record<string, AgentResult>;
}

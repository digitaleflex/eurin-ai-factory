export type WorkflowStatus =
  | "CREATED" | "INTAKE" | "CONTEXT_READY" | "GATE_PENDING"
  | "BLOCKED" | "ESCALATED" | "APPROVED" | "STEP_READY"
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
  inputs: string[];
  skills: string[];
  gates: string[];
  outputs: string[];
  failure_policy: FailurePolicy;
  next: string[];
}

export interface WorkflowDefinition {
  id: string;
  version: string;
  purpose: string;
  owner?: string;
  trigger: string;
  context: { required: string[]; optional?: string[] };
  preconditions: Array<{ condition: string; failure_policy: FailurePolicy }>;
  steps: WorkflowStep[];
  exit_criteria: string[];
  memory_review?: { required: boolean };
}

export interface WorkflowContext { values: Record<string, unknown> }

export interface AgentResult {
  status: "PASS" | "FAIL" | "BLOCKED" | "PARTIAL";
  objective: string;
  workPerformed: string;
  filesChanged: string[];
  validation: string[];
  risks: string[];
  assumptions: string[];
  limitations: string[];
  nextAction?: string;
}

export interface AgentRunner {
  run(step: WorkflowStep, context: WorkflowContext): Promise<AgentResult>;
}

export interface GateDecision {
  gateId: string;
  decision: "APPROVED" | "REJECTED" | "ESCALATED" | "BLOCKED";
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

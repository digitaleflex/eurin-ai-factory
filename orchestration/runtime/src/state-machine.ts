import type { WorkflowStatus } from "./types.js";

const transitions: Record<WorkflowStatus, WorkflowStatus[]> = {
  CREATED: ["INTAKE"],
  INTAKE: ["CONTEXT_READY", "BLOCKED"],
  CONTEXT_READY: ["GATE_PENDING", "STEP_READY"],
  GATE_PENDING: ["APPROVED", "APPROVAL_REQUIRED", "BLOCKED", "ESCALATED"],
  APPROVAL_REQUIRED: ["APPROVED", "BLOCKED", "ESCALATED"],
  BLOCKED: ["INTAKE", "CONTEXT_READY", "STEP_READY"],
  ESCALATED: ["APPROVED", "BLOCKED"],
  APPROVED: ["STEP_READY"],
  STEP_READY: ["AGENT_RUNNING", "DELIVERY", "MEMORY_REVIEW"],
  AGENT_RUNNING: ["FAILED", "BLOCKED", "HANDOFF_VALIDATION"],
  FAILED: ["STEP_READY", "BLOCKED", "ESCALATED"],
  HANDOFF_VALIDATION: ["REJECTED", "ACCEPTED"],
  REJECTED: ["STEP_READY", "BLOCKED"],
  ACCEPTED: ["STEP_READY", "DELIVERY", "MEMORY_REVIEW"],
  DELIVERY: ["MEMORY_REVIEW", "COMPLETED", "BLOCKED", "ESCALATED"],
  MEMORY_REVIEW: ["COMPLETED", "BLOCKED"],
  COMPLETED: []
};

export function assertTransition(from: WorkflowStatus, to: WorkflowStatus): void {
  if (!transitions[from].includes(to))
    throw new Error(`Invalid workflow transition: ${from} -> ${to}`);
}

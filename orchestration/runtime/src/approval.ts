import { randomUUID } from "node:crypto";
import type { GateDecision, GateEvaluator, WorkflowContext } from "./types.js";

export interface ApprovalRequest {
  approvalId: string;
  gateId: string;
  createdAt: string;
  summary: string;
  impact: string[];
  evidence: string[];
  options: string[];
}

export interface ApprovalDecision {
  approvalId: string;
  decision: "APPROVED" | "REJECTED";
  actor: string;
  decidedAt: string;
  rationale: string;
}

export interface HumanApprovalAdapter {
  request(input: Omit<ApprovalRequest, "approvalId" | "createdAt">): Promise<ApprovalRequest>;
  getDecision(approvalId: string): Promise<ApprovalDecision | undefined>;
  decide(input: ApprovalDecision): Promise<void>;
}

export class InMemoryHumanApprovalAdapter implements HumanApprovalAdapter {
  private readonly requests = new Map<string, ApprovalRequest>();
  private readonly decisions = new Map<string, ApprovalDecision>();

  async request(input: Omit<ApprovalRequest, "approvalId" | "createdAt">): Promise<ApprovalRequest> {
    const request: ApprovalRequest = {
      ...input,
      approvalId: randomUUID(),
      createdAt: new Date().toISOString()
    };
    this.requests.set(request.approvalId, request);
    return request;
  }

  async getDecision(approvalId: string): Promise<ApprovalDecision | undefined> {
    return this.decisions.get(approvalId);
  }

  async decide(input: ApprovalDecision): Promise<void> {
    if (!this.requests.has(input.approvalId)) {
      throw new Error(`Unknown approval request: ${input.approvalId}`);
    }
    this.decisions.set(input.approvalId, input);
  }

  listRequests(): ApprovalRequest[] {
    return [...this.requests.values()];
  }
}

export class HumanApprovalGateEvaluator implements GateEvaluator {
  constructor(
    private readonly adapter: HumanApprovalAdapter,
    private readonly requestByGate = new Map<string, string>()
  ) {}

  async evaluate(gateId: string, context: WorkflowContext): Promise<GateDecision> {
    let approvalId = this.requestByGate.get(gateId);

    if (!approvalId) {
      const request = await this.adapter.request({
        gateId,
        summary: `Human approval required for gate ${gateId}.`,
        impact: ["Execution is paused before the gated action."],
        evidence: this.safeEvidence(context),
        options: ["APPROVE", "REJECT"]
      });
      approvalId = request.approvalId;
      this.requestByGate.set(gateId, approvalId);
    }

    const decision = await this.adapter.getDecision(approvalId);
    if (!decision) {
      return {
        gateId,
        decision: "APPROVAL_REQUIRED",
        reason: `Human approval required. Approval request: ${approvalId}`
      };
    }

    return {
      gateId,
      decision: decision.decision,
      reason: decision.rationale
    };
  }

  private safeEvidence(context: WorkflowContext): string[] {
    return Object.keys(context.values)
      .filter((key) => !/secret|token|password|credential|api[_-]?key/i.test(key))
      .map((key) => `context field available: ${key}`);
  }
}

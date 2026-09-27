import test from "node:test";
import assert from "node:assert/strict";
import { HumanApprovalGateEvaluator, InMemoryHumanApprovalAdapter } from "../src/approval.js";

test("creates a pending human approval request", async () => {
  const adapter = new InMemoryHumanApprovalAdapter();
  const evaluator = new HumanApprovalGateEvaluator(adapter);

  const result = await evaluator.evaluate("production-gate", {
    values: { project: "demo", source_of_truth: "spec", token: "must-not-leak" }
  });

  assert.equal(result.decision, "APPROVAL_REQUIRED");
  assert.match(result.reason ?? "", /Approval request/);
  assert.equal(adapter.listRequests()[0]?.evidence.some((item) => item.includes("token")), false);
});

test("returns approved decision after human decision", async () => {
  const adapter = new InMemoryHumanApprovalAdapter();
  const evaluator = new HumanApprovalGateEvaluator(adapter);
  await evaluator.evaluate("production-gate", { values: { project: "demo" } });

  const request = adapter.listRequests()[0];
  assert.ok(request);

  await adapter.decide({
    approvalId: request.approvalId,
    decision: "APPROVED",
    actor: "eurin",
    decidedAt: new Date().toISOString(),
    rationale: "Approved after review."
  });

  const result = await evaluator.evaluate("production-gate", { values: { project: "demo" } });
  assert.equal(result.decision, "APPROVED");
});

test("returns rejected decision after human decision", async () => {
  const adapter = new InMemoryHumanApprovalAdapter();
  const evaluator = new HumanApprovalGateEvaluator(adapter);
  await evaluator.evaluate("security-gate", { values: { project: "demo" } });

  const request = adapter.listRequests()[0];
  assert.ok(request);

  await adapter.decide({
    approvalId: request.approvalId,
    decision: "REJECTED",
    actor: "eurin",
    decidedAt: new Date().toISOString(),
    rationale: "Risk not accepted."
  });

  const result = await evaluator.evaluate("security-gate", { values: { project: "demo" } });
  assert.equal(result.decision, "REJECTED");
});

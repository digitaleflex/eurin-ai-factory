import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { WorkflowRegistry } from "../src/registry.js";
import { ContextRouter } from "../src/router.js";

const workflowsDir = join(process.cwd(), "..", "workflows");

test("registry loads and lists V1 workflows", async () => {
  const registry = new WorkflowRegistry();
  await registry.loadDirectory(workflowsDir);

  const ids = registry.list().map((item) => item.id);
  assert.deepEqual(ids, ["bug-fix", "feature-delivery", "security-review"]);
  assert.equal(registry.get("feature-delivery", "1.0").version, "1.0");
});

test("registry rejects duplicate id/version", () => {
  const registry = new WorkflowRegistry();
  const workflow = {
    id: "example", version: "1.0", purpose: "Example", trigger: "test",
    context: { required: ["project"] }, preconditions: [],
    steps: [{ id: "step", agent: "test", objective: "Test", required: true, condition: "REQUIRED",
      inputs: [], skills: [], gates: [], outputs: [], failure_policy: "BLOCK", next: [] }],
    exit_criteria: ["done"]
  } as const;

  registry.register(workflow);
  assert.throws(() => registry.register(workflow), /Duplicate workflow version/);
});

test("router routes explicit feature request", async () => {
  const registry = new WorkflowRegistry();
  await registry.loadDirectory(workflowsDir);
  const decision = new ContextRouter(registry).route({
    request: "Implement a new feature for the dashboard",
    project: "demo",
    sourceOfTruth: "product-spec"
  });

  assert.equal(decision.status, "ROUTED");
  assert.equal(decision.workflowId, "feature-delivery");
  assert.deepEqual(decision.requiredContext, ["project", "source_of_truth"]);
});

test("router blocks ambiguous requests", async () => {
  const registry = new WorkflowRegistry();
  await registry.loadDirectory(workflowsDir);
  const decision = new ContextRouter(registry).route({
    request: "Fix the security vulnerability and add a security feature",
    project: "demo",
    sourceOfTruth: "security-report"
  });

  assert.equal(decision.status, "ESCALATED");
});

test("router supports explicit workflow override", async () => {
  const registry = new WorkflowRegistry();
  await registry.loadDirectory(workflowsDir);
  const decision = new ContextRouter(registry).route({
    request: "Anything",
    project: "demo",
    sourceOfTruth: "issue",
    workflowId: "bug-fix",
    workflowVersion: "1.0"
  });

  assert.equal(decision.status, "ROUTED");
  assert.equal(decision.workflowId, "bug-fix");
});

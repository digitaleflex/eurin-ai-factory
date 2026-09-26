import test from "node:test";
import assert from "node:assert/strict";
import { Orchestrator } from "../src/engine.js";
import type { AgentRunner, GateEvaluator, WorkflowDefinition } from "../src/types.js";

const workflow: WorkflowDefinition = {
  id: "test-workflow",
  version: "1.0",
  purpose: "Test orchestration.",
  trigger: "test",
  context: { required: ["project"] },
  preconditions: [],
  steps: [
    {
      id: "product", agent: "product", objective: "Define objective.",
      required: true, condition: "REQUIRED", inputs: ["project"], skills: [],
      gates: ["product-gate"], outputs: ["product-spec"], failure_policy: "REVISE",
      next: ["developer"]
    },
    {
      id: "developer", agent: "developer", objective: "Implement change.",
      required: true, condition: "REQUIRED", inputs: ["product-spec"], skills: [],
      gates: [], outputs: ["implementation"], failure_policy: "REVISE", next: []
    }
  ],
  exit_criteria: ["completed"]
};

const runner: AgentRunner = {
  async run(step) {
    return {
      status: "PASS", objective: step.objective, workPerformed: "Test execution.",
      filesChanged: [], validation: ["validated"], risks: [], assumptions: [], limitations: []
    };
  }
};

const gates: GateEvaluator = {
  async evaluate(gateId) { return { gateId, decision: "APPROVED" }; }
};

test("executes approved steps", async () => {
  const result = await new Orchestrator(runner, gates).execute(
    workflow, { values: { project: "test-project" } }
  );
  assert.equal(result.status, "COMPLETED");
  assert.equal(result.results.product.status, "PASS");
  assert.equal(result.results.developer.status, "PASS");
});

test("blocks missing required context", async () => {
  const result = await new Orchestrator(runner, gates).execute(workflow, { values: {} });
  assert.equal(result.status, "BLOCKED");
  assert.match(result.events.at(-1)?.detail ?? "", /Missing required context/);
});

test("blocks a rejected gate", async () => {
  const rejectingGate: GateEvaluator = {
    async evaluate(gateId) { return { gateId, decision: "REJECTED", reason: "Human decision required." }; }
  };
  const result = await new Orchestrator(runner, rejectingGate).execute(
    workflow, { values: { project: "test-project" } }
  );
  assert.equal(result.status, "BLOCKED");
});

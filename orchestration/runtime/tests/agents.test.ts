import test from "node:test";
import assert from "node:assert/strict";
import { AgentAdapterRegistry, RegistryAgentRunner } from "../src/agents.js";

const step = {
  id: "product", agent: "product", objective: "Define product scope.",
  required: true, condition: "REQUIRED", inputs: [], skills: [],
  gates: [], outputs: ["product-spec"], failure_policy: "REVISE", next: []
} as const;

const context = { values: { project: "demo", source_of_truth: "spec" } };

const result = {
  status: "PASS" as const,
  objective: step.objective,
  workPerformed: "Scope clarified.",
  filesChanged: [],
  validation: ["Acceptance criteria reviewed."],
  risks: [],
  assumptions: [],
  limitations: []
};

test("registers and executes an agent adapter", async () => {
  const registry = new AgentAdapterRegistry();
  registry.register({
    agentId: "product",
    async run() { return result; }
  });

  const output = await new RegistryAgentRunner(registry).run(step, context);
  assert.equal(output.status, "PASS");
  assert.deepEqual(registry.list(), ["product"]);
});

test("rejects duplicate agent adapters", () => {
  const registry = new AgentAdapterRegistry();
  const adapter = { agentId: "product", async run() { return result; } };
  registry.register(adapter);
  assert.throws(() => registry.register(adapter), /Duplicate agent adapter/);
});

test("fails safely for unknown agent", async () => {
  const registry = new AgentAdapterRegistry();
  await assert.rejects(
    () => new RegistryAgentRunner(registry).run(step, context),
    /Unknown agent adapter/
  );
});

test("rejects malformed agent output", async () => {
  const registry = new AgentAdapterRegistry();
  registry.register({
    agentId: "product",
    async run() { return { status: "PASS" }; }
  });

  await assert.rejects(
    () => new RegistryAgentRunner(registry).run(step, context),
    /missing objective/
  );
});

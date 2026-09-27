import test from "node:test";
import assert from "node:assert/strict";
import { StructuredConditionEvaluator } from "../src/conditions.js";

const evaluator = new StructuredConditionEvaluator();

const conditional = {
  id: "security", agent: "security", objective: "Review security impact.",
  required: false, condition: "CONDITIONAL", inputs: [], skills: [],
  gates: [], outputs: [], failure_policy: "ESCALATE", next: []
} as const;

test("marks a conditional step REQUIRED when explicitly requested", () => {
  const result = evaluator.evaluate(conditional, { values: { required_steps: ["security"] } });
  assert.equal(result.decision, "REQUIRED");
});

test("marks a conditional step NOT_REQUIRED when explicitly absent", () => {
  const result = evaluator.evaluate(conditional, { values: { required_steps: [] } });
  assert.equal(result.decision, "NOT_REQUIRED");
});

test("blocks a conditional step when its structured requirement is missing", () => {
  const result = evaluator.evaluate(conditional, { values: {} });
  assert.equal(result.decision, "BLOCKED");
});

test("always requires REQUIRED steps", () => {
  const required = { ...conditional, condition: "REQUIRED", required: true } as const;
  const result = evaluator.evaluate(required, { values: {} });
  assert.equal(result.decision, "REQUIRED");
});

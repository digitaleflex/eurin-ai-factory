import test from "node:test";
import assert from "node:assert/strict";
import { FactoryMemoryEngine, InMemoryMemoryStore } from "../src/memory.ts";

function input(id = "mem-1") {
  return {
    id,
    type: "LESSON" as const,
    context: "orchestration runtime V1",
    observation: "Handoffs require explicit validation.",
    evidence: ["QA workflow specification", "Runtime handoff contract"],
    insight: "Explicit handoff validation prevents silent contract drift.",
    reuseConditions: ["Use when agents exchange structured outputs."],
    limitations: ["Does not validate semantic correctness."],
    factoryImpact: { workflow: "feature-delivery" }
  };
}

test("memory candidate is explicit and can be approved", () => {
  const engine = new FactoryMemoryEngine(new InMemoryMemoryStore());
  const candidate = engine.propose(input());

  assert.equal(candidate.status, "CANDIDATE");

  const approved = engine.review({
    candidateId: candidate.id,
    decision: "APPROVE",
    reviewer: "human",
    reason: "Evidence is documented and reusable."
  });

  assert.equal(approved.status, "ACTIVE");
  assert.equal(approved.reviewedBy, "human");
});

test("approval without evidence is rejected", () => {
  const engine = new FactoryMemoryEngine(new InMemoryMemoryStore());
  const candidate = engine.propose({
    ...input(),
    id: "mem-2",
    evidence: ["documented evidence"]
  });
  assert.throws(() => engine.review({
    candidateId: candidate.id,
    decision: "APPROVE",
    reviewer: "human",
    reason: "Review"
  }), /Evidence/);
});

test("duplicate memory is rejected", () => {
  const engine = new FactoryMemoryEngine(new InMemoryMemoryStore());
  engine.propose(input());
  assert.throws(() => engine.propose(input("mem-2")), /Duplicate/);
});

test("secret and personal data are rejected", () => {
  const engine = new FactoryMemoryEngine(new InMemoryMemoryStore());
  assert.throws(() => engine.propose({
    ...input(),
    id: "mem-secret",
    evidence: ["api_key=super-secret-value"]
  }), /sensitive data/);

  assert.throws(() => engine.propose({
    ...input(),
    id: "mem-pii",
    evidence: ["contact@example.com"]
  }), /sensitive data/);
});

test("superseding active memory preserves lifecycle", () => {
  const engine = new FactoryMemoryEngine(new InMemoryMemoryStore());
  const first = engine.propose(input());
  engine.review({
    candidateId: first.id,
    decision: "APPROVE",
    reviewer: "human",
    reason: "Approved"
  });

  const replacement = engine.propose({
    ...input("mem-2"),
    insight: "Explicit handoff validation plus evidence prevents contract drift."
  });
  const active = engine.review({
    candidateId: replacement.id,
    decision: "SUPERSEDE",
    reviewer: "human",
    reason: "New evidence improves the reusable guidance.",
    supersedesId: first.id
  });

  assert.equal(active.status, "ACTIVE");
  assert.equal(engine.findReusable("orchestration runtime V1").length, 1);
});

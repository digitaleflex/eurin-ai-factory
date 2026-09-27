import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryExecutionEventSink, InMemoryMetricsCollector } from "../src/observability.js";
import type { ExecutionRecord } from "../src/types.js";

const base: ExecutionRecord = {
  executionId: "exec-1",
  workflowId: "feature-delivery",
  workflowVersion: "1.0.0",
  status: "COMPLETED",
  events: [
    { timestamp: "2026-01-01T10:00:00.000Z", executionId: "exec-1", type: "STATE_TRANSITION", state: "INTAKE" },
    { timestamp: "2026-01-01T10:00:01.000Z", executionId: "exec-1", type: "AGENT_STARTED", state: "AGENT_RUNNING", agent: "developer" },
    { timestamp: "2026-01-01T10:00:02.000Z", executionId: "exec-1", type: "GATE_EVALUATED", state: "GATE_PENDING" }
  ],
  results: {}
};

test("event sink stores and filters events", () => {
  const sink = new InMemoryExecutionEventSink();
  sink.emit(base.events[0]);
  sink.emit({ ...base.events[1], executionId: "exec-2" });

  assert.equal(sink.list("exec-1").length, 1);
  assert.equal(sink.list().length, 2);
});

test("metrics collector derives counters and duration", () => {
  const metrics = new InMemoryMetricsCollector();
  metrics.observe(base);

  const snapshot = metrics.snapshot();
  assert.equal(snapshot.executions, 1);
  assert.equal(snapshot.completed, 1);
  assert.equal(snapshot.agentRuns, 1);
  assert.equal(snapshot.gateEvaluations, 1);
  assert.equal(snapshot.totalDurationMs, 2000);
});

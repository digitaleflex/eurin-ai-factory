import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryExecutionStore } from "../src/store.js";
import type { ExecutionRecord } from "../src/types.js";

const record: ExecutionRecord = {
  executionId: "exec-1",
  workflowId: "feature-delivery",
  workflowVersion: "1.0",
  status: "COMPLETED",
  events: [],
  results: {}
};

test("creates and retrieves an isolated execution record", async () => {
  const store = new InMemoryExecutionStore();
  await store.create(record);

  const loaded = await store.get("exec-1");
  assert.deepEqual(loaded, record);

  loaded!.status = "BLOCKED";
  const unchanged = await store.get("exec-1");
  assert.equal(unchanged!.status, "COMPLETED");
});

test("rejects duplicate execution IDs", async () => {
  const store = new InMemoryExecutionStore();
  await store.create(record);
  await assert.rejects(() => store.create(record), /already exists/);
});

test("filters executions", async () => {
  const store = new InMemoryExecutionStore();
  await store.create(record);
  assert.equal((await store.list({ workflowId: "feature-delivery" })).length, 1);
  assert.equal((await store.list({ workflowId: "bug-fix" })).length, 0);
});

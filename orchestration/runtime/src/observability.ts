import type { ExecutionEvent, ExecutionRecord } from "./types.js";

export interface ExecutionEventSink {
  emit(event: ExecutionEvent): void | Promise<void>;
}

export class InMemoryExecutionEventSink implements ExecutionEventSink {
  private readonly events: ExecutionEvent[] = [];

  emit(event: ExecutionEvent): void {
    this.events.push({ ...event });
  }

  list(executionId?: string): ExecutionEvent[] {
    return this.events
      .filter((event) => !executionId || event.executionId === executionId)
      .map((event) => ({ ...event }));
  }
}

export interface OrchestrationMetrics {
  executions: number;
  completed: number;
  failed: number;
  blocked: number;
  escalated: number;
  approvalRequired: number;
  handoffRejected: number;
  gateEvaluations: number;
  gateRejections: number;
  agentRuns: number;
  agentFailures: number;
  conditionBlocked: number;
  conditionSkipped: number;
  totalDurationMs: number;
}

export interface MetricsCollector {
  observe(record: ExecutionRecord): void;
  snapshot(): OrchestrationMetrics;
}

export class InMemoryMetricsCollector implements MetricsCollector {
  private readonly metrics: OrchestrationMetrics = {
    executions: 0,
    completed: 0,
    failed: 0,
    blocked: 0,
    escalated: 0,
    approvalRequired: 0,
    handoffRejected: 0,
    gateEvaluations: 0,
    gateRejections: 0,
    agentRuns: 0,
    agentFailures: 0,
    conditionBlocked: 0,
    conditionSkipped: 0,
    totalDurationMs: 0
  };

  observe(record: ExecutionRecord): void {
    this.metrics.executions += 1;
    if (record.status === "COMPLETED") this.metrics.completed += 1;
    if (record.status === "FAILED") this.metrics.failed += 1;
    if (record.status === "BLOCKED") this.metrics.blocked += 1;
    if (record.status === "ESCALATED") this.metrics.escalated += 1;
    if (record.status === "APPROVAL_REQUIRED") this.metrics.approvalRequired += 1;

    for (const event of record.events) {
      if (event.type === "GATE_EVALUATED") this.metrics.gateEvaluations += 1;
      if (event.type === "GATE_REJECTED") this.metrics.gateRejections += 1;
      if (event.type === "AGENT_STARTED") this.metrics.agentRuns += 1;
      if (event.type === "AGENT_FAILED") this.metrics.agentFailures += 1;
      if (event.type === "HANDOFF_REJECTED") this.metrics.handoffRejected += 1;
      if (event.type === "STEP_CONDITION_BLOCKED") this.metrics.conditionBlocked += 1;
      if (event.type === "STEP_CONDITION_NOT_REQUIRED") this.metrics.conditionSkipped += 1;
    }

    const timestamps = record.events.map((event) => Date.parse(event.timestamp)).filter(Number.isFinite);
    if (timestamps.length >= 2) {
      this.metrics.totalDurationMs += Math.max(0, Math.max(...timestamps) - Math.min(...timestamps));
    }
  }

  snapshot(): OrchestrationMetrics {
    return { ...this.metrics };
  }
}

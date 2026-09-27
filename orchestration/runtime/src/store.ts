import type { ExecutionRecord } from "./types.js";

export interface ExecutionStore {
  create(record: ExecutionRecord): Promise<void>;
  save(record: ExecutionRecord): Promise<void>;
  get(executionId: string): Promise<ExecutionRecord | undefined>;
  list(filter?: { workflowId?: string; status?: ExecutionRecord["status"] }): Promise<ExecutionRecord[]>;
}

export class InMemoryExecutionStore implements ExecutionStore {
  private readonly records = new Map<string, ExecutionRecord>();

  async create(record: ExecutionRecord): Promise<void> {
    if (this.records.has(record.executionId)) {
      throw new Error(`Execution already exists: ${record.executionId}`);
    }
    this.records.set(record.executionId, structuredClone(record));
  }

  async save(record: ExecutionRecord): Promise<void> {
    if (!this.records.has(record.executionId)) {
      throw new Error(`Execution not found: ${record.executionId}`);
    }
    this.records.set(record.executionId, structuredClone(record));
  }

  async get(executionId: string): Promise<ExecutionRecord | undefined> {
    const record = this.records.get(executionId);
    return record ? structuredClone(record) : undefined;
  }

  async list(filter: { workflowId?: string; status?: ExecutionRecord["status"] } = {}): Promise<ExecutionRecord[]> {
    return [...this.records.values()]
      .filter((record) => !filter.workflowId || record.workflowId === filter.workflowId)
      .filter((record) => !filter.status || record.status === filter.status)
      .map((record) => structuredClone(record));
  }
}

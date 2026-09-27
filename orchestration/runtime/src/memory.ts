import type { ExecutionRecord } from "./types.js";

export type MemoryType = "DECISION" | "PATTERN" | "LESSON" | "MISTAKE" | "INCIDENT";
export type MemoryStatus = "CANDIDATE" | "ACTIVE" | "SUPERSEDED" | "DEPRECATED" | "REVOKED";
export type MemoryReviewDecision = "APPROVE" | "REJECT" | "SUPERSEDE";

export interface FactoryImpact {
  rule?: string;
  skill?: string;
  template?: string;
  workflow?: string;
  agent?: string;
}

export interface MemoryEntry {
  id: string;
  type: MemoryType;
  status: MemoryStatus;
  context: string;
  observation: string;
  evidence: string[];
  insight: string;
  reuseConditions: string[];
  limitations: string[];
  factoryImpact: FactoryImpact;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewReason?: string;
  sourceExecutionId?: string;
}

export interface MemoryCandidateInput {
  id: string;
  type: MemoryType;
  context: string;
  observation: string;
  evidence: string[];
  insight: string;
  reuseConditions: string[];
  limitations: string[];
  factoryImpact?: FactoryImpact;
  sourceExecutionId?: string;
}

export interface MemoryReview {
  candidateId: string;
  decision: MemoryReviewDecision;
  reviewer: string;
  reason: string;
  supersedesId?: string;
}

export interface MemoryStore {
  add(entry: MemoryEntry): void;
  update(entry: MemoryEntry): void;
  get(id: string): MemoryEntry | undefined;
  list(status?: MemoryStatus): MemoryEntry[];
}

export class InMemoryMemoryStore implements MemoryStore {
  private readonly entries = new Map<string, MemoryEntry>();

  add(entry: MemoryEntry): void {
    if (this.entries.has(entry.id)) {
      throw new Error(`Memory entry already exists: ${entry.id}`);
    }
    this.entries.set(entry.id, structuredClone(entry));
  }

  update(entry: MemoryEntry): void {
    if (!this.entries.has(entry.id)) {
      throw new Error(`Memory entry not found: ${entry.id}`);
    }
    this.entries.set(entry.id, structuredClone(entry));
  }

  get(id: string): MemoryEntry | undefined {
    const entry = this.entries.get(id);
    return entry ? structuredClone(entry) : undefined;
  }

  list(status?: MemoryStatus): MemoryEntry[] {
    return [...this.entries.values()]
      .filter((entry) => !status || entry.status === status)
      .map((entry) => structuredClone(entry));
  }
}

export class FactoryMemoryEngine {
  constructor(private readonly store: MemoryStore) {}

  propose(input: MemoryCandidateInput): MemoryEntry {
    this.validateInput(input);

    const candidate: MemoryEntry = {
      id: input.id,
      type: input.type,
      status: "CANDIDATE",
      context: input.context.trim(),
      observation: input.observation.trim(),
      evidence: input.evidence.map((item) => item.trim()),
      insight: input.insight.trim(),
      reuseConditions: input.reuseConditions.map((item) => item.trim()),
      limitations: input.limitations.map((item) => item.trim()),
      factoryImpact: input.factoryImpact ?? {},
      createdAt: new Date().toISOString(),
      sourceExecutionId: input.sourceExecutionId
    };

    const fingerprint = memoryFingerprint(candidate);
    const duplicate = this.store.list().find((entry) =>
      entry.status !== "REVOKED" && memoryFingerprint(entry) === fingerprint
    );
    if (duplicate) {
      throw new Error(`Duplicate memory candidate detected: ${duplicate.id}`);
    }

    this.store.add(candidate);
    return candidate;
  }

  proposeFromExecution(
    execution: ExecutionRecord,
    input: Omit<MemoryCandidateInput, "sourceExecutionId">
  ): MemoryEntry {
    if (!execution.executionId) {
      throw new Error("Execution source is required for execution-derived memory.");
    }
    return this.propose({ ...input, sourceExecutionId: execution.executionId });
  }

  review(review: MemoryReview): MemoryEntry {
    const candidate = this.store.get(review.candidateId);
    if (!candidate) throw new Error(`Memory candidate not found: ${review.candidateId}`);
    if (candidate.status !== "CANDIDATE") {
      throw new Error(`Only CANDIDATE memory can be reviewed: ${review.candidateId}`);
    }
    if (!review.reviewer.trim() || !review.reason.trim()) {
      throw new Error("Reviewer and review reason are required.");
    }

    if (review.decision === "REJECT") {
      const rejected = { ...candidate, status: "REVOKED" as const, reviewedAt: new Date().toISOString(), reviewedBy: review.reviewer, reviewReason: review.reason };
      this.replace(rejected);
      return rejected;
    }

    if (!candidate.evidence.length) {
      throw new Error("Evidence is mandatory for memory approval.");
    }

    if (review.decision === "SUPERSEDE") {
      if (!review.supersedesId) throw new Error("supersedesId is required for SUPERSEDE.");
      const previous = this.store.get(review.supersedesId);
      if (!previous || previous.status !== "ACTIVE") {
        throw new Error("Only ACTIVE memory can be superseded.");
      }
      this.replace({ ...previous, status: "SUPERSEDED", reviewedAt: new Date().toISOString(), reviewedBy: review.reviewer, reviewReason: review.reason });
    }

    const approved = { ...candidate, status: "ACTIVE" as const, reviewedAt: new Date().toISOString(), reviewedBy: review.reviewer, reviewReason: review.reason };
    this.replace(approved);
    return approved;
  }

  findReusable(context: string, type?: MemoryType): MemoryEntry[] {
    const normalized = context.trim().toLowerCase();
    if (!normalized) return [];
    return this.store.list("ACTIVE").filter((entry) => {
      const typeMatches = !type || entry.type === type;
      return typeMatches && entry.context.toLowerCase().includes(normalized);
    });
  }

  private replace(entry: MemoryEntry): void {
    const existing = this.store.get(entry.id);
    if (!existing) throw new Error(`Memory entry not found: ${entry.id}`);
    this.store.update(entry);
  }

  private validateInput(input: MemoryCandidateInput): void {
    const required = [input.id, input.context, input.observation, input.insight];
    if (required.some((value) => !value?.trim())) {
      throw new Error("Memory id, context, observation and insight are required.");
    }
    if (!input.evidence.length) {
      throw new Error("Evidence is required for a memory candidate.");
    }
    if (!input.reuseConditions.length || !input.limitations.length) {
      throw new Error("Reuse conditions and limitations are required.");
    }

    const serialized = JSON.stringify(input).toLowerCase();
    const forbidden = [
      /(?:password|passwd|secret|api[_ -]?key|access[_ -]?token|refresh[_ -]?token)\s*[:=]/i,
      /-----begin (?:rsa |ec |openpgp )?private key-----/i,
      /bearer\s+[a-z0-9._-]{20,}/i,
      /\bAKIA[0-9A-Z]{16}\b/i,
      /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/i
    ];
    if (forbidden.some((pattern) => pattern.test(serialized))) {
      throw new Error("Potential secret or personal sensitive data detected; sanitize memory input.");
    }
  }
}

export function memoryFingerprint(input: Pick<MemoryEntry, "type" | "context" | "insight">): string {
  return [input.type, input.context, input.insight]
    .map((value) => value.trim().toLowerCase().replace(/\s+/g, " "))
    .join("::");
}

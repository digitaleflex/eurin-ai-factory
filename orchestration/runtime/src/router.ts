import type { WorkflowContext } from "./types.js";
import type { WorkflowRegistry } from "./registry.js";

export type RequestCategory = "FEATURE_DELIVERY" | "BUG_FIX" | "SECURITY_REVIEW";

export interface FactoryRequest {
  request: string;
  project: string;
  sourceOfTruth: string;
  category?: RequestCategory;
  workflowId?: string;
  workflowVersion?: string;
  context?: Record<string, unknown>;
}

export interface RoutingDecision {
  status: "ROUTED" | "BLOCKED" | "ESCALATED";
  category?: RequestCategory;
  workflowId?: string;
  workflowVersion?: string;
  requiredContext: string[];
  reason: string;
  evidence: string[];
  context: WorkflowContext;
}

const signals: Record<RequestCategory, RegExp[]> = {
  FEATURE_DELIVERY: [/\bfeature\b/i, /\bnew\s+(?:feature|functionality)\b/i, /\badd\b/i, /\bimplement\b/i],
  BUG_FIX: [/\bbug\b/i, /\bbugfix\b/i, /\bfix\b/i, /\berror\b/i, /\bdefect\b/i, /\bregression\b/i],
  SECURITY_REVIEW: [/\bsecurity\b/i, /\bsecure\b/i, /\bvulnerability\b/i, /\bthreat\b/i, /\bauthori[sz]ation\b/i]
};

export class ContextRouter {
  constructor(private readonly registry: WorkflowRegistry) {}

  route(input: FactoryRequest): RoutingDecision {
    const baseContext: Record<string, unknown> = {
      project: input.project,
      source_of_truth: input.sourceOfTruth,
      request: input.request,
      ...(input.context ?? {})
    };

    if (!input.project || !input.sourceOfTruth || !input.request.trim()) {
      return {
        status: "BLOCKED",
        requiredContext: [],
        reason: "Project, source of truth and request are mandatory for routing.",
        evidence: ["Missing mandatory routing input."],
        context: { values: baseContext }
      };
    }

    if (input.workflowId) {
      const workflow = this.registry.get(input.workflowId, input.workflowVersion);
      return this.toRoutedDecision(workflow.id, workflow.version, baseContext,
        "Workflow explicitly selected by the caller.",
        [`Explicit workflow: ${workflow.id}@${workflow.version}`]);
    }

    if (input.category) {
      return this.routeCategory(input.category, baseContext, "Request category explicitly supplied by the caller.");
    }

    const matches = (Object.entries(signals) as [RequestCategory, RegExp[]][])
      .filter(([, patterns]) => patterns.some((pattern) => pattern.test(input.request)))
      .map(([category]) => category);

    if (matches.length !== 1) {
      return {
        status: matches.length > 1 ? "ESCALATED" : "BLOCKED",
        requiredContext: [],
        reason: matches.length > 1
          ? `Ambiguous request matches multiple categories: ${matches.join(", ")}.`
          : "Request category could not be determined from explicit routing information.",
        evidence: matches.length > 1
          ? matches.map((category) => `Matched category signal: ${category}`)
          : ["No unique category signal matched."],
        context: { values: baseContext }
      };
    }

    return this.routeCategory(matches[0], baseContext, "Exactly one supported request category matched.", [
      `Category signal: ${matches[0]}`
    ]);
  }

  private routeCategory(category: RequestCategory, context: Record<string, unknown>, reason: string, evidence: string[] = []): RoutingDecision {
    const workflowId = this.workflowForCategory(category);
    if (!this.registry.has(workflowId, "1.0")) {
      return {
        status: "BLOCKED",
        category,
        requiredContext: [],
        reason: `No registered workflow version 1.0 is available for ${category}.`,
        evidence: [`Expected workflow: ${workflowId}@1.0`],
        context: { values: context }
      };
    }

    const workflow = this.registry.get(workflowId, "1.0");
    return this.toRoutedDecision(workflow.id, workflow.version, context, reason, evidence, category);
  }

  private toRoutedDecision(
    workflowId: string,
    workflowVersion: string,
    context: Record<string, unknown>,
    reason: string,
    evidence: string[],
    category = this.categoryForWorkflow(workflowId)
  ): RoutingDecision {
    const workflow = this.registry.get(workflowId, workflowVersion);
    return {
      status: "ROUTED",
      category,
      workflowId: workflow.id,
      workflowVersion: workflow.version,
      requiredContext: workflow.context.required,
      reason,
      evidence,
      context: { values: context }
    };
  }

  private workflowForCategory(category: RequestCategory): string {
    return category === "FEATURE_DELIVERY"
      ? "feature-delivery"
      : category === "BUG_FIX"
        ? "bug-fix"
        : "security-review";
  }

  private categoryForWorkflow(workflowId: string): RequestCategory | undefined {
    if (workflowId === "feature-delivery") return "FEATURE_DELIVERY";
    if (workflowId === "bug-fix") return "BUG_FIX";
    if (workflowId === "security-review") return "SECURITY_REVIEW";
    return undefined;
  }
}

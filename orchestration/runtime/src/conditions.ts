import type { StepCondition, WorkflowContext, WorkflowStep } from "./types.js";

export type ConditionDecision = "REQUIRED" | "NOT_REQUIRED" | "BLOCKED";

export interface ConditionEvaluation {
  stepId: string;
  decision: ConditionDecision;
  reason: string;
  evidence: string[];
}

export interface StepConditionEvaluator {
  evaluate(step: WorkflowStep, context: WorkflowContext): ConditionEvaluation;
}

/**
 * V1 evaluator deliberately uses only structured caller-provided requirements.
 *
 * context.values.required_steps must be a string[] for CONDITIONAL/OPTIONAL
 * steps. The evaluator never infers business intent from free-form text.
 */
export class StructuredConditionEvaluator implements StepConditionEvaluator {
  evaluate(step: WorkflowStep, context: WorkflowContext): ConditionEvaluation {
    if (step.condition === "REQUIRED" || step.required) {
      return {
        stepId: step.id,
        decision: "REQUIRED",
        reason: "Step is explicitly required by the workflow.",
        evidence: ["condition=REQUIRED or required=true"]
      };
    }

    const requiredSteps = context.values.required_steps;
    if (!Array.isArray(requiredSteps) || !requiredSteps.every((item) => typeof item === "string")) {
      return {
        stepId: step.id,
        decision: "BLOCKED",
        reason: "Structured required_steps context is missing for a non-required step.",
        evidence: ["required_steps must be a string[]"]
      };
    }

    const requested = requiredSteps.includes(step.id);

    if (step.condition === "OPTIONAL") {
      return {
        stepId: step.id,
        decision: requested ? "REQUIRED" : "NOT_REQUIRED",
        reason: requested
          ? "Optional step was explicitly requested."
          : "Optional step was not requested.",
        evidence: [`required_steps includes ${step.id}: ${requested}`]
      };
    }

    return {
      stepId: step.id,
      decision: requested ? "REQUIRED" : "NOT_REQUIRED",
      reason: requested
        ? "Conditional step was explicitly required by structured context."
        : "Conditional step was explicitly not required by structured context.",
      evidence: [`required_steps includes ${step.id}: ${requested}`]
    };
  }
}

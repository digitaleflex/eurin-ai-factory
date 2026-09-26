import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import type { WorkflowDefinition } from "./types.js";

export async function loadWorkflow(path: string): Promise<WorkflowDefinition> {
  const definition = parse(await readFile(path, "utf8")) as WorkflowDefinition;
  validateWorkflow(definition);
  return definition;
}

export function validateWorkflow(definition: WorkflowDefinition): void {
  if (!definition?.id || !definition.version || !definition.purpose)
    throw new Error("Workflow must define id, version and purpose.");
  if (!definition.trigger)
    throw new Error(`Workflow ${definition.id}: trigger is required.`);
  if (!definition.context?.required?.length)
    throw new Error(`Workflow ${definition.id}: required context is missing.`);
  if (!definition.steps?.length)
    throw new Error(`Workflow ${definition.id}: at least one step is required.`);

  const ids = new Set<string>();
  for (const step of definition.steps) {
    if (ids.has(step.id)) throw new Error(`Duplicate step id: ${step.id}`);
    ids.add(step.id);
    if (!step.agent || !step.objective || !step.failure_policy)
      throw new Error(`Invalid step: ${step.id}`);
  }

  for (const step of definition.steps) {
    for (const next of step.next) {
      if (!ids.has(next))
        throw new Error(`Step ${step.id} references unknown step ${next}`);
    }
  }
}

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { loadWorkflow, validateWorkflow } from "./loader.js";
import type { WorkflowDefinition } from "./types.js";

export interface WorkflowRef {
  id: string;
  version: string;
}

export class WorkflowRegistry {
  private readonly workflows = new Map<string, WorkflowDefinition>();

  register(workflow: WorkflowDefinition): void {
    validateWorkflow(workflow);
    const key = this.key(workflow.id, workflow.version);
    if (this.workflows.has(key)) {
      throw new Error(`Duplicate workflow version: ${workflow.id}@${workflow.version}`);
    }
    this.workflows.set(key, workflow);
  }

  registerAll(workflows: WorkflowDefinition[]): void {
    for (const workflow of workflows) this.register(workflow);
  }

  get(id: string, version?: string): WorkflowDefinition {
    if (version) {
      const workflow = this.workflows.get(this.key(id, version));
      if (!workflow) throw new Error(`Workflow not found: ${id}@${version}`);
      return workflow;
    }

    const matches = [...this.workflows.values()].filter((item) => item.id === id);
    if (matches.length === 0) throw new Error(`Workflow not found: ${id}`);
    if (matches.length > 1) {
      throw new Error(`Workflow version is required because multiple versions are registered: ${id}`);
    }
    return matches[0];
  }

  has(id: string, version: string): boolean {
    return this.workflows.has(this.key(id, version));
  }

  list(): WorkflowRef[] {
    return [...this.workflows.values()]
      .map(({ id, version }) => ({ id, version }))
      .sort((a, b) => a.id.localeCompare(b.id) || a.version.localeCompare(b.version));
  }

  async loadDirectory(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    const workflowFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".yaml"))
      .map((entry) => entry.name)
      .sort();

    for (const filename of workflowFiles) {
      this.register(await loadWorkflow(join(directory, filename)));
    }
  }

  private key(id: string, version: string): string {
    return `${id}@${version}`;
  }
}

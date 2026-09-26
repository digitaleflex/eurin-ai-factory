# Eurin AI Factory — Orchestration

L'orchestration décrit comment la Factory fait travailler les agents ensemble.

Elle ne remplace ni les agents, ni les règles, ni les Skills.

## Runtime V1

Le prototype exécutable se trouve dans `orchestration/runtime/`.

Workflow YAML → validation → State Machine → Decision Gate → Agent Runner → Handoff Validation → Next Step → Execution Record.

Le runtime est volontairement découplé des fournisseurs LLM et des systèmes externes.

### Interfaces principales

- `AgentRunner` : point d'entrée contrôlé vers un agent.
- `GateEvaluator` : décide si une étape peut franchir un Decision Gate.
- `WorkflowContext` : contexte minimal transmis à l'exécution.
- `ExecutionRecord` : trace structurée de l'exécution.
- `assertTransition()` : interdit les transitions d'état non prévues.

## Responsabilités

- sélectionner le workflow adapté ;
- charger le contexte minimal ;
- déclencher les agents dans le bon ordre ;
- contrôler les handoffs ;
- appliquer les Decision Gates ;
- interrompre le flux lorsqu'une validation manque ;
- gérer les escalades ;
- enregistrer l'exécution ;
- capturer les apprentissages ;
- mesurer le résultat du workflow.

## Règles

1. L'orchestrateur ne décide pas à la place d'Eurin lorsqu'une décision humaine est requise.
2. Il ne contourne jamais un Decision Gate.
3. Il ne transmet pas tout le contexte à tous les agents par défaut.
4. Un agent ne devient actif que si son rôle est nécessaire.
5. Un handoff incomplet bloque ou retourne vers l'agent émetteur.
6. Une sortie NOT VERIFIED reste non vérifiée jusqu'à preuve.
7. Les actions à fort blast radius suivent PROPOSAL → REVIEW → APPROVAL → EXECUTION.
8. Toute modification du workflow doit rester traçable.

## Documents

- [Engine](./engine.md)
- [Runtime V1](./runtime/README.md)
- [Context Loading](./context-loading.md)
- [Decision Gates](./decision-gates.md)
- [Workflow Definition](./workflow-definition.md)
- [Escalation](./escalation.md)
- [Execution Record](./execution-record.md)
- [Metrics](./metrics.md)
- [Workflows](./workflows/README.md)
- [Handoffs](./handoffs/README.md)

## Workflows V1

- feature-delivery
- bug-fix
- architecture-change
- security-review
- incident-response

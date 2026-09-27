# Eurin AI Factory — Orchestration

L'orchestration décrit comment la Factory fait travailler les agents ensemble.

Elle ne remplace ni les agents, ni les règles, ni les Skills.

## Runtime V1

Le runtime exécutable se trouve dans `orchestration/runtime/`.

Le flux de base est :

```text
Request
  ↓
Context Router
  ↓
Workflow Registry
  ↓
Workflow Definition
  ↓
Orchestrator
  ├─ Decision Gates
  ├─ Agent Runner
  ├─ Handoff Validation
  └─ Execution Record
```

### Workflow Registry

Le `WorkflowRegistry` est la source runtime des workflows disponibles. Il charge les définitions YAML, applique le validateur du runtime, puis les indexe par `id@version`.

Garanties :
- chargement déterministe ;
- validation avant enregistrement ;
- rejet des doublons `id + version` ;
- lookup explicite par version ;
- aucun appel LLM ;
- aucune persistance implicite.

### Context Router

Le `ContextRouter` transforme une demande en décision de routage traçable.

Ordre de priorité :
1. workflow explicitement demandé ;
2. catégorie explicitement fournie ;
3. classification déterministe limitée aux signaux V1.

Le routeur ne remplace pas une compréhension sémantique complète. Une demande ambiguë est `ESCALATED`, une demande non classifiable est `BLOCKED`.

Le routage fournit :
- statut ;
- catégorie éventuelle ;
- workflow + version ;
- contexte requis ;
- raison ;
- éléments de preuve ;
- contexte minimal destiné au runtime.

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
- security-review
- architecture-change
- incident-response

## État de vérification

Le code Registry/Router et leurs tests ont été ajoutés. L'exécution réelle de `npm install`, `npm run build` et `npm test` reste à effectuer dans l'environnement runtime ; elle doit être enregistrée via l'issue de vérification Runtime V1 avant de déclarer le composant VERIFIED.

# Orchestration Runtime V1

Le runtime fournit un noyau déterministe pour charger des workflows, router une demande, appliquer les gates et exécuter des agents via des interfaces injectées.

## Architecture

```text
Request
  │
  ▼
ContextRouter ───────► RoutingDecision
  │
  ▼
WorkflowRegistry ────► WorkflowDefinition
  │
  ▼
Orchestrator
  ├── Decision Gates
  ├── AgentAdapterRegistry
  │      └── RegistryAgentRunner
  ├── Handoff Validation
  └── ExecutionRecord
```

## Workflow Registry

`WorkflowRegistry` charge les fichiers YAML depuis un répertoire, les valide avec le validateur du runtime et les indexe par `id@version`.

Principes :
- chargement déterministe (ordre lexical des fichiers) ;
- validation avant enregistrement ;
- une seule définition par couple `id + version` ;
- lookup explicite par version lorsque plusieurs versions existent ;
- aucun appel LLM ;
- aucune persistance implicite.

## Context Router

`ContextRouter` transforme une demande structurée en décision de routage.

Il accepte :
- une catégorie explicite ;
- un workflow explicite ;
- sinon, une classification déterministe limitée aux workflows V1.

La classification automatique n'est pas un LLM et ne prétend pas comprendre une demande ambiguë. Si plusieurs catégories correspondent, le résultat est `ESCALATED`. Si aucune ne correspond, le résultat est `BLOCKED`.

Une surcharge de workflow explicite est autorisée, mais elle ne contourne ni la validation du workflow ni les Decision Gates.

## Agent Adapter Registry

`AgentAdapterRegistry` sépare l'orchestrateur des implémentations concrètes des agents.

Contrat :
- chaque agent possède un identifiant stable ;
- l'adaptateur reçoit uniquement l'étape et le contexte qui lui sont transmis ;
- la sortie est normalisée vers le contrat `AgentResult` ;
- un agent inconnu échoue explicitement ;
- une sortie malformée est rejetée ;
- aucune logique de fournisseur LLM n'est placée dans l'orchestrateur.

Les adapters peuvent ensuite être reliés à Product, Architect, UI, Data, Security, Developer, QA et Deployment. Le runtime V1 ne fournit volontairement pas encore de connecteur vers un fournisseur LLM.

## Conditional steps

Le runtime V1 utilise `StructuredConditionEvaluator`. Une étape `REQUIRED` est toujours exécutée. Une étape `CONDITIONAL` ou `OPTIONAL` est décidée uniquement à partir de `context.values.required_steps`, une liste structurée d'identifiants d'étapes.

Exemple :

```ts
{ values: {
  project: "demo",
  source_of_truth: "product-spec",
  required_steps: ["ui", "security"]
} }
```

Le résultat est toujours `REQUIRED`, `NOT_REQUIRED` ou `BLOCKED`, avec raison et éléments de preuve. Le runtime n'interprète pas le texte libre pour inventer une obligation métier. Si l'information structurée nécessaire manque, l'exécution est bloquée.

## Statuts de routage

| Statut | Signification |
|---|---|
| ROUTED | un workflow déterminé peut être exécuté |
| BLOCKED | les informations nécessaires manquent ou le workflow n'existe pas |
| ESCALATED | la demande est ambiguë et nécessite une décision humaine |

## Limites V1

- pas de classification sémantique par LLM ;
- pas de persistance durable ;
- pas de détection automatique complète du projet ;
- pas d'accès aux secrets ;
- pas d'exécution shell ou Git ;
- pas de résolution automatique de règles métier implicites.

## Validation

Les tests couvrent :
- chargement des workflows V1 ;
- doublons `id@version` ;
- routage feature/bug/security ;
- ambiguïté ;
- override explicite ;
- évaluation des conditions ;
- enregistrement/exécution d'adapters ;
- agent inconnu ;
- sortie d'agent malformée.

## Human approval

Le runtime expose `HumanApprovalAdapter` et `HumanApprovalGateEvaluator`. Lorsqu'un gate exige une décision humaine, l'évaluation retourne `APPROVAL_REQUIRED` et l'orchestrateur s'arrête avant l'action gated.

Le modèle d'approbation conserve :
- identifiant de demande ;
- gate concerné ;
- résumé ;
- impact ;
- preuves sûres ;
- options ;
- acteur ;
- décision ;
- horodatage ;
- justification.

Les secrets évidents (`token`, `password`, `credential`, `api_key`, etc.) ne sont pas copiés dans les éléments de preuve. La persistance durable et la reprise depuis un checkpoint relèvent de l'Execution Store.


## Observability and metrics

Le runtime expose un contrat d'observabilité indépendant du moteur :
- `ExecutionEventSink` reçoit les événements d'exécution sans imposer de fournisseur ;
- `InMemoryExecutionEventSink` permet l'inspection déterministe en V1 ;
- `MetricsCollector` dérive des compteurs à partir des `ExecutionRecord` ;
- `InMemoryMetricsCollector` fournit une implémentation locale pour les tests et le pilotage.

Les événements couvrent notamment :
- transitions d'état ;
- évaluation et rejet des gates ;
- demande d'approbation humaine ;
- démarrage/blocage/échec d'un agent ;
- rejet d'un handoff ;
- conditions d'étapes bloquées ou ignorées.

Métriques V1 :
- exécutions, complétions, échecs, blocages et escalades ;
- approbations requises ;
- gates évalués/rejetés ;
- agents exécutés/en échec ;
- handoffs rejetés ;
- conditions bloquées/ignorées ;
- durée totale observée.

La collecte est volontairement en mémoire. Prometheus, OpenTelemetry ou une autre plateforme restent des adapters futurs ; ils ne doivent pas devenir une dépendance du noyau d'orchestration sans décision d'architecture.

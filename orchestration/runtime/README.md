# Orchestration Runtime — V1

Prototype minimal du moteur d'orchestration de la Eurin AI Factory.

Workflow YAML -> validation -> contexte -> Decision Gate -> agent -> handoff -> étape suivante -> memory review -> execution record.

## V1 intentionally does not

- appeler directement un fournisseur LLM ;
- gérer des credentials ;
- modifier GitHub ou la production ;
- persister dans une base de données ;
- déduire automatiquement les préconditions en langage naturel ;
- exécuter automatiquement les étapes CONDITIONAL ou OPTIONAL.

Ces limites sont volontaires : le moteur doit d'abord être déterministe, testable et observable.

## Installation

npm install
npm test
npm run build

## Extension prévue

1. Workflow registry
2. Context router
3. Conditional step evaluator
4. Durable execution store
5. Agent adapters
6. Human approval adapter
7. Metrics/event sink

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

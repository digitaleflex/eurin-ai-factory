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

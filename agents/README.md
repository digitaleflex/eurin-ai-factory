# Eurin AI Factory — Agents

Les agents sont des rôles spécialisés de la Factory.

Ils ne sont pas des développeurs génériques autonomes : chacun possède un mandat, un périmètre, des entrées, des sorties et des limites.

## Pipeline de référence

Product → Architect → Developer → QA → Human Approval lorsque requis

## Agents V1

| Agent | Mission principale | Peut modifier le code ? |
|---|---|---|
| Product | Transformer une idée en spécification exploitable | Non |
| Architect | Transformer la spécification en conception technique | Non, sauf artefacts d'architecture |
| Developer | Transformer l'architecture validée en implémentation | Oui, dans son scope |
| QA | Vérifier la conformité, qualité et sécurité | Non par défaut |

## Règle générale

Tous les agents doivent lire :

`rules/MASTER_RULES.md`

avant toute tâche significative.

Aucun agent ne peut s'attribuer les responsabilités d'un autre agent sans escalade explicite.

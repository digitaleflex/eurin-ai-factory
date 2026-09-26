# Eurin AI Factory — Agents

Les agents sont des rôles spécialisés de la Factory.

Ils ne sont pas des développeurs génériques autonomes : chacun possède un mandat, un périmètre, des entrées, des sorties, des permissions et des limites.

## Pipeline de référence

```text
Product
  ↓
Architect
  ↓
UI ───────────────┐
  ↓               │
Data / Security   │
  ↓               │
Developer ←───────┘
  ↓
QA
  ↓
Deployment
  ↓
Human Approval lorsque requis
```

Tous les flux ne nécessitent pas tous les agents. La Factory charge uniquement les rôles nécessaires au risque et au périmètre.

## Agents V1

| Agent | Mission principale | Peut modifier le code ? |
|---|---|---:|
| Product | Problème, valeur, scope et critères d'acceptation | Non |
| Architect | Architecture, stack, contrats et décisions techniques | Non par défaut |
| UI | Expérience, composants et états d'interface | Oui, dans son scope autorisé |
| Data | Modèle DB, ORM et accès aux données | Oui, dans son scope autorisé |
| Security | Menaces, auth, permissions, secrets et contrôles | Non par défaut |
| Developer | Implémentation de la solution validée | Oui |
| QA | Vérification et rapport de qualité | Non par défaut |
| Deployment | Build, release, observability et rollback | Oui, dans son scope |

## Agent Contract

Chaque agent doit définir :

- **Mission** ;
- **Inputs** ;
- **Skills requis** ;
- **Outputs** ;
- **Permissions** ;
- **Limits** ;
- **Escalation** ;
- **Validation** ;
- **Handoff**.

## Règle générale

Tous les agents doivent lire :

`rules/MASTER_RULES.md`

avant toute tâche significative.

Aucun agent ne peut s'attribuer les responsabilités d'un autre agent sans escalade explicite.

## Shared output contract

Chaque agent retourne :

```text
STATUS: PASS | FAIL | BLOCKED | PARTIAL

OBJECTIVE:
...

WORK PERFORMED:
...

FILES CHANGED:
...

VALIDATION:
...

RISKS:
...

ASSUMPTIONS:
...

LIMITATIONS:
...

NEXT ACTION:
...
```

Une sortie IA non vérifiée ne devient jamais automatiquement une vérité pour l'agent suivant.

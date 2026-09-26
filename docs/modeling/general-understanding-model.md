# General Understanding Model

Ce modèle sert de grille de lecture avant de demander à un agent de construire.

## Les 10 vues

| Vue | Question |
|---|---|
| 1. Produit | Pourquoi construire ? |
| 2. Domaine | De quoi parle le métier ? |
| 3. Système | Quels sont les grands composants ? |
| 4. Données | Que doit-on mémoriser ? |
| 5. Comportement | Que se passe-t-il dans le temps ? |
| 6. Infrastructure | Où cela s'exécute-t-il ? |
| 7. Sécurité | Que faut-il protéger ? |
| 8. Opérations | Comment maintenir le système ? |
| 9. Qualité | Comment vérifier qu'il fonctionne ? |
| 10. Apprentissage | Qu'est-ce qui doit être réutilisé ensuite ? |

## Vue 1 — Produit

Artefacts :

- Problem Statement
- Personas / Actors
- Use Cases
- User Stories
- Acceptance Criteria
- Success Metrics

## Vue 2 — Domaine

Artefacts :

- Domain Glossary
- Entities
- Business Rules
- Invariants
- Bounded Contexts lorsque nécessaire

## Vue 3 — Système

Artefacts :

- C4 Context
- C4 Container
- C4 Component
- API contracts

## Vue 4 — Données

Artefacts :

- Conceptual Model
- ERD
- Logical Model
- Physical Model
- Data Dictionary
- Data Flow

## Vue 5 — Comportement

Artefacts :

- Flowchart
- Sequence Diagram
- State Machine
- Activity Diagram

## Vue 6 — Infrastructure

Artefacts :

- Deployment Diagram
- Network boundaries
- External services
- Storage
- Observability

## Vue 7 — Sécurité

Artefacts :

- Trust Boundaries
- Threat Model
- Permission Matrix
- Risk Register
- Security Constraints

## Vue 8 — Opérations

Artefacts :

- Runbook
- Backup / Restore
- Monitoring
- Incident flow
- Rollback plan

## Vue 9 — Qualité

Artefacts :

- Test Strategy
- Acceptance Tests
- Regression Tests
- QA Report
- Definition of Done

## Vue 10 — Apprentissage

Artefacts :

- Decision Log
- Lessons Learned
- Patterns
- Skills
- Templates
- Rules

## Règle de profondeur

Ne pas produire les 10 vues au même niveau de détail pour chaque projet.

Commencer par les vues nécessaires à la décision actuelle, puis approfondir uniquement les zones à risque ou ambiguës.

## Séquence recommandée

```text
Pourquoi ?
   ↓
De quoi parle-t-on ?
   ↓
Quel système ?
   ↓
Quelles données ?
   ↓
Quels comportements ?
   ↓
Quelle infrastructure ?
   ↓
Quels risques ?
   ↓
Comment tester ?
   ↓
Comment opérer ?
   ↓
Qu'allons-nous apprendre ?
```

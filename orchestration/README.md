# Eurin AI Factory — Orchestration

L'orchestration décrit comment la Factory fait travailler les agents ensemble.

Elle ne remplace ni les agents, ni les règles, ni les Skills.

## Responsabilités
- sélectionner le workflow adapté ;
- charger le contexte minimal ;
- déclencher les agents dans le bon ordre ;
- contrôler les handoffs ;
- appliquer les Decision Gates ;
- interrompre le flux lorsqu'une validation manque ;
- enregistrer les décisions et apprentissages ;
- mesurer le résultat du workflow.

## Architecture
```text
User / Eurin
    |
    v
Orchestrator
    |
    +--> Context Loader
    +--> Decision Gate
    +--> Workflow
    |       +--> Agent A
    |       +--> Handoff
    |       +--> Agent B
    |       +--> Handoff
    |       +--> Agent C
    +--> Validation Gate
    +--> Human Approval (si requis)
    +--> Memory Capture
    |
    v
Outcome
```

## Règles
1. L'orchestrateur ne décide pas à la place d'Eurin lorsqu'une décision humaine est requise.
2. Il ne contourne jamais un Decision Gate.
3. Il ne transmet pas tout le contexte à tous les agents par défaut.
4. Un agent ne devient actif que si son rôle est nécessaire.
5. Un handoff incomplet bloque ou retourne vers l'agent émetteur.
6. Une sortie NOT VERIFIED reste non vérifiée jusqu'à preuve.
7. Les actions à fort blast radius suivent PROPOSAL → REVIEW → APPROVAL → EXECUTION.
8. Toute modification du workflow doit rester traçable.

## Flux de référence
```text
INTAKE → CONTEXT → DECISION GATE → WORKFLOW SELECTION
       → AGENT EXECUTION → HANDOFF VALIDATION
       → QUALITY / SECURITY GATES → HUMAN APPROVAL ?
       → DELIVERY → MEMORY CAPTURE
```

## Workflows V1
- feature-delivery — nouvelle fonctionnalité ;
- bug-fix — correction d'un défaut ;
- architecture-change — changement structurant ;
- security-review — analyse de sécurité ;
- incident-response — incident nécessitant analyse et remédiation.

Voir workflows/README.md et handoffs/README.md.
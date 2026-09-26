# Handoffs

Un handoff est le contrat de transmission entre deux étapes ou deux agents.

Objectif : empêcher qu'un agent suivant ait à deviner ce que l'agent précédent voulait dire.

## Contrat minimal
- FROM
- TO
- OBJECTIVE
- CONTEXT
- DECISIONS
- CONSTRAINTS
- FACTS
- ASSUMPTIONS
- UNKNOWN
- ARTIFACTS
- VALIDATION
- RISKS
- OPEN QUESTIONS
- NEXT ACTION

## États
```text
DRAFT → READY → ACCEPTED → CONSUMED

ou

READY → REJECTED → REVISION → READY
```

Un handoff REJECTED ne doit pas être consommé comme une source de vérité.

Voir templates/handoff.md.
# 07 — Factory Memory

```
flowchart TB
    MEM((FACTORY MEMORY))
    DEC[Decisions]
    PAT[Patterns]
    ERR[Errors / Incidents]
    LES[Lessons Learned]
    FEED[Feedback]
    DEC --> MEM
    PAT --> MEM
    ERR --> MEM
    LES --> MEM
    FEED --> MEM
    MEM --> RULES[Rules]
    MEM --> SKILLS[Skills]
    MEM --> TEMP[Templates]
    MEM --> START[Starter Kit]
    RULES --> MEM
    SKILLS --> MEM
    TEMP --> MEM
    START --> MEM
```

## Objectif

Chaque problème récurrent doit pouvoir devenir progressivement :

`
problème → solution → pattern → skill/template/rule → réutilisation
`

La mémoire n'est donc pas une archive passive. Elle sert à réduire le coût des prochains projets.

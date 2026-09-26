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

    classDef context fill:#2563EB,color:#fff,stroke:#1D4ED8,stroke-width:2px;
    classDef product fill:#10B981,color:#fff,stroke:#047857,stroke-width:2px;
    classDef architecture fill:#7C3AED,color:#fff,stroke:#6D28D9,stroke-width:2px;
    classDef development fill:#F59E0B,color:#111827,stroke:#D97706,stroke-width:2px;
    classDef quality fill:#EF4444,color:#fff,stroke:#B91C1C,stroke-width:2px;
    classDef learning fill:#EAB308,color:#111827,stroke:#A16207,stroke-width:2px;
    classDef infra fill:#06B6D4,color:#fff,stroke:#0891B2,stroke-width:2px;
    classDef decision fill:#F97316,color:#fff,stroke:#C2410C,stroke-width:2px;
    class MEM learning
    class DEC architecture
    class PAT architecture
    class ERR quality
    class LES learning
    class FEED context
    class RULES decision
    class SKILLS architecture
    class TEMP product
    class START development
```

## Objectif

Chaque problème récurrent doit pouvoir devenir progressivement :

`
problème → solution → pattern → skill/template/rule → réutilisation
`

La mémoire n'est donc pas une archive passive. Elle sert à réduire le coût des prochains projets.

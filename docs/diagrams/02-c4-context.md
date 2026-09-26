# 02 — C4 Context Model

```
flowchart TB
    E[Eurin / Human Decision Maker]
    U[Utilisateurs / Clients]
    G[GitHub]
    AI[AI Models / Agent Runtime]
    CI[CI/CD & Hosting]
    EXT[External Services]
    F((EURIN AI FACTORY))
    E -->|Décisions, validation, priorités| F
    U -->|Feedback, besoins, résultats| F
    F -->|Code, docs, règles| G
    F -->|Inference / génération| AI
    F -->|Build, tests, delivery| CI
    F -->|APIs / services| EXT

    classDef context fill:#2563EB,color:#fff,stroke:#1D4ED8,stroke-width:2px;
    classDef product fill:#10B981,color:#fff,stroke:#047857,stroke-width:2px;
    classDef architecture fill:#7C3AED,color:#fff,stroke:#6D28D9,stroke-width:2px;
    classDef development fill:#F59E0B,color:#111827,stroke:#D97706,stroke-width:2px;
    classDef quality fill:#EF4444,color:#fff,stroke:#B91C1C,stroke-width:2px;
    classDef learning fill:#EAB308,color:#111827,stroke:#A16207,stroke-width:2px;
    classDef infra fill:#06B6D4,color:#fff,stroke:#0891B2,stroke-width:2px;
    classDef decision fill:#F97316,color:#fff,stroke:#C2410C,stroke-width:2px;
    class E context
    class U context
    class G architecture
    class AI architecture
    class CI infra
    class EXT infra
    class F product
```

## Question

> Qu'est-ce qui est dans la Factory et qu'est-ce qui lui est externe ?

Le C4 Context reste volontairement simple. Il ne décrit ni les tables ni les classes.

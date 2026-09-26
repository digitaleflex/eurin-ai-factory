# 01 — Vision 360

```
flowchart LR
    I[Idée / Problème] --> P[Product Agent]
    P -->|PRD| A[Architect Agent]
    A -->|Tech Specs| D[Developer Agent]
    D -->|Code + Tests| Q[QA Agent]
    Q -->|PASS| DL[Delivery]
    Q -->|FAIL| D
    DL --> U[Utilisateurs]
    U --> F[Feedback]
    F --> M[Factory Memory]
    M --> S[Skills / Rules / Templates]
    S --> P
    R[Rules / Constitution] --> P
    R --> A
    R --> D
    R --> Q

    classDef context fill:#2563EB,color:#fff,stroke:#1D4ED8,stroke-width:2px;
    classDef product fill:#10B981,color:#fff,stroke:#047857,stroke-width:2px;
    classDef architecture fill:#7C3AED,color:#fff,stroke:#6D28D9,stroke-width:2px;
    classDef development fill:#F59E0B,color:#111827,stroke:#D97706,stroke-width:2px;
    classDef quality fill:#EF4444,color:#fff,stroke:#B91C1C,stroke-width:2px;
    classDef learning fill:#EAB308,color:#111827,stroke:#A16207,stroke-width:2px;
    classDef infra fill:#06B6D4,color:#fff,stroke:#0891B2,stroke-width:2px;
    classDef decision fill:#F97316,color:#fff,stroke:#C2410C,stroke-width:2px;
    class I context
    class P product
    class A architecture
    class D development
    class Q quality
    class DL infra
    class U context
    class F learning
    class M learning
    class S architecture
    class R decision
```

## Lecture

Le flux principal va de l'idée vers la production, mais le feedback revient vers la mémoire, puis améliore les Skills, Rules et Templates.

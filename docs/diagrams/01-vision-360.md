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
```

## Lecture

Le flux principal va de l'idée vers la production, mais le feedback revient vers la mémoire, puis améliore les Skills, Rules et Templates.

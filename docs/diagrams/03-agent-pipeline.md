# 03 — Agent Pipeline

```
flowchart LR
    I[INPUT] --> P[PRODUCT]
    P --> PG{Product Gate}
    PG -->|Valid| A[ARCHITECT]
    PG -->|Clarify| P
    A --> AG{Architecture Gate}
    AG -->|Valid| D[DEVELOPER]
    AG -->|Change needed| A
    D --> Q[QA]
    Q --> QG{QA Gate}
    QG -->|PASS| DEL[DELIVERY]
    QG -->|FAIL| D
    QG -->|BLOCKED| H[Human Approval]
    H -->|Approved| D
    H -->|Rejected| I

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
    class PG decision
    class A architecture
    class AG decision
    class D development
    class Q quality
    class QG decision
    class DEL infra
    class H decision
```

## Handoff minimal

Chaque transition transporte :

- contexte ;
- décision précédente ;
- artefacts ;
- hypothèses ;
- contraintes ;
- risques ;
- critères de succès ;
- éléments non vérifiés.

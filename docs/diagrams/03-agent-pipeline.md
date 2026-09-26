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

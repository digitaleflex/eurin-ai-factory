# 06 — Source of Truth & Handoff

```
flowchart LR
    PS[Product Spec<br/>Pourquoi / Quoi]
    AR[Architecture<br/>Comment]
    SC[Security Constraints]
    IM[Implementation<br/>Code]
    TE[Tests<br/>Validation]
    AS[Agent Assumptions]
    PS --> AR
    AR --> IM
    SC --> AR
    SC --> IM
    IM --> TE
    AS -. faible autorité .-> IM
```

## Hiérarchie

1. Product Spec
2. Architecture
3. Security Constraints
4. Implementation
5. Tests
6. Agent Assumptions

Une hypothèse d'agent ne doit jamais silencieusement écraser une décision documentée.

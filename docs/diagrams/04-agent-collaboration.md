# 04 — Agent Collaboration

```
sequenceDiagram
    participant H as Human
    participant P as Product
    participant A as Architect
    participant D as Developer
    participant Q as QA
    participant M as Memory
    H->>P: Idée / problème
    P->>P: Analyse + PRD
    P->>A: PRD approuvé
    A->>A: Architecture + contrats
    A->>D: Tech specs
    D->>D: Implémentation + tests
    D->>Q: QA handoff
    Q->>Q: Validation
    alt PASS
        Q->>H: Résultat prêt
        H->>M: Décision / feedback
    else FAIL
        Q->>D: Défauts
        D->>Q: Correction
    else BLOCKED
        Q->>H: Escalade
    end
```

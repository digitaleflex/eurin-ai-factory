# 05 — Decision Gate

```
flowchart TD
    T[Tâche reçue] --> C[Lire contexte + règles]
    C --> E{Évidence suffisante ?}
    E -->|Oui| R{Risque / blast radius}
    E -->|Non mais faible impact| AD[ASSUME + DOCUMENTE]
    E -->|Non et important| ASK[ASK / ESCALATE]
    R -->|LOW| CONT[CONTINUE]
    R -->|MEDIUM| TEST[CONTINUE + TEST]
    R -->|HIGH| APPR[HUMAN APPROVAL]
    R -->|CRITICAL| BLOCK[BLOCKED / HUMAN REQUIRED]
    AD --> CONT
    TEST --> CONT

    classDef context fill:#2563EB,color:#fff,stroke:#1D4ED8,stroke-width:2px;
    classDef product fill:#10B981,color:#fff,stroke:#047857,stroke-width:2px;
    classDef architecture fill:#7C3AED,color:#fff,stroke:#6D28D9,stroke-width:2px;
    classDef development fill:#F59E0B,color:#111827,stroke:#D97706,stroke-width:2px;
    classDef quality fill:#EF4444,color:#fff,stroke:#B91C1C,stroke-width:2px;
    classDef learning fill:#EAB308,color:#111827,stroke:#A16207,stroke-width:2px;
    classDef infra fill:#06B6D4,color:#fff,stroke:#0891B2,stroke-width:2px;
    classDef decision fill:#F97316,color:#fff,stroke:#C2410C,stroke-width:2px;
    class T context
    class C architecture
    class E decision
    class R decision
    class AD learning
    class ASK decision
    class CONT product
    class TEST development
    class APPR quality
    class BLOCK quality
```

## Principe

La confiance ne remplace pas la preuve.

Plus le blast radius est important, plus le niveau de validation et d'approbation augmente.

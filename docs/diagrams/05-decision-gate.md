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
```

## Principe

La confiance ne remplace pas la preuve.

Plus le blast radius est important, plus le niveau de validation et d'approbation augmente.

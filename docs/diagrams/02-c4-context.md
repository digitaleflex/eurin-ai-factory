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
```

## Question

> Qu'est-ce qui est dans la Factory et qu'est-ce qui lui est externe ?

Le C4 Context reste volontairement simple. Il ne décrit ni les tables ni les classes.

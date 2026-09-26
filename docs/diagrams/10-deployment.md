# 10 — Deployment Model

```
flowchart TB
    DEV[Developer / Agent Runtime]
    GH[GitHub Repository]
    CI[CI Pipeline]
    BUILD[Build + Test]
    PREVIEW[Preview Environment]
    PROD[Production]
    OBS[Monitoring / Logs]
    DB[(Database)]
    EXT[External APIs]
    DEV --> GH
    GH --> CI
    CI --> BUILD
    BUILD --> PREVIEW
    BUILD --> PROD
    PROD --> DB
    PROD --> EXT
    PROD --> OBS
```

Le déploiement est une conséquence de l'architecture et du niveau de risque. Il ne doit pas être implicitement décidé par le Developer Agent.

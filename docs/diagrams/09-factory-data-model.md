# 09 — Factory Data Model

Ce modèle est conceptuel. Il ne constitue pas encore un schéma PostgreSQL définitif.

```
erDiagram
    PROJECT ||--o{ FEATURE : contains
    FEATURE ||--o{ TASK : decomposes
    TASK }o--|| AGENT : assigned_to
    TASK ||--o{ HANDOFF : produces
    HANDOFF }o--|| AGENT : from_agent
    HANDOFF }o--|| AGENT : to_agent
    PROJECT ||--o{ DECISION : has
    PROJECT ||--o{ RISK : contains
    PROJECT ||--o{ METRIC : measures
    KNOWLEDGE ||--o{ PATTERN : becomes
    KNOWLEDGE ||--o{ LESSON : contains
    PATTERN }o--o{ SKILL : informs
    LESSON }o--o{ RULE : informs
    PATTERN }o--o{ TEMPLATE : informs
    PROJECT { string id string name string status }

    classDef context fill:#2563EB,color:#fff,stroke:#1D4ED8,stroke-width:2px;
    classDef product fill:#10B981,color:#fff,stroke:#047857,stroke-width:2px;
    classDef architecture fill:#7C3AED,color:#fff,stroke:#6D28D9,stroke-width:2px;
    classDef development fill:#F59E0B,color:#111827,stroke:#D97706,stroke-width:2px;
    classDef quality fill:#EF4444,color:#fff,stroke:#B91C1C,stroke-width:2px;
    classDef learning fill:#EAB308,color:#111827,stroke:#A16207,stroke-width:2px;
    classDef infra fill:#06B6D4,color:#fff,stroke:#0891B2,stroke-width:2px;
    classDef decision fill:#F97316,color:#fff,stroke:#C2410C,stroke-width:2px;
    FEATURE { string id string project_id string status }
    TASK { string id string feature_id string agent_id string status }
    AGENT { string id string role string scope }
    HANDOFF { string id string task_id string status }
    DECISION { string id string project_id string decision string rationale }
    RISK { string id string project_id string level }
    METRIC { string id string project_id string name float value }
    KNOWLEDGE { string id string type string source }
    PATTERN { string id string knowledge_id }
    LESSON { string id string knowledge_id }
    SKILL { string id string name }
    RULE { string id string name }
    TEMPLATE { string id string name }
```

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

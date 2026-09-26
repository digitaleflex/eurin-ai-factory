# Security Modeling

La sécurité doit être modélisée au même titre que les données et le comportement.

## 1. Trust Boundary

Identifier les zones où le niveau de confiance change.

## 2. Permission Matrix

| Actor | Resource | Action | Allowed |
|---|---|---|---|
| User | Own Project | Read | Yes |
| User | Other Project | Write | No |
| Admin | Project | Manage | Selon policy |

## 3. Threat Model

Documenter :

- asset ;
- actor ;
- threat ;
- attack surface ;
- impact ;
- mitigation ;
- residual risk.

## 4. Data Classification

Classer les données selon leur sensibilité.

## 5. Security Flow

@@FENCE
flowchart LR
    CLIENT[Client] --> AUTH[Authentication]
    AUTH --> AUTHZ[Authorization]
    AUTHZ --> API[Application]
    API --> DB[(Data)]
    API --> LOG[Audit / Logs]
@@FENCE

## Règle

Une fonctionnalité qui manipule des données ou des permissions sensibles doit avoir un modèle de sécurité explicite avant implémentation.

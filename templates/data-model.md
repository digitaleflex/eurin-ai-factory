# Data Model Template

## 1. Domain

Décrire le domaine concerné.

## 2. Entities

| Entity | Description | Owner |
|---|---|---|

## 3. Relationships

Décrire les relations et cardinalités.

## 4. Business Invariants

Lister les règles qui doivent toujours être vraies.

## 5. Conceptual Model

```
erDiagram
    ENTITY_A ||--o{ ENTITY_B : relation
```

## 6. Logical Model

Pour chaque entité :

- ID
- attributs
- types logiques
- contraintes
- relations

## 7. Physical Model

Définir :

- table ;
- colonne ;
- type ;
- PK ;
- FK ;
- indexes ;
- unique constraints.

## 8. Lifecycle

Décrire :

- create ;
- read ;
- update ;
- delete ;
- archive ;
- retention.

## 9. Security & Privacy

Identifier les données sensibles et leurs protections.

## 10. Open Questions

Lister ce qui reste inconnu.

## 11. Validation

- [ ] Conceptual model
- [ ] Logical model
- [ ] Physical model
- [ ] Constraints
- [ ] Indexes
- [ ] Security
- [ ] Migration strategy

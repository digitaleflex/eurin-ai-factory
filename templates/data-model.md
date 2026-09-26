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

## 11. ORM / Data Access Decision

- ORM retenu : Prisma / Drizzle / autre justifié
- Pourquoi ce choix :
- Base de données cible :
- Stratégie de migrations :
- Emplacement du data access :
- Conventions de requêtes :
- Cas nécessitant du SQL natif :
- Risques / limites :
- Plan de migration si projet existant :

### Decision criteria

- [ ] Modèle de données
- [ ] Complexité relationnelle
- [ ] Contrôle SQL nécessaire
- [ ] Environnement d'exécution
- [ ] Contraintes serverless/edge
- [ ] Productivité
- [ ] Maintenabilité
- [ ] Compétences de l'équipe
- [ ] Coût de migration

## 12. Validation

- [ ] Conceptual model
- [ ] Logical model
- [ ] Physical model
- [ ] ORM decision
- [ ] Constraints
- [ ] Indexes
- [ ] Security
- [ ] Migration strategy
- [ ] Critical queries

# Skill — PostgreSQL

## Purpose

Concevoir et exploiter un modèle PostgreSQL fiable, cohérent, sécurisé et adapté au domaine.

## Activation

Charger ce Skill pour :

- modélisation de données ;
- schéma SQL ;
- Prisma / ORM ;
- migrations ;
- relations ;
- contraintes ;
- indexes ;
- transactions ;
- requêtes ;
- performance ;
- intégrité des données.

## Non-Activation

Ne pas le charger pour une modification UI sans impact sur les données.

## Required Context

Connaître :

- domaine métier ;
- invariants ;
- entités ;
- cardinalités ;
- volume approximatif ;
- fréquence des accès ;
- stratégie de migration ;
- exigences de rétention ;
- sensibilité des données.

## Method

1. Partir du modèle conceptuel.
2. Définir le modèle logique.
3. Identifier PK/FK et cardinalités.
4. Définir les contraintes d'intégrité.
5. Choisir les types.
6. Identifier les indexes nécessaires.
7. Définir la migration.
8. Vérifier les transactions.
9. Vérifier les accès et permissions.
10. Tester les cas critiques.

## Data Principles

- Les invariants métier importants doivent être protégés au bon niveau.
- Ne pas utiliser l'application seule pour garantir une contrainte qui doit rester vraie en base.
- Éviter les indexes sans justification.
- Éviter la dénormalisation prématurée.
- Les migrations doivent être réversibles ou disposer d'une stratégie de récupération documentée.

## Security

Vérifier :

- moindre privilège ;
- données sensibles ;
- credentials ;
- accès réseau ;
- logs ;
- sauvegardes ;
- suppression/rétention.

## Failure Modes

- commencer directement par les tables ;
- absence de contraintes ;
- migrations destructives non documentées ;
- N+1 queries ;
- indexes inutiles ;
- exposition de données par API ;
- mélange entre modèle métier et modèle de présentation.

## Escalation

Escalader si :

- migration destructive ;
- modification d'un contrat de données partagé ;
- perte potentielle de données ;
- changement de stratégie de stockage ;
- problème de cohérence difficile à résoudre localement.

## Validation

- migration test ;
- contraintes ;
- tests de données ;
- requêtes critiques ;
- indexes justifiés ;
- rollback/recovery strategy.

# Skill — ORM / Data Access

## Purpose

Choisir et utiliser correctement la couche d'accès aux données d'un projet, avec **Prisma** ou **Drizzle ORM** selon le contexte.

Ce Skill complète le Skill PostgreSQL.

- PostgreSQL = modèle et garanties de la base de données.
- ORM = manière d'accéder aux données depuis l'application.

## Activation

Charger ce Skill pour :

- choix d'un ORM ;
- création ou modification d'un schéma ORM ;
- requêtes ;
- repositories/data access ;
- migrations ;
- relations ;
- transactions ;
- optimisation des accès aux données ;
- changement de Prisma vers Drizzle ou inversement.

## Non-Activation

Ne pas charger ce Skill uniquement pour :

- une requête SQL ponctuelle sans modification de la couche data ;
- une décision purement UI ;
- une tâche frontend sans accès aux données.

## Required Context

Avant de choisir ou modifier l'ORM, connaître :

- base de données cible ;
- environnement d'exécution ;
- modèle de données ;
- complexité des relations ;
- exigences de performance ;
- contraintes serverless/edge ;
- conventions du projet ;
- stratégie de migration ;
- niveau de contrôle SQL nécessaire.

## Decision Matrix

| Critère | Prisma | Drizzle |
|---|---|---|
| Abstraction ORM structurée | Forte | Plus proche du SQL |
| Productivité CRUD | Très adaptée | Très adaptée |
| Contrôle SQL explicite | Possible, mais plus abstrait | Prioritaire dans l'approche |
| Modèles relationnels complexes | Très adapté | Très adapté |
| Besoin de proximité PostgreSQL/SQL | Moins central | Central |
| Couche data minimale | À évaluer | Souvent adaptée |
| Choix par défaut | Aucun | Aucun |

Cette matrice sert à cadrer la décision ; elle ne constitue pas un classement.

## Method

1. Définir le modèle conceptuel.
2. Définir le modèle logique.
3. Choisir PostgreSQL ou une autre base compatible.
4. Évaluer Prisma et Drizzle selon les contraintes réelles.
5. Documenter la décision.
6. Définir le schéma ORM.
7. Générer/écrire les migrations.
8. Vérifier les contraintes en base.
9. Implémenter l'accès aux données.
10. Tester les requêtes critiques.
11. Vérifier les transactions et cas limites.
12. Vérifier les performances lorsque le risque est significatif.

## Rules

### Une seule source de vérité

Un projet ne doit pas avoir deux systèmes concurrents pour gérer son schéma et ses migrations.

### Prisma

Si Prisma est choisi :

- le schéma Prisma doit rester lisible ;
- les migrations doivent être versionnées ;
- le client généré ne doit pas être modifié manuellement ;
- les requêtes complexes doivent être justifiées et encapsulées.

### Drizzle

Si Drizzle est choisi :

- les schémas doivent rester cohérents avec le modèle métier ;
- les migrations doivent être versionnées ;
- les constructions SQL complexes doivent rester lisibles ;
- les accès data doivent être encapsulés lorsque leur complexité augmente.

### Commun

- ne jamais exposer directement l'ORM à une couche qui ne devrait pas connaître la persistance ;
- valider les entrées avant accès aux données ;
- éviter N+1 ;
- utiliser les transactions lorsque l'invariant métier l'exige ;
- ne pas supprimer une contrainte de base pour simplifier le code applicatif ;
- ne pas stocker de secrets dans le schéma ou le code ;
- vérifier les permissions côté serveur.

## Output

Une décision ORM doit produire au minimum :

- ORM retenu ;
- justification ;
- version/contraintes importantes ;
- stratégie de migration ;
- emplacement du code data access ;
- conventions de requêtes ;
- stratégie de tests.

## Validation

- migrations reproductibles ;
- contraintes DB vérifiées ;
- types cohérents ;
- requêtes critiques testées ;
- transactions vérifiées ;
- permissions vérifiées ;
- absence de N+1 évident ;
- rollback/migration planifié pour les changements risqués.

## Escalation

Escalader si :

- changement d'ORM sur un projet existant ;
- migration destructive ;
- modification importante du modèle ;
- risque de perte de données ;
- conflit entre contraintes ORM et contraintes PostgreSQL ;
- décision affectant plusieurs services.

## Handoff

Le handoff doit indiquer :

- modèle modifié ;
- migrations ;
- ORM utilisé ;
- fichiers data access concernés ;
- tests effectués ;
- risques connus ;
- prochaines actions.

# Skill — Deployment

## Purpose

Transformer une implémentation validée en livraison reproductible, observable et réversible.

## Activation

Charger ce Skill pour :

- CI/CD ;
- build ;
- preview ;
- production ;
- variables d'environnement ;
- migrations en déploiement ;
- rollback ;
- monitoring ;
- release.

## Required Context

Connaître :

- environnement cible ;
- méthode de build ;
- stratégie de configuration ;
- secrets ;
- base de données ;
- dépendances externes ;
- stratégie de rollback ;
- monitoring disponible.

## Method

1. Vérifier le build.
2. Vérifier les tests requis.
3. Vérifier les variables d'environnement.
4. Vérifier les migrations.
5. Évaluer le blast radius.
6. Définir le plan de livraison.
7. Définir le rollback.
8. Déployer selon les permissions autorisées.
9. Vérifier la santé du système.
10. Documenter le résultat.

## Deployment Principles

- Reproducible.
- Observable.
- Least privilege.
- Configuration séparée du code.
- Rollback prévu avant release.
- Pas de déploiement critique sans validation appropriée.

## Failure Modes

- déployer sans build validé ;
- secrets manquants ;
- migration incompatible ;
- absence de rollback ;
- absence de health check ;
- changement infrastructurel non documenté ;
- considérer un déploiement réussi uniquement parce que la commande s'est terminée.

## Escalation

Obligatoire pour :

- production critique ;
- migration destructive ;
- changement DNS ;
- changement de secrets ;
- infrastructure majeure ;
- rollback incertain ;
- impact multi-projets.

## Validation

- build ;
- tests ;
- deployment status ;
- health check ;
- logs ;
- monitoring ;
- smoke test ;
- rollback readiness.

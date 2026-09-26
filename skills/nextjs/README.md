# Skill — Next.js

## Purpose

Concevoir et implémenter des applications Next.js de manière cohérente avec l'architecture du projet, les règles de la Factory et le niveau de risque.

## Activation

Charger ce Skill lorsque la tâche concerne :

- App Router ;
- Server Components ;
- Client Components ;
- layouts ;
- routing ;
- Server Actions ;
- API / Route Handlers ;
- middleware / proxy ;
- data fetching ;
- caching ;
- rendering ;
- formulaires ;
- validation côté serveur ;
- performance Next.js.

## Non-Activation

Ne pas le charger pour une tâche purement :

- PostgreSQL ;
- infrastructure ;
- sécurité générale sans composant Next.js ;
- design graphique sans implémentation.

## Required Context

Avant utilisation, connaître :

- version de Next.js ;
- structure du projet ;
- stratégie de rendu ;
- source des données ;
- authentification ;
- contraintes de déploiement ;
- conventions existantes.

## Method

1. Inspecter la structure existante.
2. Identifier Server vs Client.
3. Identifier le flux de données.
4. Vérifier les conventions existantes.
5. Réutiliser les composants/utilitaires.
6. Implémenter le minimum nécessaire.
7. Vérifier erreurs, loading et empty states.
8. Vérifier typecheck, lint, tests et build selon le contexte.

## Architecture Guidance

Par défaut :

- Server Components lorsque le rendu serveur suffit ;
- Client Components uniquement lorsqu'une interactivité navigateur le nécessite ;
- validation serveur pour les données sensibles ;
- logique métier hors des composants lorsque sa réutilisation le justifie ;
- contrats explicites entre UI et backend.

## Performance

Examiner lorsque pertinent :

- waterfalls ;
- taille des payloads ;
- cache ;
- revalidation ;
- bundle client ;
- images ;
- requêtes inutiles ;
- rendu dynamique involontaire.

## Security

Ne jamais considérer le code client comme une frontière de sécurité.

Les autorisations et règles sensibles doivent être vérifiées côté serveur.

## Failure Modes

- transformer inutilement tout le projet en Client Components ;
- mettre la logique métier dans l'UI ;
- exposer des secrets au client ;
- ajouter une dépendance pour un problème déjà résolu ;
- modifier le routing hors scope ;
- ignorer loading/error/empty states.

## Escalation

Escalader si :

- la version de Next.js change une décision structurante ;
- une modification implique une migration globale ;
- le comportement de cache est ambigu et critique ;
- l'architecture existante contredit la nouvelle spécification.

## Validation

- typecheck ;
- lint ;
- tests pertinents ;
- build ;
- vérification des parcours critiques.

# Coding Rules

## C1 — TypeScript strict
Utiliser le typage strict lorsqu'un projet TypeScript le permet. Éviter `any` sauf justification explicite.

## C2 — Lisibilité avant magie
Préférer un code explicite, compréhensible et maintenable aux abstractions prématurées.

## C3 — Responsabilité unique
Une fonction, un module ou un composant doit avoir une responsabilité claire.

## C4 — Validation des entrées
Toute donnée provenant de l'extérieur du système doit être validée avant usage.

## C5 — Gestion des erreurs
Les erreurs doivent être explicites, traçables et traitées au bon niveau. Ne jamais masquer silencieusement une erreur importante.

## C6 — Pas de duplication inutile
Extraire une abstraction lorsque la répétition est réelle et stable, pas au premier doublon.

## C7 — Nommage
Les noms doivent décrire l'intention métier ou technique. Éviter les noms vagues.

## C8 — Configuration
Les secrets et paramètres d'environnement ne doivent jamais être codés en dur.

## C9 — Observabilité
Les opérations critiques doivent produire des logs utiles sans exposer de données sensibles.

## C10 — Documentation ciblée
Documenter les décisions non évidentes, les contraintes et les conventions. Ne pas documenter mécaniquement chaque ligne de code.

## C11 — Pas de modification silencieuse
Un agent ne doit pas modifier un contrat, une API ou une décision d'architecture sans le signaler.

## C12 — Code généré
Le code généré par IA est traité comme du code humain : il doit être relu, testé, sécurisé et validé.

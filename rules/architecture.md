# Architecture Rules

## R1 — Architecture orientée besoin
Aucune décision d'architecture ne doit exister sans problème concret à résoudre.

## R2 — Simplicité par défaut
Choisir l'architecture la plus simple qui satisfait les exigences connues.

## R3 — Pas de sur-architecture
Ne pas introduire microservices, event bus, CQRS, workers, cache distribué ou infrastructure complexe sans exigence démontrée.

## R4 — Séparation claire
Séparer au minimum :
- présentation / UI
- logique métier
- accès aux données
- intégrations externes
- configuration et infrastructure

## R5 — Contrats explicites
Les interfaces entre modules, services et agents doivent être documentées et stables.

## R6 — Source de vérité unique
Une même donnée métier ne doit pas avoir plusieurs sources de vérité concurrentes.

## R7 — Évolutivité progressive
Concevoir pour l'évolution probable, pas pour des scénarios hypothétiques illimités.

## R8 — Changements architecturaux
Toute modification importante d'architecture doit préciser :
- problème observé
- options considérées
- décision
- justification
- impact
- plan de migration si nécessaire

## R9 — Réutilisation
Tout pattern réellement réutilisable doit être candidat au Starter Kit, à un Skill ou à un Template.

## R10 — Technologies
Une nouvelle technologie n'entre dans la Factory que si elle apporte un bénéfice démontrable ou répond à une contrainte précise.

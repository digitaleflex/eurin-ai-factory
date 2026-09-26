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

## R11 — Bibliothèque UI de référence
Pour les applications web utilisant la convention UI de la Factory :
- Tailwind CSS est la base de styling ;
- shadcn/ui est la base de composants UI réutilisables ;
- une autre bibliothèque UI structurante nécessite une justification.

## R12 — ORM choisi par projet
Prisma et Drizzle sont tous deux supportés par la Factory.

Le choix n'est pas automatique. Il doit être déterminé par le contexte du projet et documenté.

### Prisma peut être privilégié lorsque

- la productivité applicative et la lisibilité du modèle sont prioritaires ;
- le projet possède un modèle relationnel riche ;
- l'équipe bénéficie d'une abstraction ORM plus structurée ;
- les workflows de migration et de génération de client correspondent au projet.

### Drizzle peut être privilégié lorsque

- le projet nécessite un contrôle plus direct de la construction SQL ;
- la proximité avec PostgreSQL et les primitives SQL est importante ;
- une couche ORM/SQL légère et explicite correspond mieux au projet ;
- les contraintes d'exécution favorisent une approche minimale.

### Contraintes communes

Quel que soit l'ORM :

- le modèle conceptuel précède le schéma physique ;
- les invariants métier ne doivent pas dépendre uniquement de l'ORM ;
- les contraintes importantes doivent être garanties au niveau base de données lorsque pertinent ;
- un seul outil doit être la source de vérité des migrations d'un projet ;
- Prisma et Drizzle ne doivent pas être utilisés simultanément pour gérer le même schéma sans justification architecturale explicite ;
- le SQL natif reste autorisé lorsqu'il apporte une valeur démontrée et doit être encapsulé/documenté.

## R13 — Décision de stack traçable
Pour tout nouveau projet significatif, la stack doit préciser au minimum :
- frontend ;
- UI/design system ;
- backend ;
- base de données ;
- ORM/data access ;
- authentification ;
- déploiement ;
- observabilité si nécessaire.

Les choix importants doivent être justifiés lorsqu'il existe plusieurs options supportées par la Factory.

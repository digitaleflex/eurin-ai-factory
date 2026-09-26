# Skill — Security

## Purpose

Intégrer la sécurité dans la conception, l'implémentation et la validation plutôt que comme une étape finale.

## Activation

Charger ce Skill pour :

- auth ;
- authorization ;
- RBAC / permissions ;
- sessions ;
- secrets ;
- données sensibles ;
- APIs exposées ;
- uploads ;
- paiements ;
- intégrations externes ;
- threat modeling ;
- sécurité applicative ;
- changements à fort blast radius.

## Required Context

Identifier :

- assets ;
- actors ;
- trust boundaries ;
- permissions ;
- données sensibles ;
- surfaces d'attaque ;
- impact potentiel.

## Method

1. Identifier ce qui doit être protégé.
2. Identifier qui peut agir.
3. Identifier les frontières de confiance.
4. Définir authentication.
5. Définir authorization.
6. Valider les entrées.
7. Réduire les privilèges.
8. Protéger les secrets.
9. Journaliser les événements pertinents.
10. Tester les scénarios négatifs.

## Security Principles

- deny by default ;
- least privilege ;
- server-side enforcement ;
- explicit validation ;
- secrets outside source code ;
- fail safely ;
- audit sensitive actions ;
- minimize exposed data.

## Failure Modes

- faire confiance au client ;
- confondre authentification et autorisation ;
- stocker des secrets dans Git ;
- retourner trop de données ;
- absence de validation serveur ;
- permissions implicites ;
- logs contenant des secrets ou données sensibles.

## Escalation

Obligatoire pour :

- secrets de production ;
- données critiques ;
- changement global d'autorisation ;
- suppression ou migration sensible ;
- vulnérabilité non maîtrisée ;
- décision de sécurité ayant un impact organisationnel important.

## Validation

- abuse cases ;
- permission matrix ;
- tests négatifs ;
- validation serveur ;
- secret scan lorsque disponible ;
- revue des trust boundaries ;
- vérification des logs.

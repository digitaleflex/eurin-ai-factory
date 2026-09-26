# Modèles comportementaux

## Sequence Diagram

À utiliser lorsqu'on doit comprendre l'ordre des échanges.

Exemples :

- login ;
- paiement ;
- création d'une mission ;
- appel API ;
- workflow multi-agent.

## State Machine

À utiliser lorsqu'un objet possède un cycle de vie explicite.

Exemple :

` PENDING → IN_REVIEW → APPROVED / REJECTED / REVISION@@

## Flowchart

À utiliser pour une logique ou un processus.

## Activity Diagram

À utiliser lorsqu'un processus comporte plusieurs branches, responsabilités ou activités parallèles.

## Règle

Si la question principale est « qui fait quoi et dans quel ordre ? », utiliser Sequence.

Si la question principale est « dans quel état se trouve l'objet et que peut-il devenir ? », utiliser State Machine.

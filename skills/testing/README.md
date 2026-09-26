# Skill — Testing

## Purpose

Déterminer et exécuter le niveau de validation adapté au risque réel d'une modification.

## Activation

Charger ce Skill pour :

- nouvelle fonctionnalité ;
- bug fix ;
- refactor ;
- changement de données ;
- changement d'auth ;
- API ;
- workflow critique ;
- régression ;
- release.

## Required Context

Identifier :

- comportement attendu ;
- critères d'acceptation ;
- blast radius ;
- composants affectés ;
- risques ;
- tests existants.

## Test Pyramid

Privilégier lorsque pertinent :

1. Unit tests
2. Integration tests
3. API / contract tests
4. End-to-end tests
5. Manual critical-path verification

Le niveau dépend du risque, pas d'une règle mécanique.

## Method

1. Traduire les critères d'acceptation en vérifications.
2. Identifier les cas nominaux.
3. Identifier les cas limites.
4. Identifier les cas d'erreur.
5. Identifier les scénarios de régression.
6. Ajouter les tests au niveau approprié.
7. Exécuter les validations.
8. Documenter ce qui n'a pas pu être vérifié.

## Quality Principle

Un test qui ne peut pas échouer de manière significative n'apporte qu'une faible garantie.

## Failure Modes

- tester uniquement le happy path ;
- tests trop couplés à l'implémentation ;
- absence de cas négatifs ;
- déclarer PASS sans exécution ;
- ignorer les régressions ;
- masquer un test flaky.

## Escalation

Escalader si :

- une validation critique est impossible ;
- l'environnement ne permet pas de reproduire le problème ;
- le risque résiduel reste élevé ;
- les tests et la spécification se contredisent.

## Validation Output

Toujours distinguer :

- PASS ;
- FAIL ;
- PARTIAL ;
- BLOCKED ;
- NOT VERIFIED.

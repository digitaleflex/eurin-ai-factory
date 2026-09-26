# Decision Gates

Les Decision Gates contrôlent le passage d'une étape à l'autre.

## Gate 1 — Intake

Questions minimales : problème, résultat attendu, périmètre, contraintes, risque.

Résultats : CONTINUE, ASSUME + DOCUMENTE, ASK / ESCALATE, BLOCKED.

## Gate 2 — Architecture

Vérifier : besoin réel, simplicité, alternatives, blast radius, réversibilité, coût.

## Gate 3 — Execution

Vérifier que les artefacts nécessaires sont approuvés et que les permissions sont suffisantes.

## Gate 4 — Quality

Vérifier les critères d'acceptation, tests pertinents, sécurité et régressions.

## Gate 5 — Release

Vérifier build, configuration, migration, observability, rollback et autorisation de production.

## Gate 6 — Memory

Après livraison, déterminer ce qui mérite d'être promu en décision, pattern, lesson, mistake ou incident.

## Règle

Un Gate ne valide pas la qualité globale du projet. Il autorise uniquement le passage vers l'étape suivante selon les critères définis.
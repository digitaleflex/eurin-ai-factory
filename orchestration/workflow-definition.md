# Workflow Definition Contract

Un workflow est défini par un contrat explicite.

## Identité
- `id`
- `version`
- `purpose`
- `owner`

## Trigger
- événement ou demande qui démarre le workflow ;
- contexte minimal requis ;
- préconditions.

## Steps
Chaque étape définit :
- `id`
- `agent`
- `objective`
- `inputs`
- `required_skills`
- `gate_before`
- `gate_after`
- `allowed_actions`
- `outputs`
- `failure_policy`

## Conditions
Une étape peut être :
- `REQUIRED`
- `CONDITIONAL`
- `OPTIONAL`

La condition doit être explicable et basée sur le contexte disponible.

## Failure policy
- `RETRY` — nouvelle tentative contrôlée ;
- `REVISE` — retour vers l'étape responsable ;
- `ESCALATE` — intervention humaine ou agent spécialisé ;
- `BLOCK` — arrêt jusqu'à résolution ;
- `ABORT` — terminaison du workflow.

## Versioning
Modifier un workflow est un changement architectural du système de production. Le changement doit être traçable et validé selon son blast radius.

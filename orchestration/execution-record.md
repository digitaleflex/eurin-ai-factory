# Execution Record

Chaque workflow doit pouvoir produire un enregistrement d'exécution minimal.

## Identité
- execution_id
- workflow_id
- workflow_version
- started_at
- completed_at

## État
- current_state
- current_step
- final_status

## Traçabilité
- agents exécutés ;
- handoffs ;
- Decision Gates ;
- escalades ;
- approbations humaines ;
- artefacts produits ;
- validations ;
- erreurs et retries.

## Final status
- `COMPLETED`
- `FAILED`
- `BLOCKED`
- `ABORTED`
- `PARTIAL`

L'execution record ne doit pas stocker de secrets. Les références vers les artefacts sont préférées aux copies inutiles de contenu sensible.

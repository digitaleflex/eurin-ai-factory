# Escalation Model

L'escalade est un mécanisme normal de contrôle, pas un échec de l'agent.

## Escalade vers Eurin

Obligatoire lorsque :
- une décision produit structurante reste ambiguë ;
- plusieurs options ont un impact stratégique significatif ;
- une action destructive ou difficilement réversible est proposée ;
- une migration majeure de données est nécessaire ;
- une modification de production à fort blast radius est envisagée ;
- une décision dépasse explicitement l'autorité accordée à l'agent.

## Escalade technique

Vers un agent spécialisé lorsque le problème relève clairement d'un autre domaine : Data, Security, QA, Deployment, UI, etc.

## Format

```text
ESCALATION
Reason:
Impact:
Evidence:
Options:
Recommendation:
Decision required from:
Blocking:
```

`Recommendation` reste une recommandation technique. Elle ne transforme pas l'agent en décideur lorsque l'autorité appartient à Eurin.

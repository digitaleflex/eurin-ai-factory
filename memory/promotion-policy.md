# Memory Promotion Policy

La mémoire de la Factory est alimentée par des observations vérifiables, pas par toutes les sorties des agents.

## Pipeline

```text
Execution
   ↓
Observation
   ↓
Evidence
   ↓
Candidate
   ↓
Review
   ├── REJECTED
   └── APPROVED
          ↓
     Memory Entry
          ↓
        Reuse
```

## Conditions de promotion

Une information peut être promue lorsqu'elle est :
- suffisamment documentée ;
- utile au-delà du cas immédiat ;
- non contradictoire avec les règles actuelles ;
- associée à son contexte ;
- vérifiable ;
- dépourvue de secrets inutiles.

## Ne pas promouvoir

- intuition isolée ;
- hypothèse non vérifiée ;
- préférence personnelle sans justification ;
- workaround temporaire ;
- information spécifique à un environnement sans le préciser.

## Révision

Une mémoire importante peut devenir `ACTIVE`, `SUPERSEDED`, `DEPRECATED` ou `REVOKED`.

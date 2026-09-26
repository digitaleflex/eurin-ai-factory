# Factory Memory

La mémoire transforme l'expérience des projets en connaissances réutilisables.

## Structure
```text
memory/
├── decisions/
├── patterns/
├── lessons/
├── mistakes/
└── incidents/
```

## Règle de promotion
Une information n'entre pas automatiquement dans la mémoire simplement parce qu'un agent l'a produite.

```text
Observation → Evidence → Review → Memory Candidate → Approved Memory → Reuse
```

## Types
### Decision
Choix structurant, avec alternatives, raisons, conséquences et statut.

### Pattern
Solution reproductible déjà validée dans au moins un contexte.

### Lesson
Apprentissage qui modifie une manière de travailler.

### Mistake
Erreur documentée avec cause et prévention.

### Incident
Événement réel ayant affecté sécurité, disponibilité, données ou livraison.

## Anti-pollution
La mémoire doit éviter :
- hypothèses non vérifiées ;
- doublons ;
- décisions obsolètes présentées comme actuelles ;
- conseils dépendant d'un ancien contexte sans signalement ;
- secrets ou données sensibles inutiles.

Chaque entrée importante doit indiquer son contexte, son statut et sa date.
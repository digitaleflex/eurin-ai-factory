# Definition of Done

Une unité de travail est considérée comme DONE lorsque, selon son niveau de risque :

- [ ] Le besoin et le périmètre sont clairs.
- [ ] Les critères d'acceptation sont satisfaits.
- [ ] Le code respecte les règles applicables.
- [ ] Les entrées externes sont validées.
- [ ] Les erreurs importantes sont gérées.
- [ ] Les tests pertinents passent.
- [ ] Le lint/typecheck/build passent lorsque disponibles.
- [ ] Les impacts sécurité ont été vérifiés.
- [ ] Les états UI pertinents sont gérés.
- [ ] La documentation nécessaire est à jour.
- [ ] Aucun secret n'a été ajouté au dépôt.
- [ ] Les fichiers modifiés et limites sont identifiés.
- [ ] Le résultat a été vérifié dans l'environnement pertinent.

### Niveau de validation

**Faible risque**
Typecheck + lint + tests pertinents.

**Risque moyen**
+ intégration + parcours critique + revue.

**Risque élevé**
+ revue sécurité + tests renforcés + validation humaine explicite avant action sensible/production.

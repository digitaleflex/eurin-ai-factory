# Git Rules

## G1 — Git est la mémoire du système
L'historique doit permettre de comprendre ce qui a changé et pourquoi.

## G2 — Commits atomiques
Un commit doit représenter une unité logique de changement.

## G3 — Messages explicites
Les messages de commit doivent décrire l'intention du changement.

Format recommandé :
`type(scope): description`

Exemples :
- `feat(missions): add mission completion workflow`
- `fix(auth): validate session expiration`
- `docs(factory): define agent rules`

## G4 — Pas de gros commit opaque
Éviter les commits mélangeant fonctionnalité, refactor massif et changement de configuration sans justification.

## G5 — Branches
Utiliser des branches de travail pour les changements significatifs. La branche `main` doit rester publiable.

## G6 — PR pour changement significatif
Les changements importants doivent passer par une Pull Request lorsque le workflow du projet le permet.

## G7 — Aucun secret
Ne jamais committer secrets ou fichiers sensibles.

## G8 — Revue avant fusion
Une modification importante doit être vérifiée par tests et/ou revue avant fusion.

## G9 — Revert propre
Préférer un revert explicite à des manipulations destructrices de l'historique partagé.

## G10 — Agents
Un agent doit indiquer les fichiers modifiés, les tests exécutés et les limites rencontrées.

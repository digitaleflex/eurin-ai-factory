# Feature Delivery — V1

Workflow standard pour une nouvelle fonctionnalité.

## Sequence

1. Product
2. Product Decision Gate
3. Architect
4. Architecture Decision Gate
5. UI / Data / Security selon besoin
6. Human Approval si requis
7. Developer
8. QA
9. Release / Deployment
10. Memory Review

## Routing

### UI requis si
La fonctionnalité modifie une expérience utilisateur, une interface ou un parcours.

### Data requis si
La fonctionnalité introduit ou modifie des données persistantes, relations, contraintes, migrations ou requêtes critiques.

### Security requis si
La fonctionnalité touche authentification, autorisation, secrets, données sensibles, surface réseau, paiements, fichiers ou privilèges.

## Stop conditions
Une étape peut bloquer le workflow lorsqu'elle identifie une information critique manquante, un conflit avec la Source of Truth, un risque non traité ou une validation obligatoire absente.

## Exit criteria
Le workflow est terminé lorsque les critères d'acceptation sont satisfaits, les tests requis sont vérifiés, le mode de livraison est validé et les apprentissages pertinents ont été capturés.

# Security Rules

## S1 — Secure by default
Toute nouvelle fonctionnalité doit partir d'un modèle sécurisé par défaut.

## S2 — Least privilege
Accorder le minimum de permissions nécessaires aux utilisateurs, services et agents.

## S3 — Authentification ≠ autorisation
Vérifier séparément l'identité et les permissions.

## S4 — Validation côté serveur
Toute donnée sensible ou règle d'autorisation doit être contrôlée côté serveur.

## S5 — Secrets
Aucun secret, token, mot de passe, clé privée ou credential dans le dépôt.

## S6 — Données sensibles
Limiter la collecte, le stockage, les logs et la transmission aux données nécessaires.

## S7 — OWASP
Les contrôles de sécurité doivent couvrir au minimum les risques OWASP pertinents au projet.

## S8 — Dépendances
Les dépendances nouvelles doivent être justifiées et maintenues. Éviter les packages inutiles ou abandonnés.

## S9 — Sécurité des agents
Un agent ne doit jamais obtenir plus d'accès que nécessaire pour sa tâche.

## S10 — Actions à risque
Les opérations destructives, irréversibles ou de production doivent nécessiter une validation humaine explicite lorsqu'elles peuvent provoquer une perte de données, une interruption de service ou un impact important.

## S11 — Ne pas inventer la sécurité
Si un contrôle n'est pas vérifié, l'agent doit le déclarer comme non vérifié au lieu de prétendre qu'il est sécurisé.

## S12 — Incidents
Tout incident ou vulnérabilité significative doit être documenté, corrigé et transformé en apprentissage réutilisable lorsque pertinent.

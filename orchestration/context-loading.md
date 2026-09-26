# Context Loading

L'orchestrateur charge uniquement le contexte nécessaire à l'étape courante.

## Ordre de chargement

1. MASTER_RULES
2. Product Specification approuvée
3. Architecture approuvée
4. Contraintes Security pertinentes
5. Handoff entrant
6. Skills nécessaires
7. Mémoire pertinente
8. Implementation / tests selon le rôle

## Classification

- REQUIRED — indispensable pour agir ;
- RELEVANT — utile pour la tâche ;
- OPTIONAL — peut être ignoré ;
- FORBIDDEN — ne doit pas être transmis sans justification.

## Principe

Plus de contexte n'implique pas une meilleure décision. Le contexte doit être suffisant, traçable et proportionné au rôle.
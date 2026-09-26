# Quality Rules

## Q1 — Definition of Done
Une fonctionnalité n'est terminée que lorsque les critères fonctionnels et techniques définis sont satisfaits.

## Q2 — Test proportionné au risque
Le niveau de test dépend de l'impact de la fonctionnalité. Plus le risque est élevé, plus la validation doit être forte.

## Q3 — Pas de confiance aveugle
"Le code compile" ne signifie pas "la fonctionnalité est correcte".

## Q4 — Validation minimale
Avant livraison, vérifier selon le contexte :
- typecheck
- lint
- tests
- build
- parcours critique
- sécurité
- régression

## Q5 — États utilisateur
Les interfaces critiques doivent gérer au minimum :
- loading
- success
- error
- empty
- unauthorized lorsque pertinent

## Q6 — Régression
Toute correction de bug reproductible doit, lorsque pertinent, ajouter une protection de test contre sa réapparition.

## Q7 — Performance
Mesurer avant d'optimiser. Ne pas complexifier le système pour une optimisation hypothétique.

## Q8 — UX
La qualité inclut la compréhension du parcours utilisateur, pas seulement la qualité du code.

## Q9 — Rapport honnête
Un agent QA doit distinguer clairement :
- PASS
- FAIL
- NOT VERIFIED

## Q10 — Livraison
Une fonctionnalité n'est considérée comme livrée que lorsque son comportement attendu est vérifiable dans l'environnement cible.

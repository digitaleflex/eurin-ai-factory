# Skill — UI

## Purpose

Concevoir des interfaces cohérentes, accessibles, compréhensibles et adaptées au produit.

## Activation

Charger ce Skill pour :

- nouvelle page ;
- nouveau composant ;
- redesign ;
- design system ;
- responsive ;
- accessibilité ;
- états d'interface ;
- parcours utilisateur ;
- cohérence visuelle.

## Required Context

Connaître :

- objectif utilisateur ;
- rôle de l'écran ;
- design system existant ;
- composants disponibles ;
- contraintes responsive ;
- états fonctionnels ;
- stack UI du projet.

## UI Stack Convention

### Référence par défaut

Pour les applications web de la Factory :

- **Tailwind CSS** pour le styling utilitaire ;
- **shadcn/ui** pour les composants UI réutilisables ;
- **Radix UI** lorsque les primitives accessibles de shadcn/ui s'appuient dessus ;
- tokens et conventions du design system du projet comme source de cohérence visuelle.

shadcn/ui est traité comme une **collection de composants et de patterns intégrables dans le codebase**, pas comme une boîte noire à laquelle l'agent délègue les décisions de design.

### Règles

1. Réutiliser un composant shadcn/ui existant avant d'en créer un nouveau.
2. Personnaliser le composant lorsque le besoin relève du design system du produit.
3. Créer un nouveau composant uniquement lorsque le besoin n'est pas correctement couvert par l'existant.
4. Ne pas introduire une seconde bibliothèque de composants sans justification architecturale.
5. Conserver l'accessibilité et les comportements clavier lors des personnalisations.
6. Ne pas modifier directement les primitives externes lorsqu'une composition ou une extension locale suffit.
7. Les variantes visuelles doivent rester cohérentes avec les tokens et conventions du projet.
8. Les composants complexes doivent documenter leurs états et comportements importants.
9. L'agent doit vérifier les composants disponibles avant de réinventer une solution.
10. Une nouvelle dépendance UI importante nécessite une justification et une validation selon les règles d'architecture.

## Method

1. Comprendre le parcours utilisateur.
2. Identifier la hiérarchie d'information.
3. Vérifier les composants shadcn/ui disponibles.
4. Réutiliser le design system.
5. Définir les états :
   - loading ;
   - empty ;
   - error ;
   - success ;
   - disabled ;
   - permission denied ;
   - offline si pertinent.
6. Construire desktop et mobile.
7. Vérifier accessibilité.
8. Vérifier cohérence avec les écrans existants.

## UI Principles

- Clarté avant décoration.
- Cohérence avant nouveauté.
- Feedback visible.
- Actions importantes explicites.
- Responsive par conception.
- Accessibilité non optionnelle.
- Pas de composant visuel sans raison fonctionnelle.
- Pas de dépendance UI supplémentaire sans besoin démontré.

## Failure Modes

- réinventer un composant déjà disponible ;
- multiplier les bibliothèques UI ;
- modifier un composant au point de perdre son comportement accessible ;
- trop de couleurs ;
- absence d'états ;
- interactions ambiguës ;
- mobile traité à la fin ;
- contraste insuffisant ;
- décoration qui masque la hiérarchie.

## Escalation

Escalader si :

- nouvelle direction artistique globale ;
- changement du design system ;
- remplacement de shadcn/ui ou de Tailwind ;
- introduction d'une nouvelle bibliothèque UI structurante ;
- conflit entre conversion et accessibilité ;
- besoin d'une nouvelle interaction structurante.

## Validation

- responsive ;
- keyboard navigation lorsque pertinent ;
- focus states ;
- contrast ;
- loading/error/empty/success ;
- cohérence des composants ;
- absence de dépendance UI inutile.

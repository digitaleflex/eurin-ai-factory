# Agent Rules

## A1 — Lire avant d'agir
Avant toute modification, l'agent doit lire :
1. la demande
2. les règles applicables
3. les fichiers et contrats concernés
4. les contraintes du projet

## A2 — Ne pas inventer
L'agent ne doit pas inventer :
- exigences utilisateur
- données
- API
- permissions
- résultats de tests
- décisions d'architecture

Lorsqu'une information manque, il doit marquer l'incertitude.

## A3 — Scope contrôlé
Un agent ne modifie que ce qui est nécessaire pour sa mission.

## A4 — Respect des décisions
L'agent doit respecter les décisions architecturales existantes. Une déviation doit être signalée et justifiée.

## A5 — Pas de propagation d'erreur
Une sortie IA non vérifiée ne doit pas devenir automatiquement une vérité pour l'agent suivant.

## A6 — Sorties structurées
Chaque agent doit produire un résultat exploitable par l'agent suivant avec un format stable.

## A7 — Traçabilité
Chaque agent doit pouvoir indiquer :
- entrée
- actions réalisées
- fichiers touchés
- tests/vérifications
- résultat
- limites
- recommandations

## A8 — Validation humaine
Une validation humaine est requise pour les décisions ayant un impact important sur :
- architecture
- sécurité
- données
- coûts
- production
- suppression ou migration destructrice

## A9 — Échec contrôlé
Si l'agent ne peut pas satisfaire la demande avec suffisamment de confiance, il doit s'arrêter proprement et retourner un rapport plutôt que produire une solution fragile.

## A10 — Amélioration continue
Une erreur répétée ou un travail manuel répétitif peut devenir candidat à :
- règle
- Skill
- template
- automatisation
- composant du Starter Kit

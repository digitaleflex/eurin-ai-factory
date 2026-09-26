# Méthodes de modélisation

Cette bibliothèque définit les modèles de compréhension utilisables par la Factory.

## 1. Modèle produit

| Méthode | Usage |
|---|---|
| Problem Statement | Comprendre le problème |
| User Story | Comprendre le besoin utilisateur |
| Use Case | Comprendre une interaction métier |
| Acceptance Criteria | Définir le résultat attendu |
| Domain Glossary | Éliminer les ambiguïtés de vocabulaire |

## 2. Modèle système

| Méthode | Usage |
|---|---|
| C4 Context | Délimiter le système |
| C4 Container | Identifier les grands composants |
| C4 Component | Détailler un composant |
| Deployment Diagram | Comprendre l'infrastructure |

## 3. Modèle comportemental

| Méthode | Usage |
|---|---|
| Flowchart | Décrire une logique |
| Sequence Diagram | Décrire un échange temporel |
| State Machine | Décrire les états et transitions |
| Activity Diagram | Décrire une activité complexe |

## 4. Modèle de données

| Méthode | Usage |
|---|---|
| Conceptual Model | Entités métier |
| ERD | Relations entre entités |
| Logical Model | Attributs, clés, cardinalités |
| Physical Model | Tables, types, index, contraintes |
| Data Dictionary | Définition de chaque champ |
| Data Flow Diagram | Circulation des données |

## 5. Modèle décisionnel

| Méthode | Usage |
|---|---|
| Decision Table | Règles combinatoires |
| Decision Tree | Choix conditionnels |
| Risk Matrix | Priorisation des risques |
| ADR | Décisions d'architecture |

## 6. Règle de sélection

Ne pas produire tous les diagrammes automatiquement.

Choisir le modèle selon la question :

> Quel aspect du système est actuellement ambigu ?

Si le problème concerne les frontières → C4.

Si le problème concerne les données → ERD.

Si le problème concerne le temps → Sequence.

Si le problème concerne les états → State Machine.

Si le problème concerne les règles → Decision Table.

Si le problème concerne l'infrastructure → Deployment.

Si le problème concerne une décision technique → ADR.

# Melvynx — Engineering Reference

## Source

GitHub profile: Melvynx

Repositories étudiés pour cette première passe :
- aiblueprint
- agents-analysis
- api2cli
- agent-plugin
- next-zod-route
- saveit.now
- gemini-cli

## Patterns observés

### 1. Skills et agents distribuables

**Source : aiblueprint**

Le projet regroupe des skills réutilisables, des agents spécialisés, des hooks et des outils de configuration.

**Pertinence Factory : HIGH**

Notre Factory possède déjà `skills/` et `agents/`. Le pattern intéressant est donc la **distribution et l'installation**, pas la duplication de son catalogue.

### 2. Hooks de sécurité et automatisation

**Source : aiblueprint**

Le projet utilise des hooks pour contrôler certaines commandes et automatiser des traitements après modification.

**Pertinence Factory : HIGH**

À étudier pour notre futur Sandbox / CI Quality Gate.

### 3. Interface CLI standardisée pour les agents

**Source : api2cli**

Le projet standardise les commandes générées et leur sortie, afin qu'un agent puisse apprendre un modèle d'utilisation commun.

**Pertinence Factory : HIGH**

Cela peut devenir notre interface d'exécution humaine/agent pour Factory CLI et Provider Adapters.

### 4. AgentSkills comme contrat de distribution

**Source : api2cli**

Le projet expose une skill structurée suivant le standard AgentSkills.

**Pertinence Factory : HIGH**

Notre format de Skill peut évoluer vers un contrat portable entre Claude Code, Codex, Cursor, Gemini CLI et autres outils compatibles.

### 5. Adapters séparant le noyau du fournisseur

**Source : agent-plugin / api2cli**

Les capacités externes sont branchées par des adapters/configurations plutôt que directement dans toute l'application.

**Pertinence Factory : HIGH**

C'est cohérent avec notre `AgentAdapterRegistry`, `HumanApprovalAdapter` et les futurs Provider Adapters.

### 6. Validation des contrats API

**Source : next-zod-route**

Les entrées, métadonnées, middleware et permissions sont explicitement validés.

**Pertinence Factory : HIGH**

Le runtime doit continuer à renforcer la validation des WorkflowDefinition, AgentResult, Handoff et Context.

### 7. Analyse reproductible et protection des données

**Source : agents-analysis**

Les résultats sont structurés par utilisateur, outil et timestamp, avec des règles explicites contre la publication de logs privés.

**Pertinence Factory : HIGH**

Ce pattern est utile pour Execution Records, Evidence et Memory sans exposer de secrets ou de contenu privé.

### 8. Monorepo et packages partagés

**Source : saveit.now**

Séparation entre applications, backend, workers et packages partagés.

**Pertinence Factory : MEDIUM**

Utile lorsque la Factory deviendra un package réutilisable dans plusieurs projets. Pas une raison suffisante pour complexifier V1.

### 9. CLI spécialisée autour d'une capacité IA

**Source : gemini-cli**

Une capacité fournisseur est exposée derrière une interface CLI cohérente.

**Pertinence Factory : MEDIUM/HIGH**

À étudier pour les futurs Provider Adapters sans coupler le Runtime au fournisseur.

## Limites de cette référence

Cette page est une synthèse d'observation. Elle ne constitue pas un audit exhaustif des dépôts ni une validation de leurs choix pour nos contraintes.

Aucun pattern externe ne devient une règle Factory sans test, justification et décision documentée.

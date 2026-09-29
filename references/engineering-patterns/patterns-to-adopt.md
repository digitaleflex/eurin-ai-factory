# Patterns to Adopt

## Principe

Nous transformons les références externes en **patterns testables**, pas en copies d'architecture.

## V1 — à intégrer au noyau

### P1 — Skill Contract portable
**Objectif:** rendre chaque Skill identifiable, activable, versionnable et validable.

Déjà présent :
- SKILL_CONTRACT
- loading protocol
- skill selection

Prochaine amélioration :
- métadonnées machine-readable ;
- version ;
- dépendances ;
- incompatibilités ;
- validation automatique.

### P2 — Agent Adapter Boundary
**Objectif:** isoler l'orchestrateur des implémentations concrètes.

Déjà présent :
- AgentAdapter
- AgentAdapterRegistry
- RegistryAgentRunner

À renforcer :
- timeouts ;
- retries ;
- capability declaration ;
- provider metadata ;
- permission scope.

### P3 — Contract-first execution
**Objectif:** refuser tôt les sorties incompatibles.

Contrats concernés :
- WorkflowDefinition
- RoutingDecision
- AgentResult
- Handoff
- GateDecision
- ExecutionRecord

À renforcer :
- validation runtime centralisée ;
- erreurs structurées ;
- tests de compatibilité.

### P4 — Security Hooks
**Objectif:** bloquer automatiquement certaines actions dangereuses.

Cible :
- Sandbox ;
- Git adapter ;
- shell execution ;
- secrets ;
- production actions.

Condition :
- aucun hook critique ne doit devenir un contournement silencieux du Decision Gate.

### P5 — Standard CLI
**Objectif:** fournir une interface stable pour humain, agent et automation.

Cible :
`factory init`
`factory inspect`
`factory plan`
`factory run`
`factory status`
`factory approve`
`factory resume`

Le CLI ne doit pas contourner les règles du Runtime.

## V1.1 — après stabilisation

### P6 — Provider Adapter
Connecter Claude, OpenAI/Codex, Gemini ou d'autres fournisseurs derrière un contrat commun.

### P7 — Durable Execution
Persister les Execution Records et reprendre une exécution interrompue.

### P8 — Artifact / Handoff Registry
Rendre les artefacts produits par les agents adressables et traçables.

### P9 — Project Manifest
Décrire explicitement le projet, sa stack, ses contraintes, ses skills et ses permissions.

### P10 — Compatibility Matrix
Tester Factory + projets + providers + runtimes.

## V2 / expérimental

### P11 — Skill Marketplace
Distribuer et versionner des Skills.

### P12 — Multi-provider routing
Choisir un provider selon capacité, coût, latence et contraintes.

### P13 — Learning loop
Transformer les executions validées en patterns et skills réutilisables.

### P14 — Agent workspace isolation
Worktrees/sandboxes dédiés par agent et par tâche.

## Ce que nous n'adoptons pas automatiquement

- une architecture monorepo simplement parce qu'un projet externe en utilise une ;
- Bun à la place de Node sans mesure ;
- Convex à la place de PostgreSQL sans besoin ;
- une UI ou un framework spécifique sans justification ;
- une logique LLM directement dans le noyau d'orchestration ;
- une automatisation qui contourne Human Approval ;
- des features premium/commerciales comme dépendances de la Factory.

## Decision Gate

Avant chaque adoption structurante :

**Pattern observé → besoin Factory → alternatives → coût → blast radius → prototype/test → décision → ADR si nécessaire.**

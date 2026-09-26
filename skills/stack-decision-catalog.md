# Stack Decision Catalog

## Purpose

Fournir à la Factory une grille de décision pour proposer une architecture technique cohérente à partir du **type de projet et de ses contraintes réelles**.

Ce catalogue est un outil d'orientation, pas une liste de stacks obligatoires.

## Core principle

```text
Project Context
      ↓
Requirements
      ↓
Constraints
      ↓
Architecture options
      ↓
Stack Decision
      ↓
ADR / Project Context
```

La Factory ne choisit jamais une technologie uniquement parce qu'elle est présente dans le catalogue.

---

## 1. Stack layers

Chaque projet doit examiner au minimum :

| Layer | Options supportées |
|---|---|
| Frontend | Next.js / autre justifié |
| UI | Tailwind CSS + shadcn/ui / autre justifié |
| Backend | Next.js server / FastAPI / autre justifié |
| Database | PostgreSQL / autre justifié |
| ORM / Data Access | Prisma / Drizzle / SQL direct justifié |
| Auth | Better Auth / autre justifié |
| Validation | Zod / validation adaptée |
| Testing | Unit / Integration / E2E selon risque |
| Deployment | Vercel / VPS / autre adapté |
| Observability | logs / metrics / tracing selon besoin |

---

## 2. Project profiles

### Profile A — Web application / SaaS classique

**Contexte**

- application web interactive ;
- dashboard ;
- CRUD ;
- authentification ;
- données relationnelles ;
- équipe réduite.

**Candidate stack**

```text
Next.js
 + Tailwind CSS
 + shadcn/ui
 + PostgreSQL
 + Prisma OR Drizzle
 + Better Auth
```

**ORM decision**

- Prisma si la productivité et une abstraction ORM structurée dominent.
- Drizzle si la proximité SQL et le contrôle explicite dominent.

---

### Profile B — SaaS avec backend Python / IA

**Contexte**

- frontend web ;
- API backend indépendante ;
- IA/ML ;
- traitements Python ;
- workers ou pipelines de données.

**Candidate stack**

```text
Next.js
 + Tailwind CSS
 + shadcn/ui
        ↓
     FastAPI
        ↓
   PostgreSQL
        ↓
 Prisma/Drizzle côté TS
 ou SQLAlchemy côté Python
```

**Decision**

Le choix d'un backend Python doit être motivé par un besoin réel : écosystème Python, traitements IA/ML, bibliothèques scientifiques, workers spécialisés ou séparation de responsabilités.

Ne pas ajouter FastAPI uniquement pour séparer artificiellement frontend et backend.

---

### Profile C — Application métier relationnelle

**Contexte**

- beaucoup de relations ;
- règles métier fortes ;
- transactions ;
- administration ;
- reporting.

**Candidate stack**

```text
Next.js
 + shadcn/ui
 + PostgreSQL
 + Prisma OR Drizzle
```

Priorités :

- modèle de données robuste ;
- contraintes PostgreSQL ;
- transactions ;
- permissions serveur ;
- tests d'intégration.

---

### Profile D — API-first / backend spécialisé

**Contexte**

- plusieurs clients ;
- mobile + web ;
- intégrations externes ;
- API publique ou interne structurante.

**Candidate stack**

```text
Frontend(s)
     ↓
API
     ↓
PostgreSQL
     ↓
Data Access
```

Le framework backend est choisi selon les contraintes réelles.

---

### Profile E — Prototype / MVP rapide

**Contexte**

- validation d'une idée ;
- faible complexité initiale ;
- besoin de réduire le time-to-market.

**Candidate stack**

Privilégier la stack la plus simple déjà maîtrisée par l'équipe.

Exemple :

```text
Next.js
 + Tailwind
 + shadcn/ui
 + PostgreSQL
 + Prisma/Drizzle
```

Ne pas introduire une architecture distribuée avant d'avoir une exigence qui la justifie.

---

### Profile F — Système avec traitements asynchrones

**Contexte**

- jobs longs ;
- génération de documents ;
- emails ;
- traitement de fichiers ;
- tâches planifiées.

Architecture candidate :

```text
Application
    ↓
Job / Queue
    ↓
Worker
    ↓
Database / External Service
```

Le worker, la queue et le broker sont introduits uniquement si le traitement l'exige.

---

## 3. Prisma vs Drizzle decision

### Prisma

À considérer lorsque :

- le modèle relationnel est riche ;
- l'équipe veut une abstraction ORM structurée ;
- la productivité CRUD est importante ;
- le projet bénéficie d'un client généré et typé ;
- la stratégie de migrations correspond au workflow du projet.

### Drizzle

À considérer lorsque :

- la proximité avec SQL est importante ;
- le contrôle explicite des requêtes est recherché ;
- une couche data légère correspond mieux au projet ;
- les contraintes d'exécution rendent une approche minimale intéressante.

### Neither by default

Le choix peut être :

- SQL direct ;
- un autre data-access layer ;
- un ORM Python si le backend est Python.

La Factory doit expliquer pourquoi.

---

## 4. Next.js backend vs FastAPI

### Next.js peut rester full-stack lorsque

- frontend et backend appartiennent au même produit ;
- les API sont relativement simples ;
- le domaine ne nécessite pas spécifiquement Python ;
- une architecture monolithique réduit la complexité.

### FastAPI peut être introduit lorsque

- Python apporte une valeur fonctionnelle ;
- IA/ML ou data processing sont centraux ;
- l'API devient un service indépendant ;
- plusieurs clients doivent consommer le backend ;
- des workers Python spécialisés sont nécessaires.

### Rule

Ne pas séparer frontend/backend uniquement pour des raisons de mode architectural.

---

## 5. Decision scoring — usage interne

Le score n'est pas une note de qualité.

Il sert uniquement à comparer des options pour un **projet donné**.

| Criterion | Weight | Option A | Option B |
|---|---:|---:|---:|
| Functional fit |  |  |  |
| Runtime constraints |  |  |  |
| Data requirements |  |  |  |
| Team expertise |  |  |  |
| Delivery speed |  |  |  |
| Maintainability |  |  |  |
| Security |  |  |  |
| Operational complexity |  |  |  |
| Migration cost |  |  |  |

Si deux options restent proches, la Factory doit conserver les deux comme options valides et demander une décision humaine lorsque l'impact est important.

---

## 6. Required decision record

Pour tout choix architectural significatif :

- Problem
- Context
- Constraints
- Options
- Decision
- Why
- Consequences
- Migration / rollback
- Owner
- Date

---

## 7. Anti-patterns

La Factory doit détecter :

- ajouter FastAPI sans besoin ;
- ajouter microservices sans besoin ;
- utiliser Prisma et Drizzle pour le même schéma sans raison ;
- introduire plusieurs UI libraries ;
- choisir une technologie uniquement parce qu'elle est populaire ;
- choisir un ORM avant de comprendre le modèle de données ;
- commencer par le schéma physique avant le domaine ;
- transformer un prototype simple en architecture distribuée.

---

## 8. Human decision gate

L'agent peut :

- analyser ;
- comparer ;
- proposer ;
- documenter ;
- préparer l'ADR.

L'agent ne doit pas décider seul lorsqu'un choix :

- augmente fortement le coût opérationnel ;
- implique une migration importante ;
- touche aux données existantes ;
- introduit une nouvelle infrastructure majeure ;
- change le backend principal ;
- augmente fortement le blast radius.

Dans ces cas :

```text
Agent Analysis
      ↓
Options
      ↓
Impact
      ↓
Human Decision
      ↓
Implementation
```

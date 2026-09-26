# Eurin AI Factory — Skills

Les Skills sont des compétences spécialisées que les agents chargent lorsqu'une tâche l'exige.

Un Skill n'est pas un agent.

- **Agent = responsabilité et décision dans le workflow**
- **Skill = connaissance et méthode spécialisée**
- **Rule = contrainte obligatoire**
- **Template = structure d'un livrable**
- **Memory = connaissance issue de l'expérience**

## Skills V1

| Skill | Domaine | Agents principaux |
|---|---|---|
| Next.js | Frontend / application web | Architect, Developer, QA |
| PostgreSQL | Données / persistance | Architect, Developer, QA |
| ORM | Couche d'accès aux données : Prisma / Drizzle | Architect, Developer, QA |
| Security | Sécurité applicative | Architect, Developer, QA |
| UI | Interface / expérience : Tailwind + shadcn/ui | Product, Architect, Developer, QA |
| Testing | Validation automatisée | Developer, QA |
| Deployment | Build / delivery / infrastructure | Architect, Developer, QA |

## Cycle d'utilisation

```text
Task
 ↓
Identify required Skills
 ↓
Load Skill
 ↓
Apply Skill methodology
 ↓
Validate
 ↓
Handoff
```

## Règle

Un agent ne charge pas tous les Skills par défaut.

Il charge uniquement les compétences nécessaires à la tâche.

## Priorité

```text
MASTER_RULES
    ↓
Agent Contract
    ↓
Project Context
    ↓
Relevant Skill
    ↓
Implementation
```

Les Rules ont priorité sur les recommandations d'un Skill.

## Sélection de stack

La Factory ne considère pas Prisma ou Drizzle comme un choix universel.

Le projet détermine le choix à partir de :

- type de produit ;
- modèle de données ;
- besoin de contrôle SQL ;
- complexité des relations ;
- environnement d'exécution ;
- contraintes serverless/edge ;
- conventions de l'équipe ;
- maturité et maintenabilité attendues ;
- coût de migration ;
- compétences déjà disponibles.

Le choix doit être explicite dans le contexte technique du projet.


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
| Security | Sécurité applicative | Architect, Developer, QA |
| UI | Interface / expérience | Product, Architect, Developer, QA |
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

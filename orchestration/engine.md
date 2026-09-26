# Orchestration Engine — V1

Le moteur d'orchestration est la machine d'état qui exécute les workflows de la Factory.

## Responsabilités

- créer une execution de workflow ;
- charger le contexte minimal ;
- sélectionner les étapes applicables ;
- invoquer l'agent autorisé ;
- valider le handoff ;
- appliquer les Decision Gates ;
- gérer les blocages et escalades ;
- attendre une approbation humaine lorsque nécessaire ;
- clôturer l'exécution ;
- produire les événements nécessaires à la mémoire et aux métriques.

## Machine d'état

```text
CREATED
   ↓
INTAKE
   ↓
CONTEXT_READY
   ↓
GATE_PENDING
   ├── BLOCKED ──────────────┐
   ├── ESCALATED ────────────┤
   └── APPROVED               │
          ↓                   │
       STEP_READY             │
          ↓                   │
      AGENT_RUNNING           │
       ├── FAILED ────────────┤
       ├── BLOCKED ───────────┤
       └── COMPLETED          │
              ↓               │
        HANDOFF_VALIDATION    │
          ├── REJECTED ──────┘
          └── ACCEPTED
                ↓
          NEXT STEP / GATE
                ↓
             DELIVERY
                ↓
          MEMORY REVIEW
                ↓
            COMPLETED
```

## Principes d'exécution

### 1. Déterminisme contrôlé

Pour un même contexte et les mêmes décisions approuvées, le moteur doit produire une séquence explicable. Les décisions probabilistes d'un agent ne deviennent pas automatiquement des décisions de workflow.

### 2. Idempotence

Une étape déjà validée ne doit pas être exécutée une seconde fois sans raison explicite.

### 3. Reprise

Une interruption doit permettre de reprendre depuis le dernier état durable connu.

### 4. Escalade

Le moteur escalade lorsqu'une décision dépasse l'autorité de l'agent, lorsque le risque est critique ou lorsqu'une information indispensable manque.

### 5. Auditabilité

Chaque transition doit pouvoir être reliée à : workflow, étape, agent, entrée, sortie, validation et décision associée.

## Autorité

```text
Agent → propose / exécute dans son périmètre
Workflow → ordonne
Gate → autorise le passage
Human → tranche les décisions réservées
Factory → enregistre et apprend
```

L'orchestrateur ne doit pas devenir une nouvelle couche métier cachée.

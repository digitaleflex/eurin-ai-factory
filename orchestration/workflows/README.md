# Workflows

Un workflow définit une séquence contrôlée de responsabilités.

Un workflow n'est pas un script aveugle : chaque étape peut produire PASS, FAIL, PARTIAL ou BLOCKED, et certains résultats déclenchent une escalade.

## Workflow de référence — Feature Delivery
```text
Product → Decision Gate → Architect
                     ↓
              UI / Data / Security
                     ↓
             Human Approval ?
                     ↓
                 Developer
                     ↓
                    QA
                     ↓
                Deployment
                     ↓
               Memory Capture
```

| Étape | Agent | Entrée principale | Sortie |
|---|---|---|---|
| 1 | Product | idée / problème | scope + acceptance criteria |
| 2 | Architect | produit validé | architecture + ADR si nécessaire |
| 3 | UI | besoins UX | UI spec / changements UI |
| 4 | Data | modèle métier | data model / migration plan |
| 5 | Security | surface de risque | threat model / controls |
| 6 | Developer | artefacts approuvés | implementation |
| 7 | QA | implementation | QA report |
| 8 | Deployment | release candidate | delivery report |
| 9 | Factory | résultats | memory / metrics |

Les étapes UI, Data et Security sont conditionnelles.

## Conditions d'arrêt
- contexte indispensable absent ;
- contradiction dans la Source of Truth ;
- sécurité critique non traitée ;
- validation humaine requise mais absente ;
- migration destructive non approuvée ;
- tests critiques échoués ;
- rollback impossible pour une opération irréversible.

> Un workflow doit être assez déterministe pour être contrôlable, mais assez flexible pour éviter d'exécuter des agents inutiles.
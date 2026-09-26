# Modélisation des données

La Factory utilise une progression en quatre niveaux.

## Niveau 1 — Conceptuel

Question :

> Quelles sont les grandes choses métier dont le système doit se souvenir ?

Exemple : ` User@@, ` Project@@, ` Task@@, ` Decision@@.

À ce stade, éviter les détails SQL.

## Niveau 2 — Logique

Question :

> Comment ces concepts sont-ils structurés et reliés ?

Définir :

- attributs ;
- identifiants ;
- cardinalités ;
- relations ;
- contraintes métier ;
- normalisation pertinente.

## Niveau 3 — Physique

Question :

> Comment cela sera-t-il réellement stocké ?

Définir :

- tables ;
- colonnes ;
- types ;
- PK / FK ;
- indexes ;
- unique constraints ;
- timestamps ;
- stratégie de migration ;
- règles de rétention.

## Niveau 4 — Exploitation

Question :

> Comment les données vont-elles vivre dans le temps ?

Documenter :

- création ;
- lecture ;
- modification ;
- suppression ;
- audit ;
- sauvegarde ;
- restauration ;
- rétention ;
- confidentialité ;
- migration ;
- observabilité.

## Pipeline

```
text
Conceptuel
    ↓
Logique
    ↓
Physique
    ↓
Exploitation
    ↓
Validation
```

## Principe

Ne pas commencer par les tables.

Commencer par le domaine et les invariants métier, puis descendre progressivement vers PostgreSQL ou une autre technologie.

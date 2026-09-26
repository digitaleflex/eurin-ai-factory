# Data Flow Modeling

Le Data Flow Model décrit le déplacement de l'information.

## Questions

- Qui produit la donnée ?
- Où est-elle transformée ?
- Où est-elle stockée ?
- Qui la consomme ?
- Quels systèmes externes interviennent ?
- Où se trouvent les frontières de confiance ?

## Modèle générique

```
flowchart LR
    SOURCE[Source] --> VALIDATE[Validation]
    VALIDATE --> TRANSFORM[Transformation]
    TRANSFORM --> STORE[(Storage)]
    STORE --> API[API / Service]
    API --> CONSUMER[Consumer]
    API --> EXT[External System]
```

## Sécurité

Pour les données sensibles, identifier explicitement :

- frontière de confiance ;
- chiffrement ;
- authentification ;
- autorisation ;
- journalisation ;
- rétention ;
- suppression.

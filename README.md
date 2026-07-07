# Ai For Alpha - Formation LCB-FT

Prototype de site de formation/QCM basé sur la procédure LCB-FT Ai For Alpha 2026.

La version GitHub Pages sert les fichiers statiques. Le suivi centralisé des connexions/scores nécessite le serveur local `server.js` ou un backend de production.

## Lancer

```powershell
node .\server.js
```

Puis ouvrir `http://localhost:4177`.

## Logins autorisés

- eric.benhamou@aiforalpha.com
- beatrice.guez@aiforalpha.com
- jean-jacques.ohana@aiforalpha.com
- ethan.setrouk@aiforalpha.com
- chamyl.saadi@aiforalpha.com
- thomas.jacquot@aiforalpha.com

Le prototype accepte l'email sans mot de passe. En production, remplacer ce mécanisme par Microsoft Entra ID / SSO.

## Suivi

Le serveur local consigne les connexions, progressions, scores et tentatives dans `data/training-records.json`.

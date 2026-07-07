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

## Suivi et sauvegarde longue durée

Le navigateur conserve un registre local durable par email avec une clé stable, sans numéro de version dans le nom. Les anciennes clés `afa-lcbft-training-v*` sont migrées automatiquement, ce qui évite de perdre la progression lors d'une nouvelle version du site.

Le registre local conserve les connexions, le temps actif total, le temps par module, les réponses, les bonnes réponses, les scores, les tentatives terminées et le dernier snapshot de progression.

Le serveur local consigne aussi ces données dans `data/training-records.json` avec écriture atomique, et écrit un journal append-only dans `data/training-events.jsonl`.

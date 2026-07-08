# Ai For Alpha - Formation LCB-FT

Prototype de site de formation/QCM basé sur la procédure LCB-FT Ai For Alpha 2026.

La version GitHub Pages sert les fichiers statiques. Le suivi centralisé des connexions/scores nécessite une base distante configurée dans `db-config.js`.

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

## Base distante Supabase/Postgres

1. Créer un projet Supabase.
2. Exécuter `supabase-schema.sql` dans l'éditeur SQL Supabase.
3. Renseigner `db-config.js` :

```js
window.AFA_DB = {
  provider: "supabase",
  supabaseUrl: "https://xxxx.supabase.co",
  supabaseAnonKey: "ey..."
};
```

Quand ces deux valeurs sont présentes, GitHub Pages écrit les connexions, scores, modules lus, tentatives et événements dans Postgres. Si elles sont absentes, l'interface affiche `Base distante : non configurée` et le suivi central est inactif.

## Suivi et sauvegarde longue durée

Le navigateur conserve un registre local durable par email avec une clé stable, sans numéro de version dans le nom. Les anciennes clés `afa-lcbft-training-v*` sont migrées automatiquement, ce qui évite de perdre la progression lors d'une nouvelle version du site.

Le registre local conserve les connexions, le temps actif total, le temps par module, les réponses, les bonnes réponses, les scores, les tentatives terminées et le dernier snapshot de progression.

Le serveur local consigne aussi ces données dans `data/training-records.json` avec écriture atomique, et écrit un journal append-only dans `data/training-events.jsonl`. Ce serveur local reste utile en développement, mais il ne fonctionne pas sur GitHub Pages.

Dans les exports JSON, `result.passed` signifie que le QCM est réussi avec au moins 80 %. `result.trainingPassed` signifie que le QCM est réussi et que tous les modules ont été marqués comme lus. Les choix de réponses sont mélangés à chaque nouvelle tentative, avec les bonnes réponses réparties entre A, B, C et D.

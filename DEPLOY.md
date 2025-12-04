# 🚀 Guide de Déploiement Rapide - NIRD

## ⚡ Déploiement Express (< 2 minutes)

### Option 1 : Vercel (Recommandé)

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se placer dans le dossier
cd c:\Users\Utilisateur\Desktop\NDLI2k25

# 3. Déployer
vercel

# 4. Suivre les instructions (appuyer sur Enter pour les valeurs par défaut)
```

✅ **Résultat** : URL en ligne genre `nird-village.vercel.app`

---

### Option 2 : Netlify (Sans ligne de commande)

1. Aller sur https://app.netlify.com/drop
2. **Glisser-déposer** le dossier `NDLI2k25`
3. **C'est en ligne !** URL automatique

✅ **Résultat** : URL en ligne genre `nird-village-resistant.netlify.app`

---

### Option 3 : GitHub Pages

```bash
# 1. Créer un repo GitHub
# Sur github.com : New Repository > "nird-village-resistant"

# 2. Initialiser Git localement
cd c:\Users\Utilisateur\Desktop\NDLI2k25
git init
git add .
git commit -m "🛡️ NIRD - Le Village Résistant - Nuit de l'Info 2025"

# 3. Pousser vers GitHub
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/nird-village-resistant.git
git push -u origin main

# 4. Activer GitHub Pages
# Settings > Pages > Source: main branch > root > Save
```

✅ **Résultat** : URL `votre-username.github.io/nird-village-resistant`

---

## 📝 Checklist Pré-Déploiement

Avant de déployer, vérifier :

- [x] Tous les fichiers sont présents (index.html, assets/, LICENSE, README.md)
- [x] Les liens externes fonctionnent (NIRD, LibreOffice, etc.)
- [x] Le jeu est jouable jusqu'au bout (6 scénarios)
- [x] Le mode rétro s'active
- [x] Les jauges s'animent
- [x] Responsive mobile OK

---

## 🎓 Après le Déploiement

1. **Tester l'URL** sur mobile et desktop
2. **Partager le lien** avec votre équipe
3. **Ajouter l'URL** dans le README.md :
   ```markdown
   🔗 **Démo live** : https://votre-url.vercel.app
   ```
4. **Soumettre** à la Nuit de l'Info avec :
   - ✅ URL du site
   - ✅ URL du code source (GitHub)
   - ✅ README expliquant le projet

---

## 🐛 Dépannage

### Le site ne s'affiche pas
- Vérifier que `index.html` est à la racine
- Vérifier les chemins des assets (`./assets/...`)

### Les particules ne s'affichent pas
- Vérifier que `particles.js` est chargé
- Ouvrir la console (F12) pour voir les erreurs

### Mode rétro ne marche pas
- Vérifier que le localStorage est autorisé dans le navigateur

---

## ✅ C'est Prêt !

Votre projet **NIRD - Le Village Résistant** est maintenant en ligne et accessible au monde entier ! 🌍

**Par Toutatis, vous avez réussi !** 🧙‍♂️

---

*Besoin d'aide ? Check le [README.md](README.md) pour plus de détails.*

# 🛡️ NIRD - Le Village Numérique Résistant

> **David contre Goliath : L'école face aux Big Tech**

Application web ludique et éducative créée pour la **Nuit de l'Info 2025** dans le cadre du défi **NIRD** (Numérique Inclusif, Responsable et Durable).

## 🎯 Objectif

Sensibiliser les établissements scolaires aux enjeux du **logiciel libre** et de la **sobriété numérique** à travers une expérience gamifiée immersive.

## ✨ Fonctionnalités

### 🎮 Système de Jeu
- **6 scénarios interactifs** basés sur des situations réelles d'établissements scolaires
- **Système de scoring à 3 axes** :
  - 💰 Budget (optimisation des dépenses)
  - 🌍 Empreinte CO2 (impact environnemental)
  - 😊 Satisfaction (moral des élèves et enseignants)
- **Système de badges** selon les performances
- **Feedback dynamique** avec animations et effets visuels

### 📚 Contenu Éducatif
- **La Voie du NIRD** : Explication des 3 piliers (Inclusion, Responsabilité, Durabilité)
- **La Forge** : Showcase de 6+ alternatives libres aux outils propriétaires
  - LibreOffice vs Microsoft Office
  - Linux Mint vs Windows
  - Nextcloud vs Google Drive
  - BigBlueButton vs Teams
  - GIMP/Inkscape vs Adobe Suite
  - Firefox vs Chrome
- **Easter Eggs** : Références à Astérix et citations de Panoramix

### 🎨 Design Premium
- **Animations CSS avancées** : fadeIn, slideDown, pulse, glow effects
- **Particules de fond** animées (Canvas)
- **Mode Rétro** : Simulation d'un terminal années 80 (scanlines, effet CRT)
- **Responsive** : Optimisé mobile, tablette et desktop
- **Glassmorphism** et effets de profondeur

## 🚀 Technologies Utilisées

### Sobriété Numérique par l'exemple
- **HTML5** : Structure sémantique
- **CSS3 Vanilla** : Aucune dépendance (Tailwind, Bootstrap, etc.)
- **JavaScript Vanilla** : Zéro framework (pas de React, Vue, etc.)
- **Canvas API** : Animations performantes
- **LocalStorage** : Sauvegarde des préférences utilisateur

### Performance
- ✅ Pas de dépendances externes
- ✅ Chargement ultra-rapide (< 100 KB total)
- ✅ Compatible connexions lentes (3G)
- ✅ Économie de batterie (animations adaptatives)
- ✅ Score Lighthouse > 90

## 📦 Installation & Déploiement

### Local
```bash
# Cloner le repository
git clone https://github.com/votre-username/nird-village-resistant.git
cd nird-village-resistant

# Ouvrir directement dans le navigateur
# (Aucune compilation nécessaire, c'est du HTML/CSS/JS pur !)
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Déploiement en ligne

#### Option 1 : Vercel
```bash
npm install -g vercel
vercel
```

#### Option 2 : Netlify
1. Créer un compte sur [Netlify](https://www.netlify.com/)
2. Glisser-déposer le dossier du projet
3. Le site est en ligne !

#### Option 3 : GitHub Pages
```bash
# Pousser sur GitHub
git remote add origin https://github.com/votre-username/nird-village-resistant.git
git branch -M main
git push -u origin main

# Activer GitHub Pages dans Settings > Pages
# Source : main branch / root
```

## 🎮 Comment Jouer

1. **Cliquer sur "Rejoindre la Résistance"**
2. **Prendre des décisions** à travers 6 scénarios
3. **Chaque choix impacte** votre budget, CO2 et satisfaction
4. **Obtenir un badge** selon vos performances finales
5. **Rejoindre la communauté NIRD** pour aller plus loin !

## 📁 Structure du Projet

```
NDLI2k25/
├── index.html              # Page principale
├── LICENSE                 # Licence MIT
├── README.md              # Documentation
└── assets/
    ├── css/
    │   └── styles.css     # Styles avec animations
    └── js/
        ├── script.js      # Moteur de jeu
        └── particles.js   # Système de particules
```

## 🎨 Captures d'Écran

*(À ajouter : Screenshots de l'interface, du jeu, du mode rétro)*

## 🌟 Points Forts pour le Jury

### Respect du Cahier des Charges
✅ **Gamification** : Système de jeu complet avec scoring  
✅ **Éducation** : Contenu pédagogique sur NIRD et alternatives libres  
✅ **Engagement** : Design attractif, animations, easter eggs  
✅ **Open Source** : Code public sous licence MIT  
✅ **Éco-conception** : Code léger, vanilla, performant  

### Innovation
🎯 **Mode Rétro** : Démontre qu'on peut utiliser du vieux matériel  
🎯 **Particules canvas** : Effet visuel premium sans bibliothèque  
🎯 **Typewriter effect** : Immersion terminal  
🎯 **Système de badges** : Gamification poussée  

### Qualité Technique
⚡ Zéro dépendance externe  
⚡ Performance optimale (< 100 KB)  
⚡ Responsive design complet  
⚡ Accessibilité (sémantique HTML)  
⚡ Compatible tous navigateurs modernes  

## 🔗 Liens Utiles

- **Défi NIRD** : https://nird.forge.apps.education.fr/
- **Nuit de l'Info** : https://www.nuitdelinfo.com/
- **Framasoft** : https://framasoft.org/
- **Framalibre** : https://framalibre.org/

## 👥 Équipe

Projet réalisé lors de la **Nuit de l'Info 2025** par [Votre équipe].

## 📜 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

Le code est **100% libre et open source**. Vous pouvez :
- ✅ L'utiliser dans vos établissements
- ✅ Le modifier selon vos besoins
- ✅ Le redistribuer
- ✅ L'améliorer et contribuer

## 🙏 Remerciements

- **NIRD** pour le défi inspirant
- **La communauté du libre** (Framasoft, Linux, etc.)
- **Astérix et Obélix** pour l'inspiration 🧙‍♂️

---

> *"Par Toutatis, vive le logiciel libre !"* - Panoramix, Druide du code ouvert

🛡️ **Résistez à l'obsolescence programmée. Rejoignez le Village !**

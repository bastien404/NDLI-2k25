# 🌱 NDLI-2k25 - Nuit de l'Info 2025

> **NIRD: The Renaissance** - Une expérience web immersive pour la libération numérique

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?logo=greensock)](https://greensock.com/gsap/)

## 📖 À Propos

Projet créé dans le cadre de la **Nuit de l'Info 2025** pour le défi **NIRD** (Numérique Inclusif, Responsable et Durable). Ce repository contient une expérience web narrative et interactive qui sensibilise à l'obsolescence programmée et promeut le logiciel libre dans l'éducation.

**🎯 Mission** : Transformer la perception du numérique éducatif en montrant qu'un ordinateur "obsolète" peut avoir une seconde vie grâce à Linux et aux logiciels libres.

---

## ✨ Projets du Repository

### 🎮 NIRD Renaissance

**Site web narratif immersif** en 4 actes qui raconte l'histoire de la libération numérique.

#### Les 4 Actes

| Acte | Titre | Description |
|------|-------|-------------|
| **0** | Le Loader | Écran BIOS rétro avec loader qui "bug" à 99% |
| **1** | L'Obsolescence | Dystopie cyberpunk avec montagnes de PC obsolètes |
| **2** | La Résistance | Transition vers l'utopie, présentation de NIRD |
| **3** | Le Simulateur | Mini-jeu drag & drop pour réparer des PC |
| **4** | L'Appel | Call-to-action immersif pour rejoindre NIRD |

#### 🎯 Fonctionnalités Clés

**Animations Avancées**
- ✅ Parallaxe multi-couches (scroll + souris)
- ✅ Scrollytelling avec GSAP ScrollTrigger
- ✅ Typography cinétique avec défilement horizontal
- ✅ Text reveal progressif avec stagger
- ✅ Custom cursor réactif

**Interactivité**
- ✅ Mini-jeu drag & drop (réparation de PC)
- ✅ Boss Battle (Easter egg avec p5.js)
- ✅ Confetti particles
- ✅ Compteurs animés (CO₂, PC réparés)
- ✅ Smooth scroll (Lenis)

**Performance & Éco-conception**
- ✅ Dark mode par défaut (économie d'énergie)
- ✅ Animations code-based (pas de vidéo)
- ✅ Images WebP optimisées
- ✅ Support `prefers-reduced-motion`
- ✅ Code splitting automatique

### 🎵 Boss Battle

**Mini-jeu rétro** style shoot'em up développé avec p5.js, intégré comme Easter egg dans le site principal.

- Combat contre un boss qui tire des projectiles
- Contrôles: Flèches (déplacement) + Espace (tir)
- Effets CRT et scanlines pour un rendu rétro authentique
- Système de score et écrans victoire/défaite

---

## 🚀 Installation & Démarrage

### Prérequis

- Node.js 18+ 
- npm ou pnpm

### Installation

```bash
# Cloner le repository
git clone https://github.com/bastien404/NDLI-2k25.git
cd NDLI-2k25/nird-renaissance

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000` (ou le port disponible suivant).

### Build de Production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🛠️ Stack Technique

### Frontend
- **Build Tool**: Vite.js 5.x
- **Animations**: GSAP 3.x (avec ScrollTrigger)
- **Smooth Scroll**: Lenis (Studio Freight)
- **Styles**: SASS/SCSS + CSS3
- **JavaScript**: ES6+ Modules (Vanilla)
- **Canvas**: p5.js 1.9.0 (Boss Battle)

### Éco-conception
- ❌ **Pas de framework** React/Vue/Angular
- ❌ **Pas de bibliothèques CSS** Tailwind/Bootstrap
- ❌ **Pas de vidéos** (animations code-based)
- ✅ **Code splitting** automatique
- ✅ **Images optimisées** (WebP)
- ✅ **Lazy loading**

---

## 📁 Structure du Projet

```
NDLI-2k25/
├── nird-renaissance/          # Projet principal
│   ├── index.html             # Page HTML
│   ├── vite.config.js         # Config Vite
│   ├── package.json           # Dépendances
│   ├── src/
│   │   ├── main.js            # Point d'entrée
│   │   ├── smooth-scroll.js   # Lenis integration
│   │   ├── styles/
│   │   │   ├── main.scss      # Styles principaux
│   │   │   ├── _variables.scss# Variables design
│   │   │   ├── _act2.scss     # Styles Act 2
│   │   │   ├── _snake.scss    # Styles jeu Snake
│   │   │   └── _boss-battle.scss # Styles Boss Battle
│   │   ├── animations/
│   │   │   ├── loader.js      # Loader BIOS
│   │   │   ├── parallax.js    # Effets parallaxe
│   │   │   ├── scrollytelling.js # Scroll animations
│   │   │   └── cursor.js      # Custom cursor
│   │   └── components/
│   │       ├── simulator.js   # Mini-jeu PC repair
│   │       ├── snake.js       # Jeu Snake (Easter egg)
│   │       └── boss-battle.js # Boss Battle (Easter egg)
│   └── public/
│       └── assets/            # Images, icons    
├── Chatbruti/                 # Chatbot expérimental
├── README.md                  # Ce fichier
├── LICENSE                    # Licence MIT
├── DEPLOY.md                  # Guide de déploiement
└── STATS.md                   # Statistiques du projet
```

---

## 🎮 Comment Utiliser

### Navigation du Site

1. **Loader** : Attendez que le chargement (fictif) atteigne 100%
2. **Act 1** : Scrollez pour découvrir la dystopie de l'obsolescence
3. **Act 2** : Découvrez les solutions NIRD et les outils libres
4. **Act 3** : Jouez au simulateur en glissant la clé USB Linux sur les PC
5. **Act 4** : Rejoignez la communauté NIRD via le CTA

### Easter Eggs

- **🐍 Snake** : Tapez "SNAKE" n'importe où sur le site
- **🎮 Boss Battle** : Cliquez sur le bouton "Boss Battle" dans le footer

---

## 📊 Performance & Métriques

### Objectifs Lighthouse

| Métrique | Objectif | Statut |
|----------|----------|--------|
| Performance | > 90 | ✅ |
| Accessibilité | > 90 | ✅ |
| Best Practices | > 90 | ✅ |
| SEO | > 90 | ✅ |

### Optimisations

- **Page Weight**: < 2MB (sans cache)
- **Load Time (3G)**: < 3s
- **FPS (Scroll)**: 60fps constant
- **Time to Interactive**: < 2s

---

## 🌍 Compatibilité

### Navigateurs Supportés

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ❌ Internet Explorer (non supporté)

### Appareils

- ✅ Desktop (1920x1080 à 4K)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)
- ✅ Mode paysage/portrait

---

## 🎨 Design System

### Couleurs Principales

```scss
// Dystopie (Act 1)
$dystopia-primary: #ff0055;    // Rouge néon
$dystopia-bg: #0a0a0a;         // Noir profond
$dystopia-error: #ff0000;      // Rouge erreur

// Utopie (Act 2-4)
$utopia-primary: #4CAF50;      // Vert nature
$utopia-bg: #f5f5f5;           // Blanc cassé
$utopia-text: #1a1a1a;         // Texte sombre
```

### Typographie

- **Titres**: Inter (Google Fonts)
- **Code**: JetBrains Mono (Google Fonts)
- **Tailles**: Scale fluide de 14px à 72px

---

## 🤝 Contribution

Ce projet est open source ! Les contributions sont les bienvenues.

### Comment Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License - Copyright (c) 2025 NIRD Team

✅ Usage commercial autorisé
✅ Modification autorisée
✅ Distribution autorisée
✅ Usage privé autorisé
```

---

## 🔗 Liens Utiles

- **NIRD Official**: [nird.forge.apps.education.fr](https://nird.forge.apps.education.fr)
- **Nuit de l'Info**: [nuitdelinfo.com](https://www.nuitdelinfo.com/)
- **Framasoft**: [framasoft.org](https://framasoft.org/)
- **Linux Mint LMDE**: [linuxmint.com](https://www.linuxmint.com/)

---

## 👥 Équipe

Projet réalisé lors de la **Nuit de l'Info 2025**.

**Technologies choisies** pour démontrer qu'on peut créer une expérience premium tout en restant éco-responsable : pas de frameworks lourds, animations performantes, code optimisé.

---

## 🙏 Remerciements

- **NIRD** pour le défi inspirant autour du logiciel libre
- **La communauté Open Source** (Framasoft, Linux, Mozilla...)
- **GSAP & Lenis** pour les outils d'animation exceptionnels
- **Vercel** pour l'hébergement gratuit

---

<div align="center">

**🌱 Créé avec 💚 pour l'éducation libre**

*"Résistez à l'obsolescence programmée. Libérez votre numérique."*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bastien404/NDLI-2k25)

</div>

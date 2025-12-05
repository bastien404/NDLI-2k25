# NIRD: The Renaissance 🌱

> Une expérience web immersive qui raconte l'histoire de la libération numérique à travers un voyage en 4 actes : de la dystopie cyberpunk du logiciel propriétaire à l'utopie solarpunk du Libre.

## ✨ Concept

**NIRD: The Renaissance** est un site web narratif interactif où l'utilisateur incarne "l'Administrateur Système" qui doit libérer son établissement de l'obsolescence programmée.

### Les 4 Actes

1. **Acte 0 - Le Loader** : Écran de démarrage BIOS rétro avec un compteur qui "bug" à 99%
2. **Acte 1 - L'Obsolescence** : Dystopie cyberpunk avec parallaxe multi-couches et déchets électroniques
3. **Acte 2 - La Résistance** : Transition vers l'utopie avec typography cinétique et cartes flottantes
4. **Acte 3 - Le Simulateur** : Mini-jeu interactif drag & drop pour réparer des PC
5. **Acte 4 - L'Appel** : Footer immersif avec call-to-action et hover reveal

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🛠️ Stack Technique

- **Build Tool** : Vite.js
- **Animations** : GSAP (avec ScrollTrigger)
- **Smooth Scroll** : Lenis (Studio Freight)
- **Styles** : SASS/SCSS
- **JavaScript** : ES6+ Modules

## 🎨 Caractéristiques

### Animations Avancées
- ✅ Parallaxe multi-couches (scroll & souris)
- ✅ Scrollytelling avec transitions fluides
- ✅ Typography cinétique avec horizontal scroll
- ✅ Text reveal avec stagger
- ✅ Custom cursor avec états dynamiques
- ✅ Magnetic hover effects

### Interactivité
- ✅ Drag & drop simulator
- ✅ Confetti particles
- ✅ Compteurs animés (CO₂, PC réparés)
- ✅ Smooth scroll avec Lenis

### Performance & Éco-conception
- ✅ Dark mode par défaut (économie d'énergie)
- ✅ Pas de vidéo (code-based animations only)
- ✅ Images WebP optimisées
- ✅ Target Lighthouse score > 90
- ✅ Support pour `prefers-reduced-motion`
- ✅ Code splitting automatique

## 📁 Structure du Projet

```
nird-renaissance/
├── index.html                    # HTML principal
├── vite.config.js               # Configuration Vite
├── package.json                  # Dépendances
├── src/
│   ├── main.js                  # Point d'entrée JS
│   ├── smooth-scroll.js         # Lenis smooth scroll
│   ├── styles/
│   │   ├── _variables.scss      # Variables (couleurs, typographie)
│   │   ├── _base.scss           # Reset & base styles
│   │   └── main.scss            # Styles principaux
│   ├── animations/
│   │   ├── loader.js            # Acte 0: BIOS loader
│   │   ├── parallax.js          # Acte 1: Parallaxe
│   │   ├── scrollytelling.js    # Transitions & reveals
│   │   └── cursor.js            # Custom cursor
│   └── components/
│       └── simulator.js         # Acte 3: Drag & drop game
└── public/
    └── assets/
        ├── icons/               # SVG icons
        └── images/              # Optimized images
```

## 🎯 Objectifs du Projet

- **Éducation** : Sensibiliser à l'obsolescence programmée et au logiciel libre
- **Impact** : Montrer qu'un PC "obsolète" peut avoir une seconde vie avec Linux
- **Expérience** : Créer une expérience mémorable qui inspire à l'action
- **Performance** : Prouver qu'un site riche peut être éco-conçu

## 📊 Métriques Cibles

| Métrique | Objectif |
|----------|----------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Page Weight | < 2MB |
| Load Time (3G) | < 3s |
| FPS (Scroll) | 60fps |

## 🌍 Compatibilité Navigateur

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ❌ IE11 (non supporté)

## 🤝 Contribution

Ce projet fait partie de l'initiative **NIRD** (Numérique Inclusif, Responsable et Durable).

**Liens utiles :**
- [La Forge NIRD](https://nird.forge.apps.education.fr)
- [Documentation](https://nird.forge.apps.education.fr)

## 📝 Licence

MIT © NIRD Team

---

**Créé avec 💚 pour l'éducation libre**

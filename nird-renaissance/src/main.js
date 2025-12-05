/**
 * NIRD Renaissance - Main Entry Point
 * Initializes all animations and interactions
 */

import './styles/main.scss';
import './styles/chatbot.scss';

import { initLoader } from './animations/loader.js';
import { initParallax } from './animations/parallax.js';
import { initScrollytelling } from './animations/scrollytelling.js';
import { initCursor } from './animations/cursor.js';
import { initSimulator } from './components/simulator.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initSnake } from './components/snake.js';
import { initBossBattle } from './components/boss-battle.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize loader first
  initLoader();
  
  // Initialize smooth scroll
  const lenis = initSmoothScroll();
  
  // Initialize custom cursor
  initCursor();
  
  // Initialize parallax effects (Act 1)
  initParallax();
  
  // Initialize scrollytelling animations
  initScrollytelling();
  
  // Initialize simulator game (Act 3)
  initSimulator();
  
  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Disable smooth scroll and heavy animations
    if (lenis) {
      lenis.destroy();
    }
    document.body.classList.remove('lenis');
    console.log('Reduced motion mode: Heavy animations disabled');
  }
  
  // Initialize hidden Snake game 🐍
  initSnake();
  
  // Initialize Boss Battle game 🎮
  initBossBattle();
  
  // Log success
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   NIRD: The Renaissance               ║
  ║   Numérique Inclusif, Responsable     ║
  ║   et Durable                          ║
  ║                                       ║
  ║   🌱 Eco-designed                     ║
  ║   🎨 Built with GSAP & Lenis          ║
  ║   💚 Open Source                      ║
  ╚═══════════════════════════════════════╝
  `);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    window.location.reload();
  }, 500);
});

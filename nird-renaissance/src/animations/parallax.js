/**
 * Parallax Effects for Act 1 (Dystopia)
 * Multi-layer parallax on scroll and mouse movement
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initParallax() {
  const act1 = document.getElementById('act1-obsolescence');
  
  if (!act1) return;
  
  // Get all parallax layers
  const layers = act1.querySelectorAll('.parallax-layer');
  
  // Scroll-based parallax
  layers.forEach((layer) => {
    const speed = layer.dataset.speed || 1;
    const yPercent = (1 - parseFloat(speed)) * 100;
    
    gsap.to(layer, {
      yPercent: yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: act1,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
  
  // Mouse-based parallax
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  
  // Animate based on mouse position
  gsap.ticker.add(() => {
    layers.forEach((layer) => {
      const speed = layer.dataset.speed || 1;
      const multiplier = (parseFloat(speed) - 1) * 20;
      
      gsap.to(layer, {
        x: mouseX * multiplier,
        y: mouseY * multiplier,
        duration: 1,
        ease: 'power2.out'
      });
    });
  });
  
  // PC Mountains individual animations
  const pcMountains = act1.querySelectorAll('.pc-mountain');
  pcMountains.forEach((mountain, index) => {
    gsap.from(mountain, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: act1,
        start: 'top center',
        once: true
      }
    });
  });
  
  // Error popup animation
  const errorPopup = act1.querySelector('.error-popup');
  if (errorPopup) {
    gsap.from(errorPopup, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: errorPopup,
        start: 'top 80%',
        once: true
      }
    });
  }
  
  // Scroll resistance effect
  let scrollResistance = false;
  
  ScrollTrigger.create({
    trigger: act1,
    start: 'top top',
    end: 'bottom center',
    onEnter: () => { scrollResistance = true; },
    onLeave: () => { scrollResistance = false; },
    onEnterBack: () => { scrollResistance = true; },
    onLeaveBack: () => { scrollResistance = false; },
  });
}

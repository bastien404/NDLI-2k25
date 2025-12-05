/**
 * Scrollytelling Animations
 * Screen tear transition, text reveals, and kinetic typography
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollytelling() {
  
  // ======================================
  // Screen Tear Transition (Act 1 → Act 2)
  // ======================================
  
  const act1 = document.getElementById('act1-obsolescence');
  const screenTear = document.querySelector('.screen-tear');
  
  if (act1 && screenTear) {
    gsap.to(act1, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: screenTear,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      }
    });
  }
  
  // ======================================
  // Text Reveal Animations
  // ======================================
  
  const revealTexts = document.querySelectorAll('.reveal-text');
  
  revealTexts.forEach((text) => {
    const spans = text.querySelectorAll('span');
    
    if (spans.length > 0) {
      gsap.from(spans, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          once: true,
          markers: true
        }
      });
    } else {
      // Single block reveal
      gsap.from(text, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          once: true
        }
      });
    }
  });
  
  // ======================================
  // Kinetic Typography (Horizontal Scroll)
  // Animation d'entrée depuis l'extérieur de l'écran
  // ======================================
  
  const kineticWords = document.querySelectorAll('.kinetic-word');
  
  kineticWords.forEach((word, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const startPosition = direction * window.innerWidth; // Position de départ hors écran
    
    // Initial position - complètement hors écran
    gsap.set(word, {
      x: startPosition,
      opacity: 0,
      rotationY: direction * 45,
      scale: 0.8
    });
    
    // Animation timeline pour une entrée spectaculaire
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: word,
        start: 'top 85%',
        end: 'top 20%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    });

    // Phase 1: Entrée depuis l'extérieur
    tl.to(word, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power3.out'
    });
    
    // Phase 2: Continue à bouger légèrement pendant le scroll
    gsap.to(word, {
      x: direction * -100,
      scrollTrigger: {
        trigger: word,
        start: 'top 30%',
        end: 'bottom top',
        scrub: 2,
      }
    });

    // Animation de pulsation au hover
    const wordTitle = word.querySelector('h2');
    if (wordTitle) {
      wordTitle.addEventListener('mouseenter', () => {
        gsap.to(wordTitle, {
          scale: 1.1,
          textShadow: '0 6px 40px rgba(76, 175, 80, 0.6)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      wordTitle.addEventListener('mouseleave', () => {
        gsap.to(wordTitle, {
          scale: 1,
          textShadow: '0 4px 30px rgba(76, 175, 80, 0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });
  
  // ======================================
  // Mission Statement Reveal
  // Animation d'entrée en cascade depuis le bas
  // ======================================
  
  const mission = document.querySelector('.mission');
  if (mission) {
    const missionSpans = mission.querySelectorAll('span');
    
    // Position initiale: en dehors de l'écran par le bas
    gsap.set(missionSpans, {
      y: 80,
      opacity: 0,
      rotationX: -20,
      scale: 0.95
    });
    
    gsap.to(missionSpans, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      scale: 1,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: mission,
        start: 'top 70%',
        once: true
      }
    });
  }
  
  // ======================================
  // Tool Cards Stagger Animation
  // Entrée depuis le bas avec rotation 3D
  // ======================================
  
  const toolCards = document.querySelectorAll('.tool-card');
  
  // Position initiale: en dehors de l'écran par le bas
  gsap.set(toolCards, {
    y: 120,
    opacity: 0,
    rotationY: -15,
    scale: 0.9
  });
  
  gsap.to(toolCards, {
    y: 0,
    opacity: 1,
    rotationY: 0,
    scale: 1,
    stagger: {
      each: 0.15,
      from: 'start'
    },
    duration: 1,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: '.tool-cards',
      start: 'top 75%',
      once: true
    }
  });
  
  // ======================================
  // CTA Section (Footer)
  // ======================================
  
  const ctaTitle = document.querySelector('.cta-title');
  const ctaSubtitle = document.querySelector('.cta-subtitle');
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaTitle) {
    const ctaTitleSpans = ctaTitle.querySelectorAll('span');
    gsap.from(ctaTitleSpans, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: ctaTitle,
        start: 'top 80%',
        once: true
      }
    });
  }
  
  if (ctaSubtitle) {
    gsap.from(ctaSubtitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaSubtitle,
        start: 'top 80%',
        once: true
      }
    });
  }
  
  if (ctaButton) {
    gsap.from(ctaButton, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: ctaButton,
        start: 'top 85%',
        once: true
      }
    });
  }
}

/**
 * Custom Cursor System
 * Changes appearance based on hover targets (Big Tech vs NIRD)
 */

import gsap from 'gsap';

export function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorInner = document.querySelector('.cursor-inner');
  
  if (!cursor) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor follow
  gsap.ticker.add(() => {
    // Ease cursor position
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    gsap.set(cursor, {
      x: cursorX,
      y: cursorY,
    });
  });
  
  // Magnetic effect for interactive elements
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const dataType = el.dataset.type;
      
      if (dataType === 'nird') {
        cursor.classList.add('is-nird');
        cursor.classList.remove('is-big-tech');
      } else if (dataType === 'big-tech') {
        cursor.classList.add('is-big-tech');
        cursor.classList.remove('is-nird');
      }
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-nird', 'is-big-tech');
    });
    
    // Magnetic attraction
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
  
  // Hover reveal effect for CTA button
  const hoverRevealElements = document.querySelectorAll('.hover-reveal');
  
  hoverRevealElements.forEach((el) => {
    const bg = el.querySelector('.cta-button__bg');
    
    if (bg) {
      el.addEventListener('mouseenter', () => {
        gsap.to(bg, {
          scaleX: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(bg, {
          scaleX: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    }
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.3
    });
  });
  
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      opacity: 1,
      duration: 0.3
    });
  });
}

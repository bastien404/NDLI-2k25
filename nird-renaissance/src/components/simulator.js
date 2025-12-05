/**
 * Interactive Simulator Game
 * Drag & drop USB key onto broken PCs to fix them
 */

import gsap from 'gsap';

export function initSimulator() {
  const usbKey = document.getElementById('usb-key');
  const pcs = document.querySelectorAll('.pc.broken');
  const confettiContainer = document.querySelector('.confetti-container');
  
  let pcRepairedCount = 0;
  
  if (!usbKey || pcs.length === 0) return;
  
  // Stats elements
  const pcRepairedStat = document.getElementById('pc-repaired');
  const co2SavedStat = document.getElementById('co2-saved');
  const yearsSavedStat = document.getElementById('years-saved');
  
  // Make USB key draggable
  usbKey.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    
    gsap.to(usbKey, {
      scale: 0.8,
      opacity: 0.7,
      duration: 0.2
    });
  });
  
  usbKey.addEventListener('dragend', () => {
    gsap.to(usbKey, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  });
  
  // Setup drop zones on PCs
  pcs.forEach((pc) => {
    pc.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      pc.classList.add('drag-over');
    });
    
    pc.addEventListener('dragleave', () => {
      pc.classList.remove('drag-over');
    });
    
    pc.addEventListener('drop', (e) => {
      e.preventDefault();
      pc.classList.remove('drag-over');
      
      // Fix the PC!
      fixPC(pc);
    });
  });
  
  function fixPC(pc) {
    // Already fixed?
    if (pc.classList.contains('fixed')) return;
    
    // Update PC state
    pc.classList.remove('broken');
    pc.classList.add('fixed');
    
    // Update SVG to show fixed state
    const svg = pc.querySelector('svg');
    if (svg) {
      gsap.to(svg.querySelector('rect'), {
        stroke: '#4CAF50',
        duration: 0.3
      });
      
      const errorText = svg.querySelector('text');
      if (errorText) {
        errorText.textContent = 'LINUX';
        errorText.setAttribute('fill', '#4CAF50');
      }
      
      const errorCircle = svg.querySelector('circle');
      if (errorCircle) {
        errorCircle.setAttribute('fill', '#4CAF50');
      }
    }
    
    // Update label
    const label = pc.querySelector('.pc__label');
    if (label) {
      label.textContent = 'PC Linux Mint';
    }
    
    // Celebration animation
    gsap.fromTo(pc, 
      { scale: 1 },
      { 
        scale: 1.15,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }
    );
    
    // Spawn confetti
    createConfetti(pc);
    
    // Update stats
    pcRepairedCount++;
    updateStats();
  }
  
  function createConfetti(pc) {
    const rect = pc.getBoundingClientRect();
    const containerRect = confettiContainer.getBoundingClientRect();
    const colors = ['#4CAF50', '#FF9800', '#2196F3', '#8BC34A', '#FFC107'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
      confetti.style.top = (rect.top - containerRect.top + rect.height / 2) + 'px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 10 + 5) + 'px';
      confetti.style.height = confetti.style.width;
      
      confettiContainer.appendChild(confetti);
      
      // Random animation
      gsap.to(confetti, {
        x: (Math.random() - 0.5) * 300,
        y: Math.random() * 500 + 200,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: Math.random() * 2 + 1,
        ease: 'power2.out',
        onComplete: () => {
          confetti.remove();
        }
      });
    }
  }
  
  function updateStats() {
    // Each PC saves approximately 240kg CO2 (manufacturing a new PC)
    const co2Saved = pcRepairedCount * 240;
    
    // Average additional years of life: 5 years
    const yearsSaved = pcRepairedCount * 5;
    
    // Animate counter updates
    gsap.to(pcRepairedStat, {
      textContent: pcRepairedCount,
      duration: 0.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        pcRepairedStat.textContent = Math.round(pcRepairedStat.textContent);
      }
    });
    
    gsap.to(co2SavedStat, {
      textContent: co2Saved + ' kg',
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: function() {
        const current = parseFloat(co2SavedStat.textContent);
        co2SavedStat.textContent = Math.round(current) + ' kg';
      }
    });
    
    gsap.to(yearsSavedStat, {
      textContent: yearsSaved,
      duration: 0.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        yearsSavedStat.textContent = Math.round(yearsSavedStat.textContent);
      }
    });
    
    // Celebrate completion
    if (pcRepairedCount === pcs.length) {
      setTimeout(() => {
        alert(`🎉 Bravo ! Vous avez sauvé ${pcRepairedCount} PC !\n\n💚 ${co2Saved}kg de CO₂ évités\n⏰ ${yearsSaved} années de vie supplémentaires\n\nEnsemble, construisons un numérique plus durable !`);
      }, 1000);
    }
  }
  
  // Initial stats animation
  gsap.from([pcRepairedStat, co2SavedStat, yearsSavedStat], {
    scale: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.game-stats',
      start: 'top 80%',
      once: true
    }
  });
}

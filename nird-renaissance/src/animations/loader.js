/**
 * BIOS Loader Animation - SIMPLIFIED VERSION
 * Shows a retro BIOS screen with loading percentage that bugs at 99%
 */

import gsap from 'gsap';

export function initLoader() {
  const loader = document.getElementById('act0-loader');
  const texts = document.querySelectorAll('.loader__text');
  const percentage = document.querySelector('.loader__percentage');
  const logo = document.querySelector('.loader__logo');
  const mainContent = document.getElementById('main-content');
  
  console.log('Loader init - elements found:', { loader, mainContent, textsCount: texts.length });
  
  // Animate BIOS text lines appearing immediately
  gsap.to(texts, {
    opacity: 1,
    duration: 0.3,
    stagger: 0.5,
    ease: 'power2.out'
  });
  
  // Simulate loading percentage
  let currentPercentage = 0;
  const percentageInterval = setInterval(() => {
    currentPercentage += Math.floor(Math.random() * 15) + 5;
    
    // Bug at 99%
    if (currentPercentage >= 99) {
      currentPercentage = 99;
      clearInterval(percentageInterval);
      
      console.log('Reached 99%, starting error sequence');
      
      // Show "error" for a moment, then "hack" to 100%
      setTimeout(() => {
        percentage.textContent = 'ERROR';
        percentage.style.color = '#ff0000';
        
        setTimeout(() => {
          // Glitch effect
          gsap.to(percentage, {
            x: -5,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
              percentage.textContent = '100%';
              percentage.style.color = '#00ff00';
              
              console.log('Showing logo');
              
              // Show logo
              setTimeout(() => {
                logo.classList.remove('hidden');
                gsap.fromTo(logo, 
                  { 
                    opacity: 0,
                    y: 30,
                    scale: 0.8
                  },
                  { 
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out'
                  }
                );
                
                // CRITICAL: Hide loader and show main content after 2 seconds
                setTimeout(() => {
                  console.log('Hiding loader, showing main content');
                  
                  // Hide loader
                  gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                      loader.style.display = 'none';
                      console.log('Loader hidden');
                    }
                  });
                  
                  // Show main content
                  mainContent.classList.remove('hidden');
                  console.log('Main content shown, class removed');
                  
                }, 2000);
              }, 500);
            }
          });
        }, 1000);
      }, 1500);
    } else {
      percentage.textContent = currentPercentage + '%';
    }
  }, 200);
}

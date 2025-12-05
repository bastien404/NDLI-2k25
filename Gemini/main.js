// 1. INITIALISATION DU SMOOTH SCROLL (LENIS)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 2. LOADER ANIMATION
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.fill', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
      .to('.loader', { y: '-100%', duration: 1, ease: 'expo.inOut' }, "+=0.2")
      .from('.hero-content', { y: 100, opacity: 0, duration: 1 }, "-=0.5");
});

// 3. PARALLAXE SOURIS (Hero Section)
const hero = document.querySelector('#hero');
const layers = document.querySelectorAll('.layer');

hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // de -1 à 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    layers.forEach((layer) => {
        const speed = layer.getAttribute('data-speed');
        gsap.to(layer, {
            x: x * 50 * speed,
            y: y * 50 * speed,
            duration: 1,
            ease: 'power2.out'
        });
    });
});

// 4. SCROLL ANIMATIONS
// Parallaxe au scroll sur le fond
gsap.to('.layer-bg', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Transition de couleur Background (Dark -> Light)
gsap.to('body', {
    backgroundColor: '#eaddcf',
    color: '#1a1a1a',
    scrollTrigger: {
        trigger: '#manifesto',
        start: 'top center',
        end: 'center center',
        scrub: true
    }
});

// Reveal Text (Manifesto)
const textLines = document.querySelectorAll('.reveal-line');
textLines.forEach((line) => {
    gsap.to(line, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// 5. MINI JEU LOGIQUE
const grid = document.getElementById('pc-grid');
const victory = document.getElementById('victory-message');
let fixedCount = 0;
const totalPC = 15;

// Créer les PC
for(let i=0; i<totalPC; i++) {
    const pc = document.createElement('div');
    pc.classList.add('pc-item');
    pc.innerHTML = '⚠️'; // Icône Windows cassé
    
    pc.addEventListener('click', function() {
        if(!this.classList.contains('fixed')) {
            this.classList.add('fixed');
            this.innerHTML = '🐧'; // Icône Linux
            fixedCount++;
            checkVictory();
            
            // Petit effet pop
            gsap.from(this, { scale: 1.5, duration: 0.3, ease: 'back.out' });
        }
    });
    grid.appendChild(pc);
}

function checkVictory() {
    if(fixedCount === totalPC) {
        victory.classList.remove('hidden');
        gsap.from('#victory-message', { opacity: 0, y: 50, duration: 1, ease: 'elastic.out(1, 0.3)' });
    }
}
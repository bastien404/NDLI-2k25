// ========================================
// Particles Background Animation
// Système de particules Matrix-like
// ========================================

(function() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Configuration
    const config = {
        particleCount: 50,
        connectionDistance: 150,
        particleSpeed: 0.5,
        particleSize: 2,
        color: '#4caf50',
        opacity: 0.6
    };
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            // Initialiser à une position aléatoire
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.vx = (Math.random() - 0.5) * config.particleSpeed;
            this.vy = Math.random() * config.particleSpeed + 0.5;
            this.size = Math.random() * config.particleSize + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebondir sur les bords
            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -1;
            }
            
            // Réinitialiser si sort de l'écran
            if (this.y > canvas.height + 10) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = config.color;
            ctx.globalAlpha = config.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections between particles
    function drawConnections() {
        ctx.strokeStyle = config.color;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const opacity = (1 - distance / config.connectionDistance) * config.opacity * 0.5;
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        // Continue animation
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Start
    function init() {
        resizeCanvas();
        initParticles();
        animate();
    }
    
    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Pause animation when tab is not visible (battery saving)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate();
        }
    });
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Adjust for retro mode
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('retro-mode')) {
                    config.color = '#33ff33';
                    config.opacity = 0.3;
                } else {
                    config.color = '#4caf50';
                    config.opacity = 0.6;
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
})();

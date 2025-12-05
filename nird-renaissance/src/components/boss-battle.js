/**
 * Boss Battle - Mini-jeu musical intégré
 * Utilise p5.js et p5.sound pour créer un combat de boss rétro
 */

let sketch;
let isGameActive = false;

export function initBossBattle() {
  const modal = document.getElementById('boss-battle-modal');
  const closeBtn = document.querySelector('.boss-battle__close');
  const startScreen = document.getElementById('boss-start-screen');
  const container = document.getElementById('boss-battle-container');
  
  // Bouton trigger pour ouvrir le modal (Easter egg)
  const triggerBtn = document.querySelector('.boss-battle-trigger');
  
  if (!modal || !triggerBtn) {
    console.warn('Boss Battle: Elements not found');
    return;
  }
  
  // Ouvrir le modal
  triggerBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Fermer le modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Arrêter le sketch p5.js si actif
    if (sketch && isGameActive) {
      sketch.remove();
      sketch = null;
      isGameActive = false;
      startScreen.style.display = 'flex';
    }
  };
  
  closeBtn.addEventListener('click', closeModal);
  
  // Fermer avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Démarrer le jeu au clic sur l'écran de démarrage
  startScreen.addEventListener('click', () => {
    if (isGameActive) return;
    
    startScreen.style.display = 'none';
    isGameActive = true;
    initP5Sketch(container);
  });
}

/**
 * Initialise le sketch p5.js pour le Boss Battle
 */
function initP5Sketch(container) {
  // Vérifier que p5 est chargé
  if (typeof p5 === 'undefined') {
    console.error('p5.js not loaded');
    return;
  }
  
  sketch = new p5((p) => {
    // Variables du jeu
    let player;
    let boss;
    let bullets = [];
    let particles = [];
    let score = 0;
    let gameState = 'playing'; // 'playing', 'won', 'lost'
    
    // Audio (sera initialisé si p5.sound est disponible)
    let bgMusic;
    let shootSound;
    let hitSound;
    
    p.setup = function() {
      const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent(container);
      
      // Initialiser le joueur
      player = {
        x: p.width / 2,
        y: p.height - 100,
        size: 30,
        health: 100,
        speed: 5
      };
      
      // Initialiser le boss
      boss = {
        x: p.width / 2,
        y: 100,
        size: 80,
        health: 100,
        speed: 2,
        direction: 1
      };
      
      p.frameRate(60);
    };
    
    p.draw = function() {
      // Fond noir avec effet scanlines
      p.background(0);
      
      if (gameState === 'playing') {
        updateGame();
        drawGame();
      } else if (gameState === 'won') {
        drawWinScreen();
      } else if (gameState === 'lost') {
        drawLoseScreen();
      }
    };
    
    function updateGame() {
      // Déplacer le joueur
      if (p.keyIsDown(p.LEFT_ARROW) && player.x > player.size/2) {
        player.x -= player.speed;
      }
      if (p.keyIsDown(p.RIGHT_ARROW) && player.x < p.width - player.size/2) {
        player.x += player.speed;
      }
      
      // Déplacer le boss
      boss.x += boss.speed * boss.direction;
      if (boss.x < boss.size/2 || boss.x > p.width - boss.size/2) {
        boss.direction *= -1;
      }
      
      // Boss tire des projectiles aléatoirement
      if (p.frameCount % 60 === 0) {
        bullets.push({
          x: boss.x,
          y: boss.y + boss.size/2,
          speed: 3,
          fromBoss: true
        });
      }
      
      // Mettre à jour les balles
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y += bullets[i].fromBoss ? bullets[i].speed : -bullets[i].speed;
        
        // Supprimer si hors écran
        if (bullets[i].y < 0 || bullets[i].y > p.height) {
          bullets.splice(i, 1);
          continue;
        }
        
        // Collision avec le boss
        if (!bullets[i].fromBoss && 
            p.dist(bullets[i].x, bullets[i].y, boss.x, boss.y) < boss.size/2) {
          boss.health -= 10;
          bullets.splice(i, 1);
          createParticles(boss.x, boss.y, p.color(255, 0, 85));
          score += 10;
          
          if (boss.health <= 0) {
            gameState = 'won';
          }
        }
        
        // Collision avec le joueur
        if (bullets[i].fromBoss && 
            p.dist(bullets[i].x, bullets[i].y, player.x, player.y) < player.size/2) {
          player.health -= 10;
          bullets.splice(i, 1);
          createParticles(player.x, player.y, p.color(0, 255, 255));
          
          if (player.health <= 0) {
            gameState = 'lost';
          }
        }
      }
      
      // Mettre à jour les particules
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
    }
    
    function drawGame() {
      // Dessiner le joueur
      p.fill(0, 255, 255);
      p.noStroke();
      p.triangle(
        player.x, player.y - player.size/2,
        player.x - player.size/2, player.y + player.size/2,
        player.x + player.size/2, player.y + player.size/2
      );
      
      // Dessiner le boss
      p.fill(255, 0, 85);
      p.rect(boss.x - boss.size/2, boss.y - boss.size/2, boss.size, boss.size);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(32);
      p.text('😈', boss.x, boss.y);
      
      // Dessiner les balles
      for (let bullet of bullets) {
        p.fill(bullet.fromBoss ? p.color(255, 0, 85) : p.color(0, 255, 255));
        p.ellipse(bullet.x, bullet.y, 8, 8);
      }
      
      // Dessiner les particules
      for (let particle of particles) {
        particle.draw();
      }
      
      // HUD
      drawHUD();
    }
    
    function drawHUD() {
      // Barre de vie du joueur
      p.fill(255);
      p.textAlign(p.LEFT);
      p.textSize(14);
      p.text('PLAYER HP', 20, 30);
      p.fill(50);
      p.rect(20, 40, 200, 20);
      p.fill(0, 255, 255);
      p.rect(20, 40, player.health * 2, 20);
      
      // Barre de vie du boss
      p.fill(255);
      p.textAlign(p.RIGHT);
      p.text('BOSS HP', p.width - 20, 30);
      p.fill(50);
      p.rect(p.width - 220, 40, 200, 20);
      p.fill(255, 0, 85);
      p.rect(p.width - 220, 40, boss.health * 2, 20);
      
      // Score
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(18);
      p.text(`SCORE: ${score}`, p.width / 2, 30);
      
      // Instructions
      p.textSize(12);
      p.text('← → MOVE | SPACE SHOOT', p.width / 2, p.height - 20);
    }
    
    function drawWinScreen() {
      p.background(0, 50, 0);
      p.fill(0, 255, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(64);
      p.text('VICTORY!', p.width / 2, p.height / 2 - 50);
      p.textSize(32);
      p.fill(255);
      p.text(`Final Score: ${score}`, p.width / 2, p.height / 2 + 20);
      p.textSize(18);
      p.text('Click to play again', p.width / 2, p.height / 2 + 80);
    }
    
    function drawLoseScreen() {
      p.background(50, 0, 0);
      p.fill(255, 0, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(64);
      p.text('GAME OVER', p.width / 2, p.height / 2 - 50);
      p.textSize(32);
      p.fill(255);
      p.text(`Final Score: ${score}`, p.width / 2, p.height / 2 + 20);
      p.textSize(18);
      p.text('Click to retry', p.width / 2, p.height / 2 + 80);
    }
    
    function createParticles(x, y, col) {
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(p, x, y, col));
      }
    }
    
    p.keyPressed = function() {
      if (p.key === ' ' && gameState === 'playing') {
        bullets.push({
          x: player.x,
          y: player.y - player.size/2,
          speed: 5,
          fromBoss: false
        });
      }
    };
    
    p.mousePressed = function() {
      if (gameState === 'won' || gameState === 'lost') {
        // Réinitialiser le jeu
        player.health = 100;
        boss.health = 100;
        score = 0;
        bullets = [];
        particles = [];
        gameState = 'playing';
      }
    };
    
    p.windowResized = function() {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
  }, container);
}

/**
 * Classe Particle pour les effets visuels
 */
class Particle {
  constructor(p, x, y, col) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.vx = p.random(-3, 3);
    this.vy = p.random(-3, 3);
    this.alpha = 255;
    this.col = col;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
  
  draw() {
    this.p.fill(this.p.red(this.col), this.p.green(this.col), this.p.blue(this.col), this.alpha);
    this.p.noStroke();
    this.p.ellipse(this.x, this.y, 4, 4);
  }
  
  isDead() {
    return this.alpha <= 0;
  }
}

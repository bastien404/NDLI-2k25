/**
 * NIRD Snake Game - Hidden Easter Egg
 * A stunning cyberpunk-themed Snake game with particle effects
 */

export class SnakeGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isActive = false;
    this.isPaused = false;
    this.gameLoop = null;
    
    // Game settings
    this.gridSize = 20;
    this.tileCount = 25;
    this.speed = 100; // ms between moves
    this.baseSpeed = 100;
    
    // Snake
    this.snake = [];
    this.snakeLength = 5;
    this.velocityX = 1;
    this.velocityY = 0;
    this.nextVelocityX = 1;
    this.nextVelocityY = 0;
    
    // Food
    this.food = { x: 10, y: 10, type: 'normal' };
    this.foodTypes = [
      { type: 'normal', color: '#00ff88', points: 10, emoji: '🍏' },
      { type: 'bonus', color: '#ffaa00', points: 25, emoji: '⚡' },
      { type: 'nird', color: '#4CAF50', points: 50, emoji: '💚' },
    ];
    
    // Score
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('nird-snake-highscore') || '0');
    this.combo = 0;
    
    // Particles
    this.particles = [];
    
    // Colors
    this.colors = {
      snake: ['#00ff88', '#00ddff', '#aa00ff'],
      trail: 'rgba(0, 255, 136, 0.3)',
      bg: 'rgba(0, 0, 0, 0.1)',
      grid: 'rgba(0, 255, 136, 0.1)',
    };
    
    // Initialize
    this.initializeKeyboardListeners();
  }
  
  initializeKeyboardListeners() {
    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    // Text activation: "SNAKE"
    let textBuffer = '';
    let textTimeout = null;
    
    document.addEventListener('keydown', (e) => {
      // Check if game is active
      if (this.isActive) {
        this.handleGameControls(e);
        return;
      }
      
      // Konami Code check
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.activate();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
      
      // Text activation check
      clearTimeout(textTimeout);
      if (e.key.length === 1) {
        textBuffer += e.key.toUpperCase();
        if (textBuffer.includes('SNAKE')) {
          this.activate();
          textBuffer = '';
        }
        // Clear buffer after 2 seconds
        textTimeout = setTimeout(() => {
          textBuffer = '';
        }, 2000);
      }
    });
  }
  
  handleGameControls(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.togglePause();
      return;
    }
    
    if (e.code === 'Escape') {
      e.preventDefault();
      this.deactivate();
      return;
    }
    
    if (this.isPaused) return;
    
    // Movement controls (Arrow keys + WASD)
    const key = e.code;
    if ((key === 'ArrowUp' || key === 'KeyW') && this.velocityY === 0) {
      this.nextVelocityX = 0;
      this.nextVelocityY = -1;
      e.preventDefault();
    } else if ((key === 'ArrowDown' || key === 'KeyS') && this.velocityY === 0) {
      this.nextVelocityX = 0;
      this.nextVelocityY = 1;
      e.preventDefault();
    } else if ((key === 'ArrowLeft' || key === 'KeyA') && this.velocityX === 0) {
      this.nextVelocityX = -1;
      this.nextVelocityY = 0;
      e.preventDefault();
    } else if ((key === 'ArrowRight' || key === 'KeyD') && this.velocityX === 0) {
      this.nextVelocityX = 1;
      this.nextVelocityY = 0;
      e.preventDefault();
    }
  }
  
  activate() {
    if (this.isActive) return;
    
    console.log('🐍 NIRD Snake activated!');
    this.isActive = true;
    
    // Create overlay
    this.createOverlay();
    
    // Initialize game
    this.resetGame();
    
    // Start game loop
    this.startGameLoop();
    
    // Play activation sound
    this.playSound('activate');
  }
  
  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'snake-overlay';
    overlay.className = 'snake-overlay';
    overlay.innerHTML = `
      <div class="snake-container">
        <div class="snake-header">
          <h2 class="snake-title">
            <span class="glitch-snake" data-text="NIRD SNAKE">NIRD SNAKE</span>
          </h2>
          <div class="snake-stats">
            <div class="snake-stat">
              <span class="stat-label">Score</span>
              <span class="stat-value" id="snake-score">0</span>
            </div>
            <div class="snake-stat">
              <span class="stat-label">High Score</span>
              <span class="stat-value" id="snake-highscore">${this.highScore}</span>
            </div>
            <div class="snake-stat">
              <span class="stat-label">Combo</span>
              <span class="stat-value combo" id="snake-combo">x1</span>
            </div>
          </div>
        </div>
        
        <canvas id="snake-canvas"></canvas>
        
        <div class="snake-controls">
          <button class="snake-btn" id="snake-pause">
            <span>⏸</span> Pause (SPACE)
          </button>
          <button class="snake-btn" id="snake-quit">
            <span>✕</span> Quitter (ESC)
          </button>
        </div>
        
        <div class="snake-footer">
          <p>🎮 Utilisez les flèches ou WASD • 💚 Collectez les items NIRD pour bonus</p>
        </div>
      </div>
      
      <div class="snake-game-over hidden">
        <div class="game-over-content">
          <h3 class="glitch-snake" data-text="GAME OVER">GAME OVER</h3>
          <p class="final-score">Score: <span id="final-score">0</span></p>
          <p class="high-score-msg hidden" id="new-highscore">🎉 Nouveau record !</p>
          <button class="snake-btn-large" id="snake-restart">
            <span>↻</span> Rejouer
          </button>
          <button class="snake-btn-secondary" id="snake-close">
            Quitter
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Setup canvas
    this.canvas = document.getElementById('snake-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size
    const size = Math.min(600, window.innerWidth - 40);
    this.canvas.width = size;
    this.canvas.height = size;
    this.gridSize = size / this.tileCount;
    
    // Add event listeners
    document.getElementById('snake-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('snake-quit').addEventListener('click', () => this.deactivate());
    document.getElementById('snake-restart').addEventListener('click', () => this.restart());
    document.getElementById('snake-close').addEventListener('click', () => this.deactivate());
    
    // Animate entrance
    setTimeout(() => overlay.classList.add('active'), 10);
  }
  
  resetGame() {
    // Reset snake
    this.snake = [];
    for (let i = 0; i < this.snakeLength; i++) {
      this.snake.push({ x: 10 - i, y: 10 });
    }
    
    // Reset velocities
    this.velocityX = 1;
    this.velocityY = 0;
    this.nextVelocityX = 1;
    this.nextVelocityY = 0;
    
    // Reset score
    this.score = 0;
    this.combo = 1;
    this.speed = this.baseSpeed;
    
    // Generate food
    this.generateFood();
    
    // Reset pause
    this.isPaused = false;
    
    // Update UI
    this.updateUI();
  }
  
  generateFood() {
    let validPosition = false;
    let x, y;
    
    while (!validPosition) {
      x = Math.floor(Math.random() * this.tileCount);
      y = Math.floor(Math.random() * this.tileCount);
      
      validPosition = !this.snake.some(segment => segment.x === x && segment.y === y);
    }
    
    // Random food type (70% normal, 20% bonus, 10% NIRD)
    const rand = Math.random();
    let foodType;
    if (rand < 0.7) {
      foodType = this.foodTypes[0]; // normal
    } else if (rand < 0.9) {
      foodType = this.foodTypes[1]; // bonus
    } else {
      foodType = this.foodTypes[2]; // NIRD
    }
    
    this.food = { x, y, ...foodType };
  }
  
  startGameLoop() {
    this.gameLoop = setInterval(() => {
      if (!this.isPaused) {
        this.update();
        this.draw();
      }
    }, this.speed);
  }
  
  update() {
    // Update velocity
    this.velocityX = this.nextVelocityX;
    this.velocityY = this.nextVelocityY;
    
    // Move snake
    const head = { 
      x: this.snake[0].x + this.velocityX, 
      y: this.snake[0].y + this.velocityY 
    };
    
    // Check wall collision
    if (head.x < 0 || head.x >= this.tileCount || 
        head.y < 0 || head.y >= this.tileCount) {
      this.gameOver();
      return;
    }
    
    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }
    
    // Add new head
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.eatFood();
    } else {
      this.snake.pop(); // Remove tail
    }
  }
  
  eatFood() {
    // Update score
    const points = this.food.points * this.combo;
    this.score += points;
    
    // Update combo
    this.combo = Math.min(this.combo + 0.5, 5);
    
    // Create particles
    this.createParticles(this.food.x, this.food.y, this.food.color);
    
    // Increase speed slightly
    if (this.score % 50 === 0) {
      this.speed = Math.max(50, this.speed - 5);
      clearInterval(this.gameLoop);
      this.startGameLoop();
    }
    
    // Generate new food
    this.generateFood();
    
    // Update UI
    this.updateUI();
    
    // Play sound
    this.playSound('eat');
  }
  
  createParticles(x, y, color) {
    const centerX = x * this.gridSize + this.gridSize / 2;
    const centerY = y * this.gridSize + this.gridSize / 2;
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 2 + Math.random() * 3;
      
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        color: color,
        size: 2 + Math.random() * 3
      });
    }
  }
  
  draw() {
    // Clear canvas with fade effect
    this.ctx.fillStyle = this.colors.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid
    this.drawGrid();
    
    // Draw food with glow
    this.drawFood();
    
    // Draw snake with gradient
    this.drawSnake();
    
    // Draw and update particles
    this.drawParticles();
  }
  
  drawGrid() {
    this.ctx.strokeStyle = this.colors.grid;
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i <= this.tileCount; i++) {
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
      
      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }
  }
  
  drawSnake() {
    this.snake.forEach((segment, index) => {
      const x = segment.x * this.gridSize;
      const y = segment.y * this.gridSize;
      
      // Create gradient
      const gradient = this.ctx.createLinearGradient(
        x, y, 
        x + this.gridSize, y + this.gridSize
      );
      
      const colorIndex = index % this.colors.snake.length;
      const alpha = 1 - (index / this.snake.length) * 0.5;
      
      gradient.addColorStop(0, this.colors.snake[colorIndex]);
      gradient.addColorStop(1, this.colors.snake[(colorIndex + 1) % this.colors.snake.length]);
      
      // Draw segment with glow
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = this.colors.snake[colorIndex];
      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = alpha;
      
      // Rounded rectangle
      this.ctx.beginPath();
      this.ctx.roundRect(
        x + 1, y + 1, 
        this.gridSize - 2, this.gridSize - 2, 
        4
      );
      this.ctx.fill();
      
      // Reset
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;
      
      // Draw eyes on head
      if (index === 0) {
        this.ctx.fillStyle = '#000';
        const eyeSize = this.gridSize / 6;
        const eyeOffset = this.gridSize / 3;
        
        if (this.velocityX !== 0) {
          // Horizontal eyes
          this.ctx.fillRect(x + eyeOffset, y + eyeOffset - eyeSize, eyeSize, eyeSize);
          this.ctx.fillRect(x + eyeOffset, y + this.gridSize - eyeOffset, eyeSize, eyeSize);
        } else {
          // Vertical eyes
          this.ctx.fillRect(x + eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
          this.ctx.fillRect(x + this.gridSize - eyeOffset, y + eyeOffset, eyeSize, eyeSize);
        }
      }
    });
  }
  
  drawFood() {
    const x = this.food.x * this.gridSize;
    const y = this.food.y * this.gridSize;
    
    // Glow effect
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = this.food.color;
    
    // Draw food
    this.ctx.fillStyle = this.food.color;
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.gridSize / 2, 
      y + this.gridSize / 2, 
      this.gridSize / 3, 
      0, Math.PI * 2
    );
    this.ctx.fill();
    
    // Reset shadow
    this.ctx.shadowBlur = 0;
    
    // Draw emoji
    this.ctx.font = `${this.gridSize * 0.6}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      this.food.emoji, 
      x + this.gridSize / 2, 
      y + this.gridSize / 2
    );
  }
  
  drawParticles() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      particle.vy += 0.1; // Gravity
      
      if (particle.life > 0) {
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.life;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        return true;
      }
      return false;
    });
  }
  
  updateUI() {
    document.getElementById('snake-score').textContent = this.score;
    document.getElementById('snake-combo').textContent = `x${this.combo.toFixed(1)}`;
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      document.getElementById('snake-highscore').textContent = this.highScore;
    }
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.getElementById('snake-pause');
    if (this.isPaused) {
      btn.innerHTML = '<span>▶</span> Reprendre (SPACE)';
      this.showPauseOverlay();
    } else {
      btn.innerHTML = '<span>⏸</span> Pause (SPACE)';
      this.hidePauseOverlay();
    }
  }
  
  showPauseOverlay() {
    // Draw semi-transparent overlay on canvas
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw pause text
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 48px JetBrains Mono, monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = '#00ff88';
    this.ctx.fillText('PAUSE', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.shadowBlur = 0;
  }
  
  hidePauseOverlay() {
    // Redraw will happen in next frame
  }
  
  gameOver() {
    clearInterval(this.gameLoop);
    
    // Save high score
    if (this.score > parseInt(localStorage.getItem('nird-snake-highscore') || '0')) {
      localStorage.setItem('nird-snake-highscore', this.score.toString());
      document.getElementById('new-highscore').classList.remove('hidden');
    }
    
    // Show game over screen
    document.getElementById('final-score').textContent = this.score;
    document.querySelector('.snake-game-over').classList.remove('hidden');
    
    // Play sound
    this.playSound('gameover');
  }
  
  restart() {
    document.querySelector('.snake-game-over').classList.add('hidden');
    document.getElementById('new-highscore').classList.add('hidden');
    this.resetGame();
    this.startGameLoop();
  }
  
  deactivate() {
    if (!this.isActive) return;
    
    this.isActive = false;
    clearInterval(this.gameLoop);
    
    const overlay = document.getElementById('snake-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
    
    console.log('🐍 NIRD Snake deactivated');
  }
  
  playSound(type) {
    // Simple Web Audio API sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    switch(type) {
      case 'activate':
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
        break;
      case 'eat':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'gameover':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }
}

// Auto-initialize
let snakeGame = null;

export function initSnake() {
  if (!snakeGame) {
    snakeGame = new SnakeGame();
    console.log('🐍 Snake game initialized. Try the Konami Code or type "SNAKE"!');
  }
  return snakeGame;
}

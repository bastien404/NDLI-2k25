let song;
let fft;
let amplitude;
let isPlaying = false;

const GAME_WIDTH = 320;
const GAME_HEIGHT = 240;

window.preload = function() {
  song = loadSound('music.mp3'); 
}

window.setup = function() {
  let cnv = createCanvas(GAME_WIDTH, GAME_HEIGHT);
  cnv.parent('app');
  noSmooth(); 
  frameRate(30);
  fft = new p5.FFT(0.8, 64); 
  amplitude = new p5.Amplitude();

  let startScreen = document.getElementById('start-screen');
  startScreen.addEventListener('click', () => {
    if (!isPlaying) {
      userStartAudio();
      song.play();
      isPlaying = true;
      startScreen.style.display = 'none';
    }
  });
}

window.draw = function() {
  if (!isPlaying) {
    background(0);
    return;
  }

  let spectrum = fft.analyze(); 
  
  let vocalEnergy = fft.getEnergy(400, 2500);
  
  let vocalThreshold = 140; 
  let isSinging = vocalEnergy > vocalThreshold;

  if (isSinging) {
    background(60, 20, 80); 
  } else {
    background(20, 10, 30);
  }

  push(); 
  let shakeX = 0;
  let shakeY = 0;
  
  if (isSinging) {
    shakeX = random(-2, 2); 
    shakeY = random(-1, 1);   
  }
  translate(shakeX, shakeY);

  drawFloor(0.3);

  push();
  translate(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  
  let jumpY = 0;
  if (isSinging) {
     jumpY = map(vocalEnergy, vocalThreshold, 255, 0, -10);
  }
  translate(0, jumpY);

  let scaleFactor = map(vocalEnergy, 0, 255, 1.0, 1.1);
  scale(scaleFactor);
  
  drawPixelBoss(isSinging, vocalEnergy);
  pop(); 

  pop();

  drawHealthBar(spectrum, isSinging);
}

function drawFloor(speed) {
  stroke(255, 0, 255, 50);
  strokeWeight(1);
  let offset = (frameCount * (speed * 20 + 2)) % 20;
  
  for (let y = GAME_HEIGHT / 2; y < GAME_HEIGHT; y += 10 + (y - GAME_HEIGHT/2)/2) {
    line(0, y + offset, GAME_WIDTH, y + offset);
  }
  for (let x = 0; x <= GAME_WIDTH; x += 40) {
    line(GAME_WIDTH/2, GAME_HEIGHT/2, (x - GAME_WIDTH/2) * 4 + GAME_WIDTH/2, GAME_HEIGHT);
  }
}

function drawHealthBar(spectrum, isActive) {
  noFill();
  if (isActive) { stroke(0, 255, 255); strokeWeight(2); }
  else { stroke(100); strokeWeight(1); }
  
  rect(10, 10, GAME_WIDTH - 20, 15);
  noStroke();
  fill(255);
  textSize(8);
  text("BOSS VOICE", 10, 8);

  let barWidth = (GAME_WIDTH - 24) / 32;
  
  for (let i = 0; i < 32; i++) {
    let amp = spectrum[i]; 
    let h = map(amp, 0, 255, 0, 11);
    
    if (i < 10) fill(0, 100, 255);      
    else if (i < 22) fill(255, 0, 255); 
    else fill(255, 255, 255);           
    
    rect(12 + i * barWidth, 12 + (11 - h), barWidth - 1, h);
  }
}

function drawPixelBoss(isSinging, energy) {
  noStroke();
  rectMode(CENTER);
  
  if (isSinging) fill(100, 200, 255); 
  else fill(120, 0, 180); 
  rect(0, 0, 60, 60);
  
  fill(80, 0, 120);
  rect(-35, -20, 10, 25);
  rect(35, -20, 10, 25);

  fill(255, 255, 0);
  if (isSinging) {
      rect(-15, -12, 15, 14);
      rect(15, -12, 15, 14);
  } else {
      rect(-15, -10, 15, 10);
      rect(15, -10, 15, 10);
  }
  
  fill(0);
  rect(-15, -10, 5, 5);
  rect(15, -10, 5, 5);
  
  fill(200, 0, 0); 
  
  let mouthHeight = 4;
  
  if (isSinging) {
    mouthHeight = map(energy, 140, 255, 10, 40);
  }
  
  rect(0, 20, 40, mouthHeight);
  
  fill(255);
  if (mouthHeight > 10) {
    rect(-10, 20 - mouthHeight/2 + 2, 5, 5);
    rect(10, 20 - mouthHeight/2 + 2, 5, 5);
  }
}
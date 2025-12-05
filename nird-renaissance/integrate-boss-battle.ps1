#!/usr/bin/env pwsh

# Script pour intégrer Boss Battle au site NIRD

Write-Host "IntÃ©gration du Boss Battle...`n" -ForegroundColor Cyan

# 1. Ajout du bouton Boss Battle dans le footer de index.html
Write-Host "1. Modification de index.html..." -ForegroundColor Yellow
(Get-Content "index.html") -replace '(\s+<a href="#" target="_blank">Contact</a>)', '$1`n          <button class="boss-battle-trigger">Boss Battle</button>' | Set-Content "index.html"

# 2. Ajout du modal Boss Battle avant la fermeture de </body>
$modalHtml =  @"


  <!-- Boss Battle Modal -->
  <div id="boss-battle-modal" class="boss-battle-modal">
    <div class="boss-battle-wrapper">
      <button class="boss-battle__close">âœ•</button>
      
      <div id="boss-start-screen">
        <h1>BOSS BATTLE</h1>
        <p>CLICK TO START</p>
      </div>
      
      <div id="boss-battle-container"></div>
    </div>
  </div>

  <!-- p5.js libraries for Boss Battle -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/addons/p5.sound.min.js"></script>

"@

(Get-Content "index.html") -replace '(\s+<script type="module" src="/src/main.js"></script>)', "$modalHtml`$1" | Set-Content "index.html"

# 3. Ajout de l'import Boss Battle dans main.scss
Write-Host "2. Modification de main.scss..." -ForegroundColor Yellow
(Get-Content "src/styles/main.scss") -replace "(@use 'snake';)", "`$1`n@use 'boss-battle';" | Set-Content "src/styles/main.scss"

# 4. Ajout de l'import et initialisation dans main.js
Write-Host "3. Modification de main.js..." -ForegroundColor Yellow
(Get-Content "src/main.js") -replace "(import { initSnake } from './components/snake.js';)", "`$1`nimport { initBossBattle } from './components/boss-battle.js';" | Set-Content "src/main.js"
(Get-Content "src/main.js") -replace "(\s+// Initialize hidden Snake game.*\n\s+initSnake\(\);)", "`$1`n  `n  // Initialize Boss Battle game ðŸŽ®`n  initBossBattle();" | Set-Content "src/main.js"

Write-Host "`nIntÃ©gration terminÃ©e avec succÃ¨s! ✨" -ForegroundColor Green
Write-Host "Vous pouvez maintenant tester avec 'npm run dev'`n" -ForegroundColor Cyan

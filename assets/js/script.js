// ========================================
// NIRD - Le Village Résistant
// Système de Jeu Avancé avec Scoring
// ========================================

// État global du jeu
const gameState = {
    budget: 100000, // Budget en euros
    co2: 0, // Empreinte carbone en tonnes
    satisfaction: 50, // Satisfaction en %
    currentScenarioIndex: 0,
    choices: [] // Historique des choix
};

// Les scénarios du jeu
const scenarios = [
    {
        id: 1,
        title: "Obsolescence Programmée",
        desc: "🖥️ Alerte ! Windows 10 n'est plus supporté. Tes 500 PC fonctionnent encore très bien physiquement, mais ils rament et ne sont plus sécurisés. Microsoft te pousse à tout remplacer... Que fais-tu ?",
        choices: [
            {
                text: "💸 A. Acheter 500 nouveaux PC (Budget: 250 000€)",
                outcome: "bad",
                feedback: "❌ Mauvais choix ! Tu as explosé le budget et l'empreinte carbone. Les vieux PC finissent à la décharge. C'est ça la dépendance aux Big Tech... Les élèves n'auront pas de tablettes cette année.",
                impact: { budget: -250000, co2: 50, satisfaction: -10 }
            },
            {
                text: "🐧 B. Installer Linux Mint (Budget: 0€ + 2000€ formation)",
                outcome: "good",
                feedback: "✅ Bravo ! Tu as sauvé le matériel. C'est rapide, sécurisé et gratuit. Les élèves découvrent un système ouvert et apprennent l'autonomie numérique ! Les profs sont ravis de la rapidité retrouvée.",
                impact: { budget: -2000, co2: 0, satisfaction: 15 }
            }
        ]
    },
    {
        id: 2,
        title: "Licences Coûteuses",
        desc: "📊 Le renouvellement de la suite Office coûte 45 000€ cette année. Le budget sorties scolaires (ski, théâtre, musées) est menacé. Les élèves comptent sur toi...",
        choices: [
            {
                text: "💔 A. Payer la licence et annuler le voyage de fin d'année",
                outcome: "bad",
                feedback: "❌ Dommage. Les élèves sont tristes, certains pleurent. Vous êtes prisonniers d'un format de fichier fermé. Microsoft vous tient en otage.",
                impact: { budget: -45000, co2: 2, satisfaction: -20 }
            },
            {
                text: "📄 B. Passer à LibreOffice et garder le budget voyages",
                outcome: "good",
                feedback: "✅ Excellent ! C'est compatible .docx, gratuit, et l'argent économisé servira aux sorties ! Les élèves vont au ski ET tu as formé 3 profs qui deviennent ambassadeurs du libre.",
                impact: { budget: -0, co2: 0, satisfaction: 25 }
            }
        ]
    },
    {
        id: 3,
        title: "Le Cloud des GAFAM",
        desc: "☁️ Le rectorat te propose un serveur de fichiers. Option A : Google Drive (gratuit aujourd'hui, mais tes données partent aux USA). Option B : Installer Nextcloud sur un serveur du lycée.",
        choices: [
            {
                text: "🔍 A. Accepter Google Drive (Gratuit, facile)",
                outcome: "bad",
                feedback: "❌ Piège ! C'est gratuit parce que TU es le produit. Les données des élèves sont analysées à des fins publicitaires. La CNIL n'est pas contente. Les parents sont furieux quand ils apprennent.",
                impact: { budget: 0, co2: 8, satisfaction: -15 }
            },
            {
                text: "🏠 B. Installer Nextcloud (5000€ serveur + formation)",
                outcome: "good",
                feedback: "✅ Souveraineté numérique ! Les données restent à l'école, c'est conforme RGPD. Les élèves peuvent même y accéder depuis chez eux. Le club informatique maintient le serveur !",
                impact: { budget: -5000, co2: 1, satisfaction: 10 }
            }
        ]
    },
    {
        id: 4,
        title: "Visioconférence : Le Choix",
        desc: "🎥 Pour les cours hybrides, il faut une solution de visio. Microsoft Teams est déjà installé... mais BigBlueButton et Jitsi sont libres et gratuits. Que choisis-tu ?",
        choices: [
            {
                text: "💼 A. Utiliser Microsoft Teams (Déjà là, tout le monde connaît)",
                outcome: "bad",
                feedback: "❌ Encore Microsoft... Les réunions sont limitées à 60 min en version gratuite, puis ça devient payant. Vous êtes coincés. Et les métadonnées partent chez Microsoft.",
                impact: { budget: -15000, co2: 5, satisfaction: -5 }
            },
            {
                text: "🎬 B. Déployer BigBlueButton (3000€ serveur)",
                outcome: "good",
                feedback: "✅ Génial ! Aucune limite de temps, enregistrements illimités, code ouvert. Les profs peuvent même personnaliser l'interface. Les élèves de terminale NSI ont contribué au code !",
                impact: { budget: -3000, co2: 1, satisfaction: 20 }
            }
        ]
    },
    {
        id: 5,
        title: "Sécurité Informatique",
        desc: "🛡️ Un ransomware attaque les lycées de la région. Il faut sécuriser les postes. L'assurance propose un antivirus propriétaire à 20 000€/an. Mais Linux + bonnes pratiques = sécurité native...",
        choices: [
            {
                text: "💰 A. Acheter l'antivirus propriétaire (20 000€/an)",
                outcome: "bad",
                feedback: "❌ Coûteux et... insuffisant. L'antivirus ralentit les machines et ne protège pas contre le phishing (cause #1 des attaques). Le ransomware passe quand même via une clé USB.",
                impact: { budget: -20000, co2: 3, satisfaction: -10 }
            },
            {
                text: "🎓 B. Former les utilisateurs + sauvegardes (2000€)",
                outcome: "good",
                feedback: "✅ Le maillon faible c'est l'humain ! Tu organises des ateliers phishing, actives les sauvegardes automatiques. Zéro attaque cette année. Les élèves deviennent des ambassadeurs cybersécurité !",
                impact: { budget: -2000, co2: 0, satisfaction: 15 }
            }
        ]
    },
    {
        id: 6,
        title: "Formation des Enseignants",
        desc: "👨‍🏫 Les profs doivent se former au numérique. Un organisme privé propose une formation à 30 000€. Mais la communauté Framasoft + NIRD offre des ressources gratuites et une entraide...",
        choices: [
            {
                text: "💸 A. Payer la formation privée (30 000€)",
                outcome: "bad",
                feedback: "❌ La formation est superficielle et porte sur des outils propriétaires. 3 mois après, tout est oublié. Aucune communauté pour continuer l'apprentissage.",
                impact: { budget: -30000, co2: 4, satisfaction: -5 }
            },
            {
                text: "🤝 B. Rejoindre la communauté NIRD (0€ + entraide)",
                outcome: "good",
                feedback: "✅ JACKPOT ! Des centaines de profs partagent leurs ressources. Tu organises un BarCamp libre dans ton lycée. 5 établissements voisins demandent à rejoindre le réseau. Le ministre visite ton lycée !",
                impact: { budget: 0, co2: 0, satisfaction: 30 }
            }
        ]
    }
];

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

function updateGauges() {
    // Budget
    const budgetBar = document.getElementById('budget-bar');
    const budgetText = document.getElementById('budget-value');
    const budgetPercent = Math.max(0, Math.min(100, (gameState.budget / 100000) * 100));
    budgetBar.style.width = budgetPercent + '%';
    budgetText.textContent = `${gameState.budget.toLocaleString('fr-FR')} €`;
    
    // CO2
    const co2Bar = document.getElementById('co2-bar');
    const co2Text = document.getElementById('co2-value');
    const co2Percent = Math.min(100, (gameState.co2 / 100) * 100);
    co2Bar.style.width = co2Percent + '%';
    co2Text.textContent = `${gameState.co2} tonnes`;
    
    // Satisfaction
    const satisfactionBar = document.getElementById('satisfaction-bar');
    const satisfactionText = document.getElementById('satisfaction-value');
    satisfactionBar.style.width = gameState.satisfaction + '%';
    satisfactionText.textContent = `${gameState.satisfaction}%`;
    
    // Animation pulse
    [budgetBar, co2Bar, satisfactionBar].forEach(bar => {
        bar.classList.add('pulse');
        setTimeout(() => bar.classList.remove('pulse'), 600);
    });
}

function typeWriter(element, text, speed = 30) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function showFeedback(choice) {
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden');
    feedback.className = 'feedback'; // Reset classes
    feedback.classList.add(choice.outcome === 'good' ? 'feedback-good' : 'feedback-bad');
    
    typeWriter(feedback, choice.feedback, 20);
    
    // Animation de particules
    if (choice.outcome === 'good') {
        createParticles('good');
    } else {
        createParticles('bad');
    }
}

function createParticles(type) {
    const container = document.querySelector('.terminal-window');
    const color = type === 'good' ? '#4caf50' : '#ff5252';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            left: 50%;
            top: 50%;
            animation: particleFloat 1s ease-out forwards;
            opacity: 0.8;
        `;
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 50 + Math.random() * 50;
        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// ========================================
// LOGIQUE DU JEU
// ========================================

function startGame() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('game-interface').classList.remove('hidden');
    document.getElementById('stats-dashboard').classList.remove('hidden');
    
    updateGauges();
    loadScenario(0);
}

function loadScenario(index) {
    if (index >= scenarios.length) {
        endGame();
        return;
    }
    
    gameState.currentScenarioIndex = index;
    const scenario = scenarios[index];
    
    // Update progress
    const progress = document.getElementById('scenario-progress');
    progress.textContent = `Mission ${index + 1}/${scenarios.length}`;
    
    // Update content
    const title = document.getElementById('scenario-title');
    const desc = document.getElementById('scenario-desc');
    
    typeWriter(title, `Mission ${index + 1}: ${scenario.title}`, 40);
    
    setTimeout(() => {
        typeWriter(desc, scenario.desc, 25);
    }, 500);
    
    // Update buttons
    const btnA = document.getElementById('choice-a');
    const btnB = document.getElementById('choice-b');
    const feedback = document.getElementById('feedback');
    
    feedback.classList.add('hidden');
    btnA.disabled = false;
    btnB.disabled = false;
    
    btnA.innerHTML = scenario.choices[0].text;
    btnB.innerHTML = scenario.choices[1].text;
    
    btnA.onclick = () => handleChoice(scenario.choices[0]);
    btnB.onclick = () => handleChoice(scenario.choices[1]);
}

function handleChoice(choice) {
    // Enregistrer le choix
    gameState.choices.push(choice);
    
    // Appliquer les impacts
    gameState.budget += choice.impact.budget;
    gameState.co2 += choice.impact.co2;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + choice.impact.satisfaction));
    
    // Update UI
    updateGauges();
    showFeedback(choice);
    
    // Désactiver les boutons
    document.getElementById('choice-a').disabled = true;
    document.getElementById('choice-b').disabled = true;
    
    // Passer au scénario suivant
    setTimeout(() => {
        gameState.currentScenarioIndex++;
        loadScenario(gameState.currentScenarioIndex);
    }, 4000);
}

function endGame() {
    // Calculer le score final
    const budgetScore = Math.max(0, gameState.budget / 1000); // Points par millier d'euros restant
    const co2Score = Math.max(0, 100 - gameState.co2 * 2); // Pénalité CO2
    const satisfactionScore = gameState.satisfaction * 2; // Bonus satisfaction
    
    const totalScore = Math.round(budgetScore + co2Score + satisfactionScore);
    
    // Déterminer le badge
    let badge = '';
    let badgeEmoji = '';
    let message = '';
    
    if (totalScore >= 400) {
        badge = 'Druide du Libre';
        badgeEmoji = '🧙‍♂️';
        message = 'Tu es une légende ! Ton lycée est devenu un modèle de souveraineté numérique. D\'autres établissements demandent à te rencontrer.';
    } else if (totalScore >= 300) {
        badge = 'Résistant Confirmé';
        badgeEmoji = '🛡️';
        message = 'Excellent travail ! Ton établissement a échappé aux griffes des Big Tech et inspire les autres.';
    } else if (totalScore >= 200) {
        badge = 'Apprenti Gaulois';
        badgeEmoji = '⚔️';
        message = 'Bon début ! Tu as compris l\'importance du libre, mais il reste du chemin à parcourir.';
    } else {
        badge = 'Prisonnier de l\'Empire';
        badgeEmoji = '⛓️';
        message = 'Aïe... Tu es tombé dans tous les pièges des GAFAM. Mais ce n\'est pas trop tard pour recommencer !';
    }
    
    // Afficher l'écran de fin
    const gameInterface = document.getElementById('game-interface');
    gameInterface.innerHTML = `
        <div class="terminal-window end-screen">
            <div class="terminal-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="title">Bilan Final - Village Résistant</span>
            </div>
            <div class="terminal-body end-body">
                <h2>🎉 Mission Terminée !</h2>
                
                <div class="badge-display">
                    <div class="badge-emoji">${badgeEmoji}</div>
                    <h3>Badge obtenu : ${badge}</h3>
                    <p>${message}</p>
                </div>
                
                <div class="final-stats">
                    <h3>📊 Statistiques Finales</h3>
                    <div class="stat-row">
                        <span>💰 Budget restant:</span>
                        <strong>${gameState.budget.toLocaleString('fr-FR')} €</strong>
                    </div>
                    <div class="stat-row">
                        <span>🌍 Empreinte CO2:</span>
                        <strong>${gameState.co2} tonnes</strong>
                    </div>
                    <div class="stat-row">
                        <span>😊 Satisfaction:</span>
                        <strong>${gameState.satisfaction}%</strong>
                    </div>
                    <div class="stat-row score-row">
                        <span>🏆 Score Total:</span>
                        <strong class="score-value">${totalScore} points</strong>
                    </div>
                </div>
                
                <div class="end-actions">
                    <button onclick="location.reload()" class="btn-primary">🔄 Rejouer</button>
                    <a href="https://nird.forge.apps.education.fr/" target="_blank" class="btn-secondary">
                        🛡️ Rejoindre NIRD
                    </a>
                </div>
                
                <div class="panoramix-message">
                    <p>💬 <strong>Panoramix dit :</strong> "${getPanoramixQuote(totalScore)}"</p>
                </div>
            </div>
        </div>
    `;
    
    // Cacher le dashboard
    document.getElementById('stats-dashboard').classList.add('hidden');
}

function getPanoramixQuote(score) {
    if (score >= 400) {
        return "Par Toutatis ! Tu as la potion magique du numérique libre ! Ton village résistera éternellement à l'Empire.";
    } else if (score >= 300) {
        return "Bien joué, jeune Gaulois ! Continue comme ça et tu deviendras un maître de la résistance numérique.";
    } else if (score >= 200) {
        return "Rome ne s'est pas faite en un jour... ni un village libre ! Apprends de tes erreurs et recommence.";
    } else {
        return "Obélix a encore mangé toute la potion... Tu as besoin d'une nouvelle dose de sagesse libre !";
    }
}

// ========================================
// EASTER EGG - Mode Retro
// ========================================

function toggleRetroMode() {
    document.body.classList.toggle('retro-mode');
    const btn = document.getElementById('retro-toggle');
    
    if (document.body.classList.contains('retro-mode')) {
        btn.textContent = '💻 Mode Moderne';
        localStorage.setItem('retroMode', 'true');
    } else {
        btn.textContent = '🕹️ Mode Rétro';
        localStorage.setItem('retroMode', 'false');
    }
}

// Charger la préférence au démarrage
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('retroMode') === 'true') {
        document.body.classList.add('retro-mode');
        const btn = document.getElementById('retro-toggle');
        if (btn) btn.textContent = '💻 Mode Moderne';
    }
});
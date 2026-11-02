const game = document.getElementById('game');
const candyDisplay = document.getElementById('candy');
const waveDisplay = document.getElementById('wave-display');
const waveFill = document.getElementById('wave-fill');
const bossContainer = document.getElementById('boss-container');
const bossFill = document.getElementById('boss-fill');

let candy = 150;
let selectedDefender = null;
const defenders = [];
const enemies = [];
const bullets = [];

const rows = 5;
const cols = 9;

let wave = 1;
let enemiesSpawned = 0;
let maxEnemiesPerWave = 10;

// Create grid
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.top = (r * 100) + 'px';
        cell.style.left = (c * 100) + 'px';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.onclick = () => placeDefender(r, c, cell);
        game.appendChild(cell);
    }
}

function selectDefender(type, cost) {
    selectedDefender = { type, cost };
}

function placeDefender(r, c, cell) {
    if (!selectedDefender) return;
    if (candy < selectedDefender.cost) {
        alert("Not enough candy!");
        return;
    }
    if (defenders.find(d => d.row === r && d.col === c)) return;

    const defender = document.createElement('div');
    defender.classList.add(selectedDefender.type);
    cell.appendChild(defender);

    const fireRateMap = {
        pumpkin: 1200,
        firepumpkin: 800,
        icepumpkin: 1200,
        fastpumpkin: 600,
        explosivepumpkin: 2000,
        sniperpumpkin: 2500,
        candygen: null, // no shooting
        spikypumpkin: null // no shooting
    };

    defenders.push({
        row: r,
        col: c,
        type: selectedDefender.type,
        x: c * 100,
        y: r * 100,
        fireRate: fireRateMap[selectedDefender.type]
    });

    // Candy generator logic
    if (selectedDefender.type === 'candygen') {
        setInterval(() => {
            candy += 10;
            candyDisplay.textContent = candy;
        }, 5000);
    }

    candy -= selectedDefender.cost;
    candyDisplay.textContent = candy;
}

function updateWaveDisplay() {
    waveDisplay.textContent = `Wave: ${wave}`;
}

function updateWaveProgress() {
    const progress = (enemiesSpawned / maxEnemiesPerWave) * 100;
    waveFill.style.width = progress + '%';
}

function showBossHP(hp, maxHp) {
    bossContainer.style.display = 'block';
    const percent = (hp / maxHp) * 100;
    bossFill.style.width = percent + '%';
}

function spawnEnemy() {
    let type;

    if (wave === 5 && enemiesSpawned === 0) {
        alert("⚠️ Boss Incoming! Prepare your defenses!");
    }

    if (wave === 5 && enemiesSpawned === maxEnemiesPerWave - 1) {
        type = 'boss';
    } else {
        const rand = Math.random();
        if (rand < 0.5) type = 'vine';
        else if (rand < 0.8) type = 'ghost';
        else if (wave >= 2 && wave <= 3) type = 'bat';
        else type = 'vine';
    }

    const row = Math.floor(Math.random() * rows);
    const enemy = document.createElement('div');
    enemy.classList.add('enemy', type);
    enemy.style.top = (row * 100 + 10) + 'px';
    enemy.style.left = '900px';
    game.appendChild(enemy);

    let speed = 1, hp = 5;
    if (type === 'ghost') { speed = 1.8; hp = 3; }
    else if (type === 'bat') { speed = 2.5; hp = 2; }
    else if (type === 'boss') { speed = 0.5; hp = 50; bossContainer.style.display = 'block'; }

    enemies.push({ el: enemy, type, row, x: 900, speed, hp });
    enemiesSpawned++;
    updateWaveProgress();

    if (enemiesSpawned >= maxEnemiesPerWave) {
        enemiesSpawned = 0;
        wave++;
        updateWaveDisplay();
    }
}

function shoot(defender) {
    if (!defender.fireRate) return; // skip candygen and spikypumpkin

    const bullet = document.createElement('div');
    let bulletType = 'bullet';
    let damage = 1;

    if (defender.type === 'firepumpkin') { bulletType = 'fireball'; damage = 2; }
    else if (defender.type === 'icepumpkin') { bulletType = 'iceball'; damage = 1; }
    else if (defender.type === 'explosivepumpkin') { bulletType = 'bomb'; damage = 3; }
    else if (defender.type === 'sniperpumpkin') { bulletType = 'sniper'; damage = 5; }

    bullet.classList.add(bulletType);
    bullet.style.position = 'absolute';
    bullet.style.top = (defender.y + 40) + 'px';
    bullet.style.left = (defender.x + 80) + 'px';
    game.appendChild(bullet);

    bullets.push({
        el: bullet,
        x: defender.x + 80,
        y: defender.y + 40,
        damage: damage,
        slow: defender.type === 'icepumpkin',
        type: bulletType,
        aoe: defender.type === 'explosivepumpkin'
    });
}

setInterval(() => {
    defenders.forEach(d => shoot(d));
}, 1000);

function gameLoop() {
    bullets.forEach((b, bi) => {
        b.x += 5;
        b.el.style.left = b.x + 'px';

        enemies.forEach((e, ei) => {
            if (e.row === Math.floor(b.y / 100) && b.x > e.x && b.x < e.x + 80) {
                if (e.type === 'bat' && b.type === 'bullet') return;
                e.hp -= b.damage;
                if (b.slow) e.speed *= 0.5;

                if (b.aoe) {
                    enemies.forEach(e2 => {
                        if (Math.abs(e2.x - e.x) < 50 && e2.row === e.row) {
                            e2.hp -= b.damage;
                        }
                    });
                }

                b.el.remove();
                bullets.splice(bi, 1);
                if (e.hp <= 0) {
                    e.el.remove();
                    enemies.splice(ei, 1);
                    candy += 20;
                    candyDisplay.textContent = candy;
                }
            }
        });

        if (b.x > 950) {
            b.el.remove();
            bullets.splice(bi, 1);
        }
    });

    enemies.forEach(e => {
        e.x -= e.speed;
        e.el.style.left = e.x + 'px';

        if (e.type === 'boss') {
            showBossHP(e.hp, 50);
        }

        // Spiky Pumpkin damage
        defenders.forEach(d => {
            if (d.type === 'spikypumpkin' && e.row === d.row && e.x < d.x + 80 && e.x > d.x) {
                e.hp -= 10;
            }
        });

        if (e.x < 0) {
            alert("💀 The vines and ghosts took your patch!");
            window.location.reload();
        }
    });

    requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 2500);
gameLoop();
//  FUNCTIONS  //
function randomRange(x1, x2) {
    return Math.random()*(x2-x1)+x1;
}

function createNewParticle() {
    return new Particle(
        randomRange(0, canvas.width),
        canvas.height,
        randomRange(-5, 5),
        randomRange(-10, -5),
        randomRange(1, 4),
        `hsl(0, ${randomRange(80, 100)}%, ${randomRange(30, 70)}%)`,
    );
}

function initalizeStuff() {
    initalizeCanvas();
}
let played = false;
function attemptMusicPreload() {
    if (!played) {
        audio.play().then(() => {
            played = true;
            document.removeEventListener('click', attemptMusicPreload);
            const buttonToggleMusic = document.getElementById("bToggleMusic");
            if (buttonToggleMusic) {
                 buttonToggleMusic.textContent = "Pause Music";
            }
        }).catch(error => {
            console.log("attempted to play music.. blocked :p\nerror: ", error);
        });
    }
}

window.addEventListener('load', () => {
    document.addEventListener('click', attemptMusicPreload);
});

//  MUSIC  // 
const buttonToggleMusic = document.getElementById("bToggleMusic");
const buttonIdiot = document.getElementById("bYouAreAnIdiot");
const audio = document.getElementById('music');

if (buttonToggleMusic) { //does the button exist? if so, allow playing
    buttonToggleMusic.textContent = "Play Music"; 
}

if (buttonToggleMusic) {
    buttonToggleMusic.addEventListener("click", function(){
        if (audio.paused) {
            audio.play();
            buttonToggleMusic.textContent = "Pause Music";
        } else {
            audio.pause();
            buttonToggleMusic.textContent = "Play Music";
        }
    });
}
if (buttonIdiot) {
    buttonIdiot.addEventListener("click", function(){
        window.location = "idiot.html";
    });
}

//  JUMPSCARE!!  //
const buttonJumpscare = document.getElementById("bSpookyMode");
const jumpscareDiv = document.getElementById("jumpscare");
const jumpscarePic = document.getElementById("jumpscareImg");
const jumpscareAudio = document.getElementById('jumpscareAudio');
let jsScale = 1.0;
let jumpscaring = false;
let scaleInterval = null;

if (buttonJumpscare) {
    buttonJumpscare.addEventListener("click", function() {
        if (jumpscaring) {
            return; //if it's already active
        }
        jsScale = 1.0;
        jumpscaring = true;
        jumpscareAudio.play();
        jumpscareDiv.classList.remove('hidden');
        jumpscareDiv.classList.add('jumpscare-center');
        
        scaleInterval = setInterval(function() {
            if (jsScale < 5.0) {
                 jsScale *= 1.5; 
                 jumpscarePic.style.transform = `scale(${jsScale})`;
            } else {
                clearInterval(scaleInterval); 
            }
        }, 50);

        setTimeout(function() {
            clearInterval(scaleInterval); 
            
            //reset
            jumpscarePic.style.transform = 'scale(1.0)';
            jumpscareDiv.classList.add('hidden');
            jumpscareDiv.classList.remove('jumpscare-center');
            jumpscaring = false;
        }, 3200);
    });
}

//  CANVAS  //

class Particle {
    constructor(x, y, hspeed, vspeed, size, color) {
        this.x = x;
        this.y = y;
        this.hspeed = hspeed;
        this.vspeed = vspeed;
        this.size = size;
        this.color = color;
    }

    update() {
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.vspeed += 0.005;
        this.hspeed *= 0.9999;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }
}

const canvas = document.getElementById("canvasBG");

if (!canvas) {
     alert("Canvas element (background) not found?!");
} else if (!canvas.getContext) {
    //browser doesn't support canvas :(
    alert("Your browser doesn't support JavaScript Canvas!");
}

const ctx = canvas ? canvas.getContext("2d") : null;
const MAX_PARTICLES = 100;
let particles = [];

function initalizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(createNewParticle()); 
    }
    drawParticles();
}

function drawParticles() {
    if (!ctx) return; //again, if canvas isn't supported, return & don't draw
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        
        // are we off the screen? if so, destroy & replace
        if (p.y > canvas.height + 10 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
            particles.splice(i, 1, createNewParticle()); 
        }
    }
    requestAnimationFrame(drawParticles);
    
}

window.onload = initalizeStuff;
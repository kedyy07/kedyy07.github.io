// --- CUSTOM CURSOR LOGIC ---
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
const hoverTargets = document.querySelectorAll(".hover-target");

// Variables for smooth outline physics
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// Animate the outline with Lerp (Linear Interpolation)
function animateCursor() {
    let ease = 0.15; // Lower number = heavier delay
    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover states for links and buttons
hoverTargets.forEach(target => {
    target.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("hover-active");
    });
    target.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("hover-active");
    });
});


// --- INTERACTIVE NETWORK BACKGROUND ---
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (repel slightly)
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 204, 0.5)";
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateNetwork() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw and update particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 204, ${1 - distance/120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateNetwork);
}
animateNetwork();
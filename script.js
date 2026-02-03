// Confetti animation
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createConfetti(x, y) {
        const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff6bcf', '#ffd700', '#ff69b4', '#87ceeb'];
        
        for (let i = 0; i < 100; i++) {
            const randomX = Math.random() * this.canvas.width;
            const randomY = Math.random() * this.canvas.height;
            
            this.particles.push({
                x: randomX,
                y: randomY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 15 - 5,
                size: Math.random() * 20 + 15,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: Math.random() * 0.015 + 0.01
            });
        }
    }
    
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const p of this.particles) {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            
            // Draw squares
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((1 - p.life) * Math.PI * 4);
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.update();
        this.draw();
        
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

// Initialize confetti
const canvas = document.getElementById('confetti-canvas');
const confetti = new Confetti(canvas);

// Button handlers
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const wrongMessage = document.getElementById('wrongMessage');

yesBtn.addEventListener('click', () => {
    // Hide main container and show celebration
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('celebrationContainer').style.display = 'flex';
    
    // Start confetti
    confetti.createConfetti();
    confetti.animate();
    
    // Load dancing raccoon gif from Tenor
    const gifUrl = 'https://media1.tenor.com/m/tCL3HGcaV4UAAAAd/raccoon-dance.gif';
    document.getElementById('celebrationGif').src = gifUrl;
});

noBtn.addEventListener('click', () => {
    wrongMessage.style.display = 'block';
    wrongMessage.offsetHeight; // Trigger reflow
    wrongMessage.style.animation = 'none';
    setTimeout(() => {
        wrongMessage.style.animation = 'wrongFlash 0.6s ease-in-out forwards';
    }, 10);
});

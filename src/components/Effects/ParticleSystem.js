class Particle {
    constructor(x, y, config = {}) {
      this.x = x;
      this.y = y;
      this.vx = config.vx || (Math.random() - 0.5) * 200;
      this.vy = config.vy || -Math.random() * 300 - 100;
      this.radius = config.radius || Math.random() * 3 + 1;
      this.color = config.color || '#60a5fa';
      this.life = config.life || 1;
      this.maxLife = this.life;
      this.gravity = config.gravity !== undefined ? config.gravity : 500;
      this.fade = config.fade !== undefined ? config.fade : true;
      this.shrink = config.shrink !== undefined ? config.shrink : true;
    }
  
    update(deltaTime) {
      // Apply physics
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
      this.vy += this.gravity * deltaTime;
      
      // Update life
      this.life -= deltaTime;
      
      // Apply drag
      this.vx *= 0.98;
      
      return this.life > 0;
    }
  
    render(ctx) {
      const lifeRatio = this.life / this.maxLife;
      
      ctx.save();
      
      // Apply fade effect
      if (this.fade) {
        ctx.globalAlpha = lifeRatio;
      }
      
      // Draw particle
      const radius = this.shrink ? this.radius * lifeRatio : this.radius;
      
      // Add glow effect
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius * 2);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, this.color + '00');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(this.x - radius * 2, this.y - radius * 2, radius * 4, radius * 4);
      
      // Draw core
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      ctx.restore();
    }
  }
  
  class ParticleSystem {
    constructor() {
      this.particles = [];
      this.emitters = [];
    }
  
    addParticle(particle) {
      this.particles.push(particle);
    }
  
    createBurst(x, y, color, count = 10, config = {}) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 100 + Math.random() * 100;
        
        this.addParticle(new Particle(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0.5 + Math.random() * 0.5,
          gravity: 200,
          ...config
        }));
      }
    }
  
    createExplosion(x, y, config = {}) {
      const {
        count = 30,
        colors = ['#ff6b6b', '#ffd93d', '#ff8c00'],
        minSpeed = 50,
        maxSpeed = 300,
        life = 1,
        gravity = 300
      } = config;
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        this.addParticle(new Particle(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: life * (0.5 + Math.random() * 0.5),
          gravity,
          radius: Math.random() * 4 + 2
        }));
      }
    }
  
    createTrail(x, y, config = {}) {
      const {
        color = '#60a5fa',
        count = 3,
        spread = 10,
        life = 0.5
      } = config;
      
      for (let i = 0; i < count; i++) {
        this.addParticle(new Particle(
          x + (Math.random() - 0.5) * spread,
          y + (Math.random() - 0.5) * spread,
          {
            vx: (Math.random() - 0.5) * 50,
            vy: Math.random() * 50,
            color,
            life,
            radius: Math.random() * 2 + 1,
            gravity: -50, // Float upward
            fade: true,
            shrink: true
          }
        ));
      }
    }
  
    createSparkle(x, y, config = {}) {
      const {
        color = '#ffd700',
        count = 5,
        spread = 30
      } = config;
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const distance = Math.random() * spread;
        
        this.addParticle(new Particle(
          x + Math.cos(angle) * distance,
          y + Math.sin(angle) * distance,
          {
            vx: 0,
            vy: -20,
            color,
            life: 0.6,
            radius: 2,
            gravity: 0,
            fade: true,
            shrink: false
          }
        ));
      }
    }
  
    createEmitter(config) {
      const emitter = {
        x: config.x,
        y: config.y,
        rate: config.rate || 10, // particles per second
        particleConfig: config.particleConfig || {},
        active: true,
        timer: 0,
        duration: config.duration || Infinity,
        elapsed: 0
      };
      
      this.emitters.push(emitter);
      return emitter;
    }
  
    removeEmitter(emitter) {
      const index = this.emitters.indexOf(emitter);
      if (index > -1) {
        this.emitters.splice(index, 1);
      }
    }
  
    update(deltaTime) {
      // Update particles
      this.particles = this.particles.filter(particle => particle.update(deltaTime));
      
      // Update emitters
      this.emitters = this.emitters.filter(emitter => {
        if (!emitter.active) return false;
        
        emitter.elapsed += deltaTime;
        if (emitter.elapsed >= emitter.duration) {
          return false;
        }
        
        emitter.timer += deltaTime;
        const particlesToCreate = Math.floor(emitter.timer * emitter.rate);
        emitter.timer -= particlesToCreate / emitter.rate;
        
        for (let i = 0; i < particlesToCreate; i++) {
          this.addParticle(new Particle(emitter.x, emitter.y, emitter.particleConfig));
        }
        
        return true;
      });
    }
  
    render(ctx) {
      ctx.save();
      
      // Use additive blending for glow effect
      ctx.globalCompositeOperation = 'lighter';
      
      this.particles.forEach(particle => {
        particle.render(ctx);
      });
      
      ctx.restore();
    }
  
    clear() {
      this.particles = [];
      this.emitters = [];
    }
  
    getParticleCount() {
      return this.particles.length;
    }
  }
  
  export default ParticleSystem;
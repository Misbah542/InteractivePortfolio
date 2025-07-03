class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.speed = 300;
      this.radius = 20;
      this.direction = 'down';
      this.isMoving = false;
      this.animationTime = 0;
      this.footstepTimer = 0;
      this.trail = [];
      this.maxTrailLength = 10;
    }
  
    update(keys, deltaTime, worldWidth, worldHeight) {
      // Handle input
      let dx = 0;
      let dy = 0;
      
      if (keys['w'] || keys['arrowup']) {
        dy = -1;
        this.direction = 'up';
      }
      if (keys['s'] || keys['arrowdown']) {
        dy = 1;
        this.direction = 'down';
      }
      if (keys['a'] || keys['arrowleft']) {
        dx = -1;
        this.direction = 'left';
      }
      if (keys['d'] || keys['arrowright']) {
        dx = 1;
        this.direction = 'right';
      }
      
      // Normalize diagonal movement
      if (dx && dy) {
        dx *= 0.707;
        dy *= 0.707;
      }
      
      // Update velocity
      this.vx = dx * this.speed;
      this.vy = dy * this.speed;
      this.isMoving = dx !== 0 || dy !== 0;
      
      // Update position
      const prevX = this.x;
      const prevY = this.y;
      
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
      
      // Keep player in bounds
      this.x = Math.max(this.radius, Math.min(worldWidth - this.radius, this.x));
      this.y = Math.max(this.radius, Math.min(worldHeight - this.radius, this.y));
      
      // Update animation
      if (this.isMoving) {
        this.animationTime += deltaTime;
        this.footstepTimer += deltaTime;
        
        // Add to trail
        if (Math.abs(this.x - prevX) > 1 || Math.abs(this.y - prevY) > 1) {
          this.trail.push({ x: prevX, y: prevY, life: 1 });
          if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
          }
        }
      } else {
        this.animationTime = 0;
      }
      
      // Update trail
      this.trail.forEach(point => {
        point.life -= deltaTime * 2;
      });
      this.trail = this.trail.filter(point => point.life > 0);
    }
  
    render(ctx) {
      // Draw trail
      this.trail.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3 * point.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${point.life * 0.3})`;
        ctx.fill();
      });
      
      // Draw shadow
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + 25, 18, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#00000040';
      ctx.fill();
      
      // Draw player body with animation
      const bobOffset = this.isMoving ? Math.sin(this.animationTime * 10) * 2 : 0;
      const y = this.y + bobOffset;
      
      // Body gradient
      const gradient = ctx.createRadialGradient(this.x, y, 0, this.x, y, this.radius);
      gradient.addColorStop(0, '#93c5fd');
      gradient.addColorStop(1, '#3b82f6');
      
      ctx.beginPath();
      ctx.arc(this.x, y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw direction indicator (eyes)
      const eyeOffset = 8;
      let eyeX1, eyeY1, eyeX2, eyeY2;
      
      switch(this.direction) {
        case 'up':
          eyeX1 = this.x - 5;
          eyeY1 = y - eyeOffset;
          eyeX2 = this.x + 5;
          eyeY2 = y - eyeOffset;
          break;
        case 'down':
          eyeX1 = this.x - 5;
          eyeY1 = y + eyeOffset;
          eyeX2 = this.x + 5;
          eyeY2 = y + eyeOffset;
          break;
        case 'left':
          eyeX1 = this.x - eyeOffset;
          eyeY1 = y - 3;
          eyeX2 = this.x - eyeOffset;
          eyeY2 = y + 3;
          break;
        case 'right':
          eyeX1 = this.x + eyeOffset;
          eyeY1 = y - 3;
          eyeX2 = this.x + eyeOffset;
          eyeY2 = y + 3;
          break;
      }
      
      // Draw eyes
      ctx.beginPath();
      ctx.arc(eyeX1, eyeY1, 3, 0, Math.PI * 2);
      ctx.arc(eyeX2, eyeY2, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(eyeX1, eyeY1, 2, 0, Math.PI * 2);
      ctx.arc(eyeX2, eyeY2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      
      // Draw movement particles
      if (this.isMoving && Math.random() < 0.3) {
        ctx.beginPath();
        ctx.arc(
          this.x + (Math.random() - 0.5) * 30,
          this.y + 20 + Math.random() * 10,
          Math.random() * 2 + 1,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#60a5fa40';
        ctx.fill();
      }
    }
  }
  
  export default Player;
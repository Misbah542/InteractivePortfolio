class SpriteManager {
    constructor() {
      this.sprites = new Map();
      this.loaded = false;
      this.loadPromise = this.loadSprites();
    }
  
    async loadSprites() {
      // In a real implementation, you would load actual sprite images
      // For now, we'll use CSS-based sprites and emoji
      
      this.sprites.set('player', {
        type: 'css',
        className: 'sprite-player',
        frames: 4,
        width: 64,
        height: 64
      });
  
      this.sprites.set('zone-icons', {
        home: '🏠',
        tech: '🔧',
        experience: '💼',
        projects: '📱',
        education: '🎓',
        contact: '📡',
        secret: '🗝️'
      });
  
      this.sprites.set('skill-icons', {
        kotlin: '🔥',
        java: '☕',
        compose: '🎨',
        android: '📱',
        architecture: '🏗️',
        async: '🔄',
        database: '💾',
        network: '🌐',
        testing: '🧪',
        tools: '🔧'
      });
  
      this.sprites.set('interactive-icons', {
        about: '👤',
        skills: '⚡',
        timeline: '📅',
        achievements: '🏆',
        project: '🚀',
        education: '🎓',
        contact: '✉️',
        download: '📄',
        terminal: '💻',
        easter: '🥚'
      });
  
      this.loaded = true;
      return true;
    }
  
    getSprite(name) {
      return this.sprites.get(name);
    }
  
    drawSprite(ctx, spriteName, x, y, frame = 0, scale = 1) {
      const sprite = this.sprites.get(spriteName);
      if (!sprite) return;
  
      if (sprite.type === 'css') {
        // For CSS sprites, we'll draw a placeholder
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(
          x - (sprite.width * scale) / 2,
          y - (sprite.height * scale) / 2,
          sprite.width * scale,
          sprite.height * scale
        );
      } else if (typeof sprite === 'string') {
        // Emoji sprite
        ctx.font = `${32 * scale}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sprite, x, y);
      }
    }
  
    createSpriteAnimation(spriteName, x, y, options = {}) {
      const sprite = this.sprites.get(spriteName);
      if (!sprite || sprite.type !== 'css') return null;
  
      return {
        sprite,
        x,
        y,
        currentFrame: 0,
        frameTime: 0,
        frameDuration: options.frameDuration || 100,
        loop: options.loop !== false,
        scale: options.scale || 1,
        rotation: 0,
        opacity: 1,
        
        update(deltaTime) {
          this.frameTime += deltaTime;
          if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.currentFrame++;
            
            if (this.currentFrame >= sprite.frames) {
              if (this.loop) {
                this.currentFrame = 0;
              } else {
                this.currentFrame = sprite.frames - 1;
              }
            }
          }
        },
        
        render(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.globalAlpha = this.opacity;
          
          // Draw sprite frame
          const frameX = this.currentFrame * sprite.width;
          ctx.drawImage(
            sprite.image,
            frameX, 0, sprite.width, sprite.height,
            -sprite.width * this.scale / 2,
            -sprite.height * this.scale / 2,
            sprite.width * this.scale,
            sprite.height * this.scale
          );
          
          ctx.restore();
        }
      };
    }
  
    // CSS Sprite Helper
    generateCSSSprite(name, width, height, frames, color = '#60a5fa') {
      const canvas = document.createElement('canvas');
      canvas.width = width * frames;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
  
      for (let i = 0; i < frames; i++) {
        const x = i * width;
        
        // Draw a simple animated character
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x + width / 2, height / 2, width / 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Add animation variation
        const offset = Math.sin((i / frames) * Math.PI * 2) * 5;
        ctx.fillRect(x + width / 2 - 2, height / 2 + offset, 4, 10);
      }
  
      return canvas.toDataURL();
    }
  
    // Particle sprite generator
    createParticleSprite(size, color) {
      const canvas = document.createElement('canvas');
      canvas.width = size * 2;
      canvas.height = size * 2;
      const ctx = canvas.getContext('2d');
  
      const gradient = ctx.createRadialGradient(size, size, 0, size, size, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '00');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size * 2, size * 2);
  
      return canvas;
    }
  
    // Create sprite sheet from emojis
    createEmojiSpriteSheet(emojis, size = 64) {
      const canvas = document.createElement('canvas');
      canvas.width = size * emojis.length;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
  
      ctx.font = `${size * 0.8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      emojis.forEach((emoji, index) => {
        ctx.fillText(emoji, index * size + size / 2, size / 2);
      });
  
      return canvas;
    }
  }
  
  // Singleton instance
  const spriteManager = new SpriteManager();
  export default spriteManager;
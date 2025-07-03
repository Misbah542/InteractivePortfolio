// Animation utilities and effects
import { lerp, easeInOut, easeOut } from '../../utils/helpers';

// Animation class for managing tween animations
class Animation {
  constructor(target, properties, duration, options = {}) {
    this.target = target;
    this.properties = properties;
    this.duration = duration;
    this.elapsed = 0;
    this.startValues = {};
    this.endValues = {};
    this.easing = options.easing || easeInOut;
    this.onComplete = options.onComplete;
    this.onUpdate = options.onUpdate;
    this.loop = options.loop || false;
    this.yoyo = options.yoyo || false;
    this.delay = options.delay || 0;
    this.delayElapsed = 0;
    this.direction = 1;
    this.isComplete = false;
    
    // Store initial values
    for (const prop in properties) {
      this.startValues[prop] = target[prop];
      this.endValues[prop] = properties[prop];
    }
  }
  
  update(deltaTime) {
    if (this.isComplete) return true;
    
    // Handle delay
    if (this.delayElapsed < this.delay) {
      this.delayElapsed += deltaTime;
      return false;
    }
    
    this.elapsed += deltaTime * this.direction;
    
    const progress = Math.min(this.elapsed / this.duration, 1);
    const easedProgress = this.easing(progress);
    
    // Update properties
    for (const prop in this.properties) {
      this.target[prop] = lerp(this.startValues[prop], this.endValues[prop], easedProgress);
    }
    
    if (this.onUpdate) {
      this.onUpdate(this.target, progress);
    }
    
    // Check completion
    if (progress >= 1) {
      if (this.yoyo) {
        this.direction *= -1;
        this.elapsed = 0;
        // Swap start and end values
        const temp = this.startValues;
        this.startValues = this.endValues;
        this.endValues = temp;
      } else if (this.loop) {
        this.elapsed = 0;
      } else {
        this.isComplete = true;
        if (this.onComplete) {
          this.onComplete(this.target);
        }
        return true;
      }
    }
    
    return false;
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.animations = [];
  }
  
  add(animation) {
    this.animations.push(animation);
    return animation;
  }
  
  create(target, properties, duration, options) {
    const animation = new Animation(target, properties, duration, options);
    this.add(animation);
    return animation;
  }
  
  update(deltaTime) {
    this.animations = this.animations.filter(animation => {
      return !animation.update(deltaTime);
    });
  }
  
  clear() {
    this.animations = [];
  }
  
  remove(animation) {
    const index = this.animations.indexOf(animation);
    if (index > -1) {
      this.animations.splice(index, 1);
    }
  }
}

// Predefined animations
export const animations = {
  // Floating animation for objects
  float: (object, amplitude = 10, frequency = 0.001) => {
    return {
      update: (time) => {
        object.floatOffset = Math.sin(time * frequency) * amplitude;
      }
    };
  },
  
  // Pulse animation
  pulse: (object, minScale = 0.9, maxScale = 1.1, speed = 0.002) => {
    return {
      update: (time) => {
        const scale = minScale + (maxScale - minScale) * (Math.sin(time * speed) * 0.5 + 0.5);
        object.scale = scale;
      }
    };
  },
  
  // Rotation animation
  rotate: (object, speed = 0.001) => {
    return {
      update: (time) => {
        object.rotation = (time * speed) % (Math.PI * 2);
      }
    };
  },
  
  // Bob animation for walking
  bob: (object, speed = 10, amplitude = 2) => {
    return {
      update: (time) => {
        object.bobOffset = Math.sin(time * speed) * amplitude;
      }
    };
  },
  
  // Glow effect
  glow: (object, minOpacity = 0.5, maxOpacity = 1, speed = 0.002) => {
    return {
      update: (time) => {
        object.glowOpacity = minOpacity + (maxOpacity - minOpacity) * (Math.sin(time * speed) * 0.5 + 0.5);
      }
    };
  },
  
  // Shake animation
  shake: (object, intensity = 5, duration = 500) => {
    let elapsed = 0;
    const originalX = object.x;
    const originalY = object.y;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        if (elapsed < duration) {
          object.x = originalX + (Math.random() - 0.5) * intensity;
          object.y = originalY + (Math.random() - 0.5) * intensity;
        } else {
          object.x = originalX;
          object.y = originalY;
          return true; // Animation complete
        }
      }
    };
  },
  
  // Bounce animation
  bounce: (object, height = 50, duration = 1000) => {
    let elapsed = 0;
    const originalY = object.y;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          // Bounce equation
          const bounce = Math.abs(Math.sin(progress * Math.PI * 3)) * (1 - progress);
          object.y = originalY - bounce * height;
        } else {
          object.y = originalY;
          return true; // Animation complete
        }
      }
    };
  },
  
  // Fade in/out
  fade: (object, startOpacity, endOpacity, duration = 1000) => {
    let elapsed = 0;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        const progress = Math.min(elapsed / duration, 1);
        object.opacity = lerp(startOpacity, endOpacity, easeOut(progress));
        
        if (progress >= 1) {
          return true; // Animation complete
        }
      }
    };
  },
  
  // Scale animation
  scale: (object, startScale, endScale, duration = 500) => {
    let elapsed = 0;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        const progress = Math.min(elapsed / duration, 1);
        object.scale = lerp(startScale, endScale, easeOut(progress));
        
        if (progress >= 1) {
          return true; // Animation complete
        }
      }
    };
  },
  
  // Path following animation
  followPath: (object, path, duration = 5000, loop = true) => {
    let elapsed = 0;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        let progress = (elapsed / duration) % 1;
        
        if (!loop && elapsed >= duration) {
          progress = 1;
        }
        
        const index = Math.floor(progress * (path.length - 1));
        const localProgress = (progress * (path.length - 1)) % 1;
        
        if (index < path.length - 1) {
          object.x = lerp(path[index].x, path[index + 1].x, localProgress);
          object.y = lerp(path[index].y, path[index + 1].y, localProgress);
        }
        
        if (!loop && progress >= 1) {
          return true; // Animation complete
        }
      }
    };
  },
  
  // Typewriter effect for text
  typewriter: (textObject, fullText, speed = 50) => {
    let currentIndex = 0;
    let elapsed = 0;
    
    return {
      update: (time, deltaTime) => {
        elapsed += deltaTime;
        
        if (elapsed >= speed) {
          elapsed = 0;
          currentIndex++;
          textObject.text = fullText.substring(0, currentIndex);
          
          if (currentIndex >= fullText.length) {
            return true; // Animation complete
          }
        }
      }
    };
  }
};

// Sprite Animation class
export class SpriteAnimation {
  constructor(frames, frameDuration = 100, loop = true) {
    this.frames = frames;
    this.frameDuration = frameDuration;
    this.loop = loop;
    this.currentFrame = 0;
    this.elapsed = 0;
    this.isComplete = false;
  }
  
  update(deltaTime) {
    if (this.isComplete) return;
    
    this.elapsed += deltaTime;
    
    if (this.elapsed >= this.frameDuration) {
      this.elapsed = 0;
      this.currentFrame++;
      
      if (this.currentFrame >= this.frames.length) {
        if (this.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = this.frames.length - 1;
          this.isComplete = true;
        }
      }
    }
  }
  
  getCurrentFrame() {
    return this.frames[this.currentFrame];
  }
  
  reset() {
    this.currentFrame = 0;
    this.elapsed = 0;
    this.isComplete = false;
  }
}

// Visual Effects
export const effects = {
  // Screen shake effect
  screenShake: (camera, intensity = 10, duration = 500) => {
    const originalX = camera.x;
    const originalY = camera.y;
    let elapsed = 0;
    
    return {
      update: (deltaTime) => {
        elapsed += deltaTime;
        
        if (elapsed < duration) {
          const progress = 1 - (elapsed / duration);
          camera.x = originalX + (Math.random() - 0.5) * intensity * progress;
          camera.y = originalY + (Math.random() - 0.5) * intensity * progress;
        } else {
          camera.x = originalX;
          camera.y = originalY;
          return true;
        }
      }
    };
  },
  
  // Flash effect
  flash: (ctx, color = '#ffffff', duration = 200) => {
    let elapsed = 0;
    
    return {
      render: (deltaTime) => {
        elapsed += deltaTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          ctx.save();
          ctx.fillStyle = color;
          ctx.globalAlpha = 1 - progress;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.restore();
        } else {
          return true;
        }
      }
    };
  },
  
  // Ripple effect
  ripple: (x, y, maxRadius = 100, duration = 1000, color = '#60a5fa') => {
    let elapsed = 0;
    
    return {
      render: (ctx, deltaTime) => {
        elapsed += deltaTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          const radius = maxRadius * progress;
          const opacity = 1 - progress;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        } else {
          return true;
        }
      }
    };
  }
};

// Export singleton animation manager
export const animationManager = new AnimationManager();

// Export Animation class for custom animations
export { Animation };
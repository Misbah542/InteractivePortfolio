import Player from './Player';
import { zones } from './Zones';
import { interactables } from './Interactables';
import ParticleSystem from './Effects/ParticleSystem';
import { WORLD_WIDTH, WORLD_HEIGHT, GRID_SIZE } from '../utils/constants';

class GameEngine {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Game state
    this.camera = { x: 0, y: 0 };
    this.worldWidth = WORLD_WIDTH;
    this.worldHeight = WORLD_HEIGHT;
    this.currentZone = null;
    
    // Game objects
    this.player = new Player(250, 250);
    this.zones = zones;
    this.interactables = interactables;
    this.particleSystem = new ParticleSystem();
    
    // Input state
    this.keys = {};
    this.mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };
    
    // Animation
    this.animationId = null;
    this.lastTime = 0;
    this.deltaTime = 0;
    
    // Setup
    this.setupEventListeners();
    this.audioManager = config.audioManager;
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  setupEventListeners() {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      
      // Prevent arrow key scrolling
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse controls
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.worldX = this.mouse.x + this.camera.x;
      this.mouse.worldY = this.mouse.y + this.camera.y;
    });

    this.canvas.addEventListener('click', (e) => {
      this.handleClick();
    });

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      
      // Convert to mouse click for interaction
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
      this.mouse.worldX = this.mouse.x + this.camera.x;
      this.mouse.worldY = this.mouse.y + this.camera.y;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      
      // Convert touch movement to keyboard input
      this.keys = {};
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 20) this.keys['d'] = true;
        else if (deltaX < -20) this.keys['a'] = true;
      } else {
        if (deltaY > 20) this.keys['s'] = true;
        else if (deltaY < -20) this.keys['w'] = true;
      }
    });

    this.canvas.addEventListener('touchend', (e) => {
      this.keys = {};
      // Check for tap (interaction)
      const touchDuration = e.timeStamp - e.target.touchStartTime;
      if (touchDuration < 200) {
        this.handleClick();
      }
    });
  }

  handleClick() {
    // Check interactables
    for (const item of this.interactables) {
      const dist = Math.sqrt(
        (this.mouse.worldX - item.x) ** 2 + 
        (this.mouse.worldY - item.y) ** 2
      );
      
      if (dist < 50 && item.inRange) {
        // Create particles at interaction point
        this.particleSystem.createBurst(item.x, item.y, item.color, 15);
        
        // Play sound
        if (this.audioManager) {
          this.audioManager.playSound('interact');
        }
        
        // Trigger interaction
        if (this.config.onInteract) {
          this.config.onInteract(item.type, item.data);
        }
        
        break;
      }
    }
  }

  update(currentTime) {
    // Calculate delta time
    if (this.lastTime === 0) this.lastTime = currentTime;
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Limit delta time to prevent large jumps
    this.deltaTime = Math.min(this.deltaTime, 0.1);

    // Update player
    this.player.update(this.keys, this.deltaTime, this.worldWidth, this.worldHeight);

    // Update camera to follow player
    const targetCameraX = this.player.x - this.width / 2;
    const targetCameraY = this.player.y - this.height / 2;
    
    // Smooth camera movement
    this.camera.x += (targetCameraX - this.camera.x) * 0.1;
    this.camera.y += (targetCameraY - this.camera.y) * 0.1;
    
    // Keep camera in bounds
    this.camera.x = Math.max(0, Math.min(this.camera.x, this.worldWidth - this.width));
    this.camera.y = Math.max(0, Math.min(this.camera.y, this.worldHeight - this.height));

    // Check current zone
    const newZone = this.zones.find(zone => 
      this.player.x >= zone.x && 
      this.player.x <= zone.x + zone.width &&
      this.player.y >= zone.y && 
      this.player.y <= zone.y + zone.height
    );

    if (newZone && newZone !== this.currentZone) {
      this.currentZone = newZone;
      if (this.config.onZoneChange) {
        this.config.onZoneChange(newZone.name);
      }
    }

    // Update interactables
    this.interactables.forEach(item => {
      const dist = Math.sqrt(
        (this.player.x - item.x) ** 2 + 
        (this.player.y - item.y) ** 2
      );
      item.inRange = dist < 100;
      
      // Add floating animation
      item.floatOffset = Math.sin(currentTime * 0.001 + item.x) * 5;
    });

    // Update particles
    this.particleSystem.update(this.deltaTime);
  }

  render() {

    const ctx = this.ctx;
  if (!ctx) return;

  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "white";
  ctx.font = "24px monospace";
  ctx.fillText("Hello Android Dev World!", 100, 100);
    console.log("🖼️ Rendering frame");
    // Clear canvas
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Save context
    this.ctx.save();
    
    // Apply camera transform
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Draw grid
    this.drawGrid();

    // Draw zones
    this.zones.forEach(zone => this.drawZone(zone));

    // Draw interactables
    this.interactables.forEach(item => this.drawInteractable(item));

    // Draw particles
    this.particleSystem.render(this.ctx);

    // Draw player
    this.player.render(this.ctx);

    // Restore context
    this.ctx.restore();

    // Draw UI elements (not affected by camera)
    this.drawMinimap();
  }

  drawGrid() {
    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 1;
    this.ctx.globalAlpha = 0.3;
    
    // Vertical lines
    for (let x = 0; x < this.worldWidth; x += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.worldHeight);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < this.worldHeight; y += GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.worldWidth, y);
      this.ctx.stroke();
    }
    
    this.ctx.globalAlpha = 1;
  }

  drawZone(zone) {
    // Zone background
    this.ctx.fillStyle = zone.color + '15';
    this.ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
    
    // Zone border
    this.ctx.strokeStyle = zone.color;
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([10, 5]);
    this.ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
    this.ctx.setLineDash([]);
    
    // Zone label
    this.ctx.save();
    this.ctx.fillStyle = zone.color;
    this.ctx.font = 'bold 28px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 20);
    
    // Zone icon
    this.ctx.font = '48px serif';
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillText(zone.icon, zone.x + zone.width / 2, zone.y + zone.height / 2 - 24);
    this.ctx.restore();
  }

  drawInteractable(item) {
    const y = item.y + (item.floatOffset || 0);
    const isHovered = Math.sqrt(
      (this.mouse.worldX - item.x) ** 2 + 
      (this.mouse.worldY - y) ** 2
    ) < 40;
    
    // Draw glow if in range
    if (item.inRange) {
      this.ctx.save();
      const gradient = this.ctx.createRadialGradient(item.x, y, 20, item.x, y, 60);
      gradient.addColorStop(0, item.color + '40');
      gradient.addColorStop(1, item.color + '00');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(item.x - 60, y - 60, 120, 120);
      this.ctx.restore();
    }
    
    // Draw shadow
    this.ctx.beginPath();
    this.ctx.ellipse(item.x, item.y + 30, 25, 12, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00000030';
    this.ctx.fill();
    
    // Draw base
    this.ctx.beginPath();
    this.ctx.arc(item.x, y, 30, 0, Math.PI * 2);
    this.ctx.fillStyle = isHovered ? item.color : '#1e293b';
    this.ctx.fill();
    this.ctx.strokeStyle = item.color;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    // Draw icon
    this.ctx.fillStyle = isHovered ? '#ffffff' : item.color;
    this.ctx.font = '24px serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(item.icon, item.x, y);
    
    // Draw label if in range
    if (item.inRange) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 14px monospace';
      this.ctx.fillText(item.label, item.x, y + 50);
      
      // Draw "Press E" or "Click" hint
      this.ctx.font = '12px monospace';
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.fillText('[Click to interact]', item.x, y + 65);
    }
  }

  drawMinimap() {
    const mapWidth = 200;
    const mapHeight = 150;
    const mapX = this.width - mapWidth - 20;
    const mapY = 20;
    const mapScale = Math.min(mapWidth / this.worldWidth, mapHeight / this.worldHeight);
    
    // Background
    this.ctx.fillStyle = '#0f172a90';
    this.ctx.fillRect(mapX, mapY, mapWidth, mapHeight);
    this.ctx.strokeStyle = '#60a5fa';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(mapX, mapY, mapWidth, mapHeight);
    
    // Draw zones
    this.zones.forEach(zone => {
      this.ctx.fillStyle = zone.color + '40';
      this.ctx.fillRect(
        mapX + zone.x * mapScale,
        mapY + zone.y * mapScale,
        zone.width * mapScale,
        zone.height * mapScale
      );
    });

    this.zones = [{
      x: 100, y: 100, width: 300, height: 200,
      name: "Sample Zone",
      color: "#22d3ee",
      icon: "🧪"
    }];
    
    this.interactables = [{
      x: 200, y: 200,
      color: "#f472b6",
      label: "Test Button",
      icon: "🔘",
      type: "about",
      data: {}
    }];
    
    // Draw interactables
    this.interactables.forEach(item => {
      this.ctx.beginPath();
      this.ctx.arc(
        mapX + item.x * mapScale,
        mapY + item.y * mapScale,
        2,
        0,
        Math.PI * 2
      );
      this.ctx.fillStyle = item.color;
      this.ctx.fill();
    });
    
    // Draw player
    this.ctx.beginPath();
    this.ctx.arc(
      mapX + this.player.x * mapScale,
      mapY + this.player.y * mapScale,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = '#60a5fa';
    this.ctx.fill();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Draw viewport rectangle
    this.ctx.strokeStyle = '#ffffff40';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(
      mapX + this.camera.x * mapScale,
      mapY + this.camera.y * mapScale,
      this.width * mapScale,
      this.height * mapScale
    );
  }

  gameLoop(currentTime) {
    this.update(currentTime);
    this.render();
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  start() {
    console.log("🚀 Game loop started");
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

export default GameEngine;
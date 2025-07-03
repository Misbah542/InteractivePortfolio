import React, { useRef, useEffect } from 'react';
import { zones } from '../Zones';
import { interactables } from '../Interactables';

const Minimap = ({ playerPosition, cameraPosition, worldSize, viewportSize }) => {
  const canvasRef = useRef(null);
  const mapWidth = 200;
  const mapHeight = 150;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const scaleX = mapWidth / worldSize.width;
    const scaleY = mapHeight / worldSize.height;
    
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, mapWidth, mapHeight);
    
    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    
    for (let x = 0; x < mapWidth; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, mapHeight);
      ctx.stroke();
    }
    
    for (let y = 0; y < mapHeight; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(mapWidth, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    
    // Draw zones
    zones.forEach(zone => {
      // Zone area
      ctx.fillStyle = zone.color + '30';
      ctx.fillRect(
        zone.x * scaleX,
        zone.y * scaleY,
        zone.width * scaleX,
        zone.height * scaleY
      );
      
      // Zone border
      ctx.strokeStyle = zone.color + '60';
      ctx.lineWidth = 1;
      ctx.strokeRect(
        zone.x * scaleX,
        zone.y * scaleY,
        zone.width * scaleX,
        zone.height * scaleY
      );
      
      // Zone icon (if not hidden)
      if (!zone.hidden) {
        ctx.font = '10px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = zone.color;
        ctx.fillText(
          zone.icon,
          zone.x * scaleX + (zone.width * scaleX) / 2,
          zone.y * scaleY + (zone.height * scaleY) / 2
        );
      }
    });
    
    // Draw interactables
    interactables.forEach(item => {
      ctx.beginPath();
      ctx.arc(
        item.x * scaleX,
        item.y * scaleY,
        2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = item.color + '80';
      ctx.fill();
    });
    
    // Draw viewport rectangle
    if (cameraPosition && viewportSize) {
      ctx.strokeStyle = '#ffffff40';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 3]);
      ctx.strokeRect(
        cameraPosition.x * scaleX,
        cameraPosition.y * scaleY,
        viewportSize.width * scaleX,
        viewportSize.height * scaleY
      );
      ctx.setLineDash([]);
    }
    
    // Draw player with pulsing effect
    if (playerPosition) {
      const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      
      // Player glow
      const gradient = ctx.createRadialGradient(
        playerPosition.x * scaleX,
        playerPosition.y * scaleY,
        0,
        playerPosition.x * scaleX,
        playerPosition.y * scaleY,
        8 * pulse
      );
      gradient.addColorStop(0, '#60a5fa60');
      gradient.addColorStop(1, '#60a5fa00');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        playerPosition.x * scaleX,
        playerPosition.y * scaleY,
        8 * pulse,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Player dot
      ctx.beginPath();
      ctx.arc(
        playerPosition.x * scaleX,
        playerPosition.y * scaleY,
        3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = '#60a5fa';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
  }, [playerPosition, cameraPosition, worldSize, viewportSize]);
  
  return (
    <div className="absolute bottom-4 right-4 pointer-events-auto">
      <div className="bg-gray-900/90 rounded-lg p-2 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-between mb-1 px-1">
          <h4 className="text-xs font-semibold text-gray-400">World Map</h4>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">You</span>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={mapWidth}
          height={mapHeight}
          className="rounded border border-blue-400/50"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="mt-1 text-center">
          <p className="text-xs text-gray-500">
            Explore all zones!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Minimap;
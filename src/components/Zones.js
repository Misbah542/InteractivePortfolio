export const zones = [
    {
      id: 'home',
      name: 'Home Base',
      x: 100,
      y: 100,
      width: 500,
      height: 400,
      color: '#60a5fa',
      icon: '🏠',
      description: 'Welcome to my developer world! Start your journey here.',
      bgPattern: 'dots'
    },
    {
      id: 'tech',
      name: 'Tech Lab',
      x: 700,
      y: 100,
      width: 550,
      height: 400,
      color: '#a78bfa',
      icon: '🔧',
      description: 'Explore my technical skills and tools.',
      bgPattern: 'circuit'
    },
    {
      id: 'experience',
      name: 'Experience Grounds',
      x: 1350,
      y: 100,
      width: 600,
      height: 400,
      color: '#f59e0b',
      icon: '💼',
      description: 'Journey through my professional experience.',
      bgPattern: 'grid'
    },
    {
      id: 'projects',
      name: 'Project Plaza',
      x: 100,
      y: 600,
      width: 800,
      height: 500,
      color: '#10b981',
      icon: '📱',
      description: 'Discover the Android apps I\'ve built.',
      bgPattern: 'hexagon'
    },
    {
      id: 'education',
      name: 'Learning Tower',
      x: 1000,
      y: 600,
      width: 400,
      height: 500,
      color: '#ec4899',
      icon: '🎓',
      description: 'My educational journey and certifications.',
      bgPattern: 'books'
    },
    {
      id: 'contact',
      name: 'Contact Terminal',
      x: 1500,
      y: 600,
      width: 500,
      height: 500,
      color: '#06b6d4',
      icon: '📡',
      description: 'Connect with me through various channels.',
      bgPattern: 'waves'
    },
    {
      id: 'secret',
      name: 'Secret Cave',
      x: 2100,
      y: 300,
      width: 350,
      height: 350,
      color: '#8b5cf6',
      icon: '🗝️',
      description: 'You found the hidden area! Discover easter eggs and fun facts.',
      bgPattern: 'stars',
      hidden: true
    }
  ];
  
  // Zone utility functions
  export const getZoneById = (id) => zones.find(zone => zone.id === id);
  
  export const getZoneAtPosition = (x, y) => {
    return zones.find(zone => 
      x >= zone.x && 
      x <= zone.x + zone.width &&
      y >= zone.y && 
      y <= zone.y + zone.height
    );
  };
  
  export const drawZonePattern = (ctx, zone) => {
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = zone.color;
    
    switch(zone.bgPattern) {
      case 'dots':
        for (let x = zone.x; x < zone.x + zone.width; x += 30) {
          for (let y = zone.y; y < zone.y + zone.height; y += 30) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
        
      case 'circuit':
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = 1;
        for (let x = zone.x; x < zone.x + zone.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, zone.y);
          ctx.lineTo(x, zone.y + zone.height);
          ctx.stroke();
        }
        for (let y = zone.y; y < zone.y + zone.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(zone.x, y);
          ctx.lineTo(zone.x + zone.width, y);
          ctx.stroke();
        }
        break;
        
      case 'grid':
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = 0.5;
        for (let x = zone.x; x < zone.x + zone.width; x += 20) {
          for (let y = zone.y; y < zone.y + zone.height; y += 20) {
            ctx.strokeRect(x, y, 20, 20);
          }
        }
        break;
        
      case 'hexagon':
        const hexSize = 20;
        for (let x = zone.x; x < zone.x + zone.width; x += hexSize * 3) {
          for (let y = zone.y; y < zone.y + zone.height; y += hexSize * 2) {
            drawHexagon(ctx, x + (y % (hexSize * 4) === 0 ? 0 : hexSize * 1.5), y, hexSize);
          }
        }
        break;
        
      case 'waves':
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = 2;
        for (let y = zone.y; y < zone.y + zone.height; y += 30) {
          ctx.beginPath();
          for (let x = zone.x; x < zone.x + zone.width; x += 10) {
            const waveY = y + Math.sin(x * 0.05) * 10;
            ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }
        break;
        
      case 'stars':
        for (let i = 0; i < 50; i++) {
          const x = zone.x + Math.random() * zone.width;
          const y = zone.y + Math.random() * zone.height;
          const size = Math.random() * 3 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'books':
        ctx.fillStyle = zone.color;
        for (let x = zone.x; x < zone.x + zone.width; x += 35) {
          for (let y = zone.y; y < zone.y + zone.height; y += 50) {
            ctx.fillRect(x, y, 25, 40);
            ctx.strokeRect(x, y, 25, 40);
          }
        }
        break;
    }
    
    ctx.restore();
  };
  
  function drawHexagon(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hx = x + size * Math.cos(angle);
      const hy = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();
  }
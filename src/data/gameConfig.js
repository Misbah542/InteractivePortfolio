export const gameConfig = {
    // World settings
    world: {
      width: 2500,
      height: 1200,
      gridSize: 50,
      backgroundColor: '#0f172a'
    },
    
    // Player settings
    player: {
      startX: 250,
      startY: 250,
      speed: 300,
      radius: 20,
      color: '#60a5fa',
      trailLength: 10
    },
    
    // Camera settings
    camera: {
      smoothing: 0.1,
      boundaryPadding: 50
    },
    
    // Interaction settings
    interaction: {
      range: 100,
      clickRadius: 50,
      glowEffect: true,
      particlesOnInteract: 15
    },
    
    // Audio settings
    audio: {
      enabled: true,
      masterVolume: 0.7,
      musicVolume: 0.3,
      sfxVolume: 0.5,
      fadeInDuration: 2000,
      fadeOutDuration: 1000
    },
    
    // Visual effects
    effects: {
      particlesEnabled: true,
      maxParticles: 200,
      glowEnabled: true,
      trailEnabled: true,
      floatingAnimation: true
    },
    
    // Performance settings
    performance: {
      targetFPS: 60,
      enableOptimizations: true,
      reducedMotion: false,
      lowQualityMode: false
    },
    
    // Mobile settings
    mobile: {
      touchControlsEnabled: true,
      swipeSensitivity: 1.5,
      tapDelay: 200,
      virtualJoystick: false
    },
    
    // Debug settings
    debug: {
      showFPS: false,
      showCoordinates: false,
      showHitboxes: false,
      logInteractions: false
    },
    
    // Zone colors
    zoneColors: {
      home: '#60a5fa',      // blue-400
      tech: '#a78bfa',      // purple-400
      experience: '#f59e0b', // amber-500
      projects: '#10b981',   // emerald-500
      education: '#ec4899',  // pink-500
      contact: '#06b6d4',    // cyan-500
      secret: '#8b5cf6'      // violet-500
    },
    
    // Animation timings
    animations: {
      interactableFloat: {
        amplitude: 5,
        frequency: 0.001
      },
      playerBob: {
        amplitude: 2,
        frequency: 10
      },
      particleFade: {
        duration: 1000,
        gravity: 500
      },
      zoneTransition: {
        duration: 500
      }
    },
    
    // Unlock conditions
    unlocks: {
      secretCave: {
        requireZonesVisited: 6,
        requireInteractions: 10
      },
      easterEggs: {
        konamiCode: true,
        hiddenClickAreas: true
      }
    },
    
    // Save system
    saveGame: {
      enabled: true,
      autoSaveInterval: 30000, // 30 seconds
      maxSaveSlots: 3
    },
    
    // Statistics tracking
    stats: {
      trackZonesVisited: true,
      trackInteractions: true,
      trackPlayTime: true,
      trackDistance: true,
      trackAchievements: true
    },
    
    // Minimap settings
    minimap: {
      width: 200,
      height: 150,
      opacity: 0.9,
      showPlayerTrail: false,
      showInteractables: true,
      showZoneLabels: false
    },
    
    // Loading settings
    loading: {
      minDuration: 2000,
      showTips: true,
      tips: [
        "Use WASD or arrow keys to move around",
        "Click on glowing objects to interact",
        "Explore all zones to find hidden secrets",
        "Check the minimap to see where you haven't been",
        "Look for the secret cave - it's well hidden!",
        "Each zone represents a different aspect of my skills",
        "Click the download button for my full resume"
      ]
    },
    
    // Social features
    social: {
      shareEnabled: true,
      shareText: "Check out this amazing interactive portfolio!",
      shareUrl: "https://alexchen-portfolio.com"
    },
    
    // Accessibility
    accessibility: {
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      screenReaderAnnouncements: true,
      keyboardNavigation: true
    }
  };
  
  // Helper function to get zone color
  export const getZoneColor = (zoneId) => {
    return gameConfig.zoneColors[zoneId] || '#ffffff';
  };
  
  // Helper function to check if a feature is enabled
  export const isFeatureEnabled = (feature) => {
    const features = {
      particles: gameConfig.effects.particlesEnabled,
      audio: gameConfig.audio.enabled,
      saves: gameConfig.saveGame.enabled,
      stats: gameConfig.stats.trackPlayTime,
      mobile: gameConfig.mobile.touchControlsEnabled
    };
    
    return features[feature] !== false;
  };
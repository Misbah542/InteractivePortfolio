export const interactables = [
    // Home Base
    {
      id: 'about-me',
      x: 300,
      y: 300,
      label: 'About Me',
      icon: '👤',
      color: '#60a5fa',
      zone: 'home',
      type: 'about',
      data: {
        title: 'About Me',
        content: 'about'
      }
    },
    {
      id: 'resume-download',
      x: 200,
      y: 350,
      label: 'Download Resume',
      icon: '📄',
      color: '#60a5fa',
      zone: 'home',
      type: 'download',
      data: {
        file: '/resume.pdf',
        filename: 'Android_Developer_Resume.pdf'
      }
    },
    {
      id: 'intro-terminal',
      x: 400,
      y: 280,
      label: 'Introduction',
      icon: '💻',
      color: '#60a5fa',
      zone: 'home',
      type: 'terminal',
      data: {
        commands: [
          { text: '> whoami', delay: 0 },
          { text: 'Android Developer | Kotlin Expert | UI/UX Enthusiast', delay: 500 },
          { text: '> experience --summary', delay: 1000 },
          { text: '5+ years building innovative Android applications', delay: 1500 },
          { text: '> skills --top 3', delay: 2000 },
          { text: '1. Kotlin & Jetpack Compose', delay: 2500 },
          { text: '2. MVVM/Clean Architecture', delay: 3000 },
          { text: '3. Performance Optimization', delay: 3500 }
        ]
      }
    },
    
    // Tech Lab
    {
      id: 'skills-showcase',
      x: 850,
      y: 250,
      label: 'Core Skills',
      icon: '⚡',
      color: '#a78bfa',
      zone: 'tech',
      type: 'skills',
      data: {
        category: 'technical'
      }
    },
    {
      id: 'tools-arsenal',
      x: 1000,
      y: 300,
      label: 'Dev Tools',
      icon: '🔧',
      color: '#a78bfa',
      zone: 'tech',
      type: 'tools',
      data: {
        tools: [
          { name: 'Android Studio', icon: '🤖', proficiency: 95 },
          { name: 'VS Code', icon: '📝', proficiency: 90 },
          { name: 'Figma', icon: '🎨', proficiency: 80 },
          { name: 'Postman', icon: '📮', proficiency: 85 },
          { name: 'Git', icon: '🌿', proficiency: 90 },
          { name: 'Firebase', icon: '🔥', proficiency: 85 }
        ]
      }
    },
    {
      id: 'architecture-patterns',
      x: 1100,
      y: 220,
      label: 'Architecture',
      icon: '🏗️',
      color: '#a78bfa',
      zone: 'tech',
      type: 'architecture',
      data: {
        patterns: ['MVVM', 'MVI', 'Clean Architecture', 'Repository Pattern']
      }
    },
    
    // Experience Grounds
    {
      id: 'work-timeline',
      x: 1500,
      y: 250,
      label: 'Career Timeline',
      icon: '📅',
      color: '#f59e0b',
      zone: 'experience',
      type: 'timeline',
      data: {
        timeline: 'career'
      }
    },
    {
      id: 'achievements',
      x: 1700,
      y: 300,
      label: 'Achievements',
      icon: '🏆',
      color: '#f59e0b',
      zone: 'experience',
      type: 'achievements',
      data: {
        achievements: [
          { title: '1M+ Downloads', icon: '📱', description: 'Led development of app reaching 1M+ users' },
          { title: 'Performance Hero', icon: '⚡', description: 'Reduced app startup time by 60%' },
          { title: 'Team Leader', icon: '👥', description: 'Mentored 5 junior developers' },
          { title: 'Open Source', icon: '🌟', description: 'Contributed to 10+ open source projects' }
        ]
      }
    },
    {
      id: 'companies',
      x: 1600,
      y: 350,
      label: 'Companies',
      icon: '🏢',
      color: '#f59e0b',
      zone: 'experience',
      type: 'companies',
      data: {
        list: 'experience'
      }
    },
    
    // Project Plaza
    {
      id: 'project-weatherwise',
      x: 300,
      y: 800,
      label: 'WeatherWise',
      icon: '☁️',
      color: '#10b981',
      zone: 'projects',
      type: 'project',
      data: {
        projectId: 'weatherwise'
      }
    },
    {
      id: 'project-fittracker',
      x: 450,
      y: 850,
      label: 'FitTracker Pro',
      icon: '💪',
      color: '#10b981',
      zone: 'projects',
      type: 'project',
      data: {
        projectId: 'fittracker'
      }
    },
    {
      id: 'project-notesync',
      x: 600,
      y: 800,
      label: 'NoteSync',
      icon: '📝',
      color: '#10b981',
      zone: 'projects',
      type: 'project',
      data: {
        projectId: 'notesync'
      }
    },
    {
      id: 'project-showcase',
      x: 750,
      y: 850,
      label: 'All Projects',
      icon: '🚀',
      color: '#10b981',
      zone: 'projects',
      type: 'showcase',
      data: {
        view: 'grid'
      }
    },
    
    // Learning Tower
    {
      id: 'education-formal',
      x: 1100,
      y: 850,
      label: 'Education',
      icon: '🎓',
      color: '#ec4899',
      zone: 'education',
      type: 'education',
      data: {
        category: 'formal'
      }
    },
    {
      id: 'certifications',
      x: 1250,
      y: 800,
      label: 'Certifications',
      icon: '📜',
      color: '#ec4899',
      zone: 'education',
      type: 'certifications',
      data: {
        certs: [
          { name: 'Google Android Developer', issuer: 'Google', year: 2021 },
          { name: 'Kotlin Expert', issuer: 'JetBrains', year: 2022 },
          { name: 'AWS Mobile Developer', issuer: 'Amazon', year: 2023 }
        ]
      }
    },
    {
      id: 'courses',
      x: 1200,
      y: 900,
      label: 'Courses',
      icon: '📚',
      color: '#ec4899',
      zone: 'education',
      type: 'courses',
      data: {
        recent: true
      }
    },
    
    // Contact Terminal
    {
      id: 'contact-form',
      x: 1750,
      y: 850,
      label: 'Send Message',
      icon: '✉️',
      color: '#06b6d4',
      zone: 'contact',
      type: 'contact',
      data: {
        method: 'form'
      }
    },
    {
      id: 'social-links',
      x: 1650,
      y: 900,
      label: 'Social Media',
      icon: '🌐',
      color: '#06b6d4',
      zone: 'contact',
      type: 'social',
      data: {
        platforms: ['LinkedIn', 'GitHub', 'Twitter', 'Medium']
      }
    },
    {
      id: 'quick-contact',
      x: 1850,
      y: 800,
      label: 'Quick Contact',
      icon: '📱',
      color: '#06b6d4',
      zone: 'contact',
      type: 'quick-contact',
      data: {
        methods: ['Email', 'Phone', 'Calendar']
      }
    },
    
    // Secret Cave
    {
      id: 'easter-egg',
      x: 2275,
      y: 450,
      label: 'Secret!',
      icon: '🥚',
      color: '#8b5cf6',
      zone: 'secret',
      type: 'easter-egg',
      data: {
        secret: 'main'
      }
    },
    {
      id: 'game-stats',
      x: 2200,
      y: 380,
      label: 'Your Stats',
      icon: '📊',
      color: '#8b5cf6',
      zone: 'secret',
      type: 'stats',
      data: {
        tracked: ['zonesVisited', 'interactionsCount', 'secretsFound']
      }
    },
    {
      id: 'mini-game',
      x: 2350,
      y: 380,
      label: 'Mini Game',
      icon: '🎮',
      color: '#8b5cf6',
      zone: 'secret',
      type: 'mini-game',
      data: {
        game: 'android-quiz'
      }
    }
  ];
  
  // Utility functions
  export const getInteractableById = (id) => interactables.find(item => item.id === id);
  
  export const getInteractablesByZone = (zoneId) => interactables.filter(item => item.zone === zoneId);
  
  export const getInteractableAtPosition = (x, y, range = 50) => {
    return interactables.find(item => {
      const dist = Math.sqrt((x - item.x) ** 2 + (y - item.y) ** 2);
      return dist < range;
    });
  };
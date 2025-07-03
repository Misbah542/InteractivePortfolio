// Skill Icons as inline SVG components or emoji mappings
export const skillIcons = {
    // Programming Languages
    kotlin: {
      emoji: '🔥',
      color: '#7F52FF',
      svg: 'kotlin.svg'
    },
    java: {
      emoji: '☕',
      color: '#007396',
      svg: null
    },
    
    // Frameworks & Libraries
    compose: {
      emoji: '🎨',
      color: '#4285F4',
      svg: 'compose.svg'
    },
    android: {
      emoji: '📱',
      color: '#3DDC84',
      svg: 'android.svg'
    },
    
    // Architecture
    mvvm: {
      emoji: '🏗️',
      color: '#FF6B6B',
      svg: null
    },
    cleanArchitecture: {
      emoji: '🎯',
      color: '#4ECDC4',
      svg: null
    },
    
    // Async
    coroutines: {
      emoji: '🔄',
      color: '#00D4FF',
      svg: null
    },
    flow: {
      emoji: '🌊',
      color: '#1E88E5',
      svg: null
    },
    
    // Database
    room: {
      emoji: '💾',
      color: '#4CAF50',
      svg: null
    },
    sqlite: {
      emoji: '🗄️',
      color: '#003B57',
      svg: null
    },
    
    // Networking
    retrofit: {
      emoji: '🌐',
      color: '#48A14D',
      svg: null
    },
    okhttp: {
      emoji: '🔌',
      color: '#3E7CAB',
      svg: null
    },
    
    // Dependency Injection
    dagger: {
      emoji: '💉',
      color: '#ED1C24',
      svg: null
    },
    hilt: {
      emoji: '🎯',
      color: '#FF6F00',
      svg: null
    },
    
    // Testing
    junit: {
      emoji: '🧪',
      color: '#25A162',
      svg: null
    },
    espresso: {
      emoji: '☕',
      color: '#6F4E37',
      svg: null
    },
    mockito: {
      emoji: '🎭',
      color: '#78C257',
      svg: null
    },
    
    // Tools
    git: {
      emoji: '🌿',
      color: '#F05032',
      svg: null
    },
    gradle: {
      emoji: '🐘',
      color: '#02303A',
      svg: null
    },
    firebase: {
      emoji: '🔥',
      color: '#FFCA28',
      svg: null
    },
    
    // UI/UX
    materialDesign: {
      emoji: '🎨',
      color: '#757575',
      svg: null
    },
    figma: {
      emoji: '🖌️',
      color: '#F24E1E',
      svg: null
    },
    
    // Other
    ci_cd: {
      emoji: '🔧',
      color: '#2088C6',
      svg: null
    },
    performance: {
      emoji: '⚡',
      color: '#FFC107',
      svg: null
    }
  };
  
  // Create inline SVG component
  export const createSkillIcon = (skillName, size = 48) => {
    const skill = skillIcons[skillName];
    if (!skill) return null;
    
    if (skill.svg) {
      return `<img src="/src/assets/icons/${skill.svg}" alt="${skillName}" width="${size}" height="${size}" />`;
    }
    
    return `
      <div class="skill-icon" style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${skill.color};
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size * 0.6}px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      ">
        ${skill.emoji}
      </div>
    `;
  };
  
  // Tool Icons
  export const toolIcons = {
    androidStudio: {
      emoji: '🤖',
      name: 'Android Studio',
      color: '#3DDC84'
    },
    vscode: {
      emoji: '📝',
      name: 'VS Code',
      color: '#007ACC'
    },
    intellij: {
      emoji: '🧠',
      name: 'IntelliJ IDEA',
      color: '#000000'
    },
    postman: {
      emoji: '📮',
      name: 'Postman',
      color: '#FF6C37'
    },
    sourcetree: {
      emoji: '🌳',
      name: 'Sourcetree',
      color: '#0052CC'
    },
    slack: {
      emoji: '💬',
      name: 'Slack',
      color: '#4A154B'
    },
    jira: {
      emoji: '📋',
      name: 'Jira',
      color: '#0052CC'
    },
    notion: {
      emoji: '📓',
      name: 'Notion',
      color: '#000000'
    }
  };
  
  // Project Type Icons
  export const projectIcons = {
    weather: '☁️',
    fitness: '💪',
    notes: '📝',
    social: '👥',
    ecommerce: '🛒',
    education: '📚',
    entertainment: '🎬',
    productivity: '📊',
    travel: '✈️',
    food: '🍽️',
    health: '🏥',
    finance: '💰',
    game: '🎮',
    utility: '🔧',
    news: '📰'
  };
  
  // Achievement Icons
  export const achievementIcons = {
    downloads: '📱',
    rating: '⭐',
    performance: '⚡',
    teamwork: '👥',
    innovation: '💡',
    leadership: '👨‍💼',
    opensource: '🌟',
    speaker: '🎤',
    writer: '✍️',
    mentor: '👨‍🏫',
    award: '🏆',
    certification: '📜'
  };
  
  // Zone Background Patterns
  export const zonePatterns = {
    dots: (color) => `
      <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="${color}" opacity="0.3"/>
      </pattern>
    `,
    
    grid: (color) => `
      <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
      </pattern>
    `,
    
    circuit: (color) => `
      <pattern id="circuit-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 20 15 L 40 15" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
        <circle cx="20" cy="15" r="3" fill="${color}" opacity="0.3"/>
        <path d="M 0 25 L 15 25 L 15 40" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
        <circle cx="15" cy="25" r="3" fill="${color}" opacity="0.3"/>
      </pattern>
    `,
    
    hexagon: (color) => `
      <pattern id="hexagon-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
        <polygon points="30,1 45,13 45,39 30,51 15,39 15,13" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
      </pattern>
    `
  };
  
  // Export all icon sets
  export default {
    skillIcons,
    toolIcons,
    projectIcons,
    achievementIcons,
    zonePatterns,
    createSkillIcon
  };
// Game Constants
export const WORLD_WIDTH = 2500;
export const WORLD_HEIGHT = 1200;
export const GRID_SIZE = 50;

// Player Constants
export const PLAYER_SPEED = 300;
export const PLAYER_RADIUS = 20;
export const PLAYER_START_X = 250;
export const PLAYER_START_Y = 250;

// Interaction Constants
export const INTERACTION_RANGE = 100;
export const CLICK_RADIUS = 50;
export const HOVER_RADIUS = 40;

// Animation Constants
export const ANIMATION_FPS = 60;
export const FRAME_DURATION = 1000 / ANIMATION_FPS;
export const TRANSITION_DURATION = 300;

// Audio Constants
export const AUDIO_FADE_DURATION = 1000;
export const FOOTSTEP_INTERVAL = 300;
export const DEFAULT_VOLUME = 0.5;

// Particle Constants
export const MAX_PARTICLES = 200;
export const PARTICLE_LIFETIME = 1000;
export const PARTICLE_GRAVITY = 500;

// Zone IDs
export const ZONES = {
  HOME: 'home',
  TECH: 'tech',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CONTACT: 'contact',
  SECRET: 'secret'
};

// Zone Colors
export const ZONE_COLORS = {
  [ZONES.HOME]: '#60a5fa',
  [ZONES.TECH]: '#a78bfa',
  [ZONES.EXPERIENCE]: '#f59e0b',
  [ZONES.PROJECTS]: '#10b981',
  [ZONES.EDUCATION]: '#ec4899',
  [ZONES.CONTACT]: '#06b6d4',
  [ZONES.SECRET]: '#8b5cf6'
};

// Interaction Types
export const INTERACTION_TYPES = {
  ABOUT: 'about',
  SKILLS: 'skills',
  TIMELINE: 'timeline',
  PROJECT: 'project',
  EDUCATION: 'education',
  CONTACT: 'contact',
  DOWNLOAD: 'download',
  EASTER_EGG: 'easter-egg',
  TERMINAL: 'terminal',
  MINI_GAME: 'mini-game'
};

// Key Codes
export const KEYS = {
  W: 'w',
  A: 'a',
  S: 's',
  D: 'd',
  UP: 'arrowup',
  DOWN: 'arrowdown',
  LEFT: 'arrowleft',
  RIGHT: 'arrowright',
  SPACE: ' ',
  ENTER: 'enter',
  ESC: 'escape'
};

// Mobile Constants
export const TOUCH_SENSITIVITY = 1.5;
export const SWIPE_THRESHOLD = 50;
export const TAP_DELAY = 200;

// Storage Keys
export const STORAGE_KEYS = {
  PLAYER_POSITION: 'portfolio_player_pos',
  ZONES_VISITED: 'portfolio_zones_visited',
  INTERACTIONS: 'portfolio_interactions',
  STATS: 'portfolio_stats',
  PREFERENCES: 'portfolio_preferences'
};

// Achievement IDs
export const ACHIEVEMENTS = {
  FIRST_STEPS: 'first_steps',
  ZONE_EXPLORER: 'zone_explorer',
  SECRET_FINDER: 'secret_finder',
  COMPLETIONIST: 'completionist',
  SPEED_RUNNER: 'speed_runner',
  INTERACTIVE: 'interactive'
};

// API Endpoints (if needed for backend)
export const API_ENDPOINTS = {
  ANALYTICS: '/api/analytics',
  CONTACT: '/api/contact',
  DOWNLOAD_RESUME: '/api/resume/download'
};

// Error Messages
export const ERROR_MESSAGES = {
  AUDIO_FAILED: 'Failed to initialize audio. Please check your browser settings.',
  CANVAS_NOT_SUPPORTED: 'Your browser does not support canvas. Please update to a modern browser.',
  WEBGL_NOT_SUPPORTED: 'WebGL is not supported in your browser.',
  SAVE_FAILED: 'Failed to save game progress.',
  LOAD_FAILED: 'Failed to load game progress.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ZONE_DISCOVERED: 'New zone discovered!',
  ACHIEVEMENT_UNLOCKED: 'Achievement unlocked!',
  SECRET_FOUND: 'Secret discovered!',
  RESUME_DOWNLOADED: 'Resume downloaded successfully!',
  MESSAGE_SENT: 'Message sent successfully!'
};

// Loading Tips
export const LOADING_TIPS = [
  'Use WASD or arrow keys to move around the world',
  'Click on glowing objects to interact with them',
  'Explore all zones to discover hidden secrets',
  'Check the minimap to see where you haven\'t been',
  'Each zone represents a different aspect of my skills',
  'Look for the secret cave - it\'s well hidden!',
  'Download my resume from the Home Base',
  'The Tech Lab showcases all my technical skills',
  'Visit the Project Plaza to see my Android apps',
  'Don\'t forget to check out the Contact Terminal!'
];

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
};

// Performance Thresholds
export const PERFORMANCE = {
  TARGET_FPS: 60,
  MIN_FPS: 30,
  MAX_DELTA_TIME: 100,
  PARTICLE_LIMIT: 200,
  OBJECT_CULL_DISTANCE: 1000
};

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com',
  TWITTER: 'https://twitter.com',
  MEDIUM: 'https://medium.com'
};

// Meta Information
export const META = {
  TITLE: 'Android Developer Portfolio - Interactive Experience',
  DESCRIPTION: 'Explore an interactive game-like portfolio showcasing Android development skills',
  KEYWORDS: 'Android, Developer, Portfolio, Interactive, Kotlin, Jetpack Compose',
  AUTHOR: 'Your Name',
  VERSION: '1.0.0'
};
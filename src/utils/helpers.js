// Math Helpers
export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  };
  
  export const lerp = (start, end, amount) => {
    return start + (end - start) * amount;
  };
  
  export const distance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };
  
  export const angle = (x1, y1, x2, y2) => {
    return Math.atan2(y2 - y1, x2 - x1);
  };
  
  export const normalize = (x, y) => {
    const len = Math.sqrt(x * x + y * y);
    if (len === 0) return { x: 0, y: 0 };
    return { x: x / len, y: y / len };
  };
  
  export const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Collision Detection
  export const pointInCircle = (px, py, cx, cy, radius) => {
    return distance(px, py, cx, cy) <= radius;
  };
  
  export const pointInRect = (px, py, rx, ry, rw, rh) => {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  };
  
  export const circleCollision = (x1, y1, r1, x2, y2, r2) => {
    return distance(x1, y1, x2, y2) <= r1 + r2;
  };
  
  export const rectCollision = (x1, y1, w1, h1, x2, y2, w2, h2) => {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  };
  
  // Storage Helpers
  export const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to storage:', error);
      return false;
    }
  };
  
  export const loadFromStorage = (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return defaultValue;
    }
  };
  
  export const clearStorage = (key) => {
    try {
      if (key) {
        localStorage.removeItem(key);
      } else {
        localStorage.clear();
      }
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  };
  
  // Time Helpers
  export const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // Color Helpers
  export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  export const adjustColor = (color, amount) => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;
    
    const r = clamp(rgb.r + amount, 0, 255);
    const g = clamp(rgb.g + amount, 0, 255);
    const b = clamp(rgb.b + amount, 0, 255);
    
    return rgbToHex(r, g, b);
  };
  
  // Array Helpers
  export const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  export const unique = (array) => {
    return [...new Set(array)];
  };
  
  export const chunk = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  
  // Performance Helpers
  export const measurePerformance = (fn, label = 'Performance') => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)}ms`);
    return result;
  };
  
  export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  };
  
  // Canvas Helpers
  export const clearCanvas = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
  };
  
  export const drawCircle = (ctx, x, y, radius, color, filled = true) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (filled) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };
  
  export const drawRect = (ctx, x, y, width, height, color, filled = true) => {
    if (filled) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    } else {
      ctx.strokeStyle = color;
      ctx.strokeRect(x, y, width, height);
    }
  };
  
  export const drawText = (ctx, text, x, y, options = {}) => {
    const {
      font = '16px Arial',
      color = '#ffffff',
      align = 'left',
      baseline = 'top',
      maxWidth = undefined
    } = options;
    
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    if (maxWidth) {
      ctx.fillText(text, x, y, maxWidth);
    } else {
      ctx.fillText(text, x, y);
    }
  };
  
  // Validation Helpers
  export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  // Device Detection
  export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  export const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };
  
  export const isRetina = () => {
    return window.devicePixelRatio > 1;
  };
  
  // Async Helpers
  export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  export const retry = async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await sleep(delay);
      return retry(fn, retries - 1, delay);
    }
  };
  
  // Event Helpers
  export const once = (element, event, handler) => {
    const wrappedHandler = (e) => {
      handler(e);
      element.removeEventListener(event, wrappedHandler);
    };
    element.addEventListener(event, wrappedHandler);
  };
  
  // Animation Helpers
  export const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  
  export const easeOut = (t) => {
    return t * (2 - t);
  };
  
  export const easeIn = (t) => {
    return t * t;
  };
  
  // Formatting Helpers
  export const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const truncate = (str, length = 50, suffix = '...') => {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  };
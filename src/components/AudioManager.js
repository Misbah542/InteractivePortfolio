import SoundGenerator from '../assets/sounds/SoundGenerator';

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this.masterVolume = 0.7;
    this.isMuted = false;
    
    // Initialize audio context on first user interaction
    this.initPromise = this.init();
  }

  async init() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create sound generator
      this.soundGenerator = new SoundGenerator(this.audioContext);
      
      // Generate and store sounds
      this.sounds = {
        interact: this.soundGenerator.createInteractSound(),
        footstep: this.soundGenerator.createFootstepSound(),
        achievement: this.soundGenerator.createAchievementSound(),
        ui_open: this.soundGenerator.createUIOpenSound(),
        ui_close: this.soundGenerator.createUICloseSound(),
        zone_enter: this.soundGenerator.createZoneEnterSound(),
        pickup: this.soundGenerator.createPickupSound(),
        error: this.soundGenerator.createErrorSound()
      };
      
      // Create background music
      this.createBackgroundMusic();
      
      console.log('🎵 Audio Manager initialized');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  createBackgroundMusic() {
    if (!this.audioContext) return;
    
    // Create nodes
    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.gain.value = 0.3;
    this.musicGainNode.connect(this.audioContext.destination);
    
    // Simple ambient music generator
    this.musicOscillators = [];
    const baseFreq = 110; // A2
    const chordIntervals = [1, 1.5, 2, 2.5]; // Creates a sus chord
    
    chordIntervals.forEach((interval, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.frequency.value = baseFreq * interval;
      osc.type = 'sine';
      gain.gain.value = 0.1 / (index + 1); // Decrease volume for higher notes
      
      // Add slight detuning for richness
      osc.detune.value = Math.random() * 10 - 5;
      
      // Connect
      osc.connect(gain);
      gain.connect(this.musicGainNode);
      
      this.musicOscillators.push({ osc, gain });
    });
    
    // LFO for subtle volume modulation
    this.lfo = this.audioContext.createOscillator();
    this.lfoGain = this.audioContext.createGain();
    
    this.lfo.frequency.value = 0.2; // Slow modulation
    this.lfoGain.gain.value = 0.05;
    
    this.lfo.connect(this.lfoGain);
    this.musicOscillators.forEach(({ gain }) => {
      this.lfoGain.connect(gain.gain);
    });
  }

  async playSound(soundName, options = {}) {
    await this.initPromise;
    
    if (!this.audioContext || this.isMuted || !this.sfxEnabled) return;
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound '${soundName}' not found`);
      return;
    }
    
    // Play the sound function
    sound(options);
  }

  startMusic() {
    if (!this.audioContext || !this.musicEnabled || this.isMuted) return;
    
    this.musicOscillators.forEach(({ osc }) => {
      osc.start();
    });
    this.lfo.start();
    
    // Fade in
    this.musicGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.musicGainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 2);
  }

  stopMusic() {
    if (!this.audioContext) return;
    
    // Fade out
    this.musicGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1);
    
    setTimeout(() => {
      this.musicOscillators.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      try {
        this.lfo.stop();
      } catch (e) {
        // LFO might already be stopped
      }
    }, 1000);
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    
    if (this.musicEnabled && !this.isMuted) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    
    return this.musicEnabled;
  }

  toggleMute(muted) {
    this.isMuted = muted;
    
    if (this.audioContext) {
      if (muted) {
        this.audioContext.suspend();
      } else {
        this.audioContext.resume();
      }
    }
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    
    if (this.audioContext && this.audioContext.destination) {
      // In a real implementation, you'd have a master gain node
      console.log(`Master volume set to ${Math.round(this.masterVolume * 100)}%`);
    }
  }

  // Special sound effects
  playFootstep() {
    const variations = ['footstep'];
    const sound = variations[Math.floor(Math.random() * variations.length)];
    this.playSound(sound, { 
      pitch: 0.9 + Math.random() * 0.2,
      volume: 0.3 + Math.random() * 0.2
    });
  }

  playZoneTransition(fromZone, toZone) {
    this.playSound('zone_enter', {
      pitch: toZone ? 1 + (toZone.charCodeAt(0) % 5) * 0.1 : 1
    });
  }

  cleanup() {
    if (this.audioContext) {
      this.stopMusic();
      this.audioContext.close();
    }
  }
}

export default AudioManager;
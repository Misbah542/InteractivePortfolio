class SoundGenerator {
    constructor(audioContext) {
      this.audioContext = audioContext;
    }
  
    // Create a simple beep/blip sound for interactions
    createInteractSound() {
      return (options = {}) => {
        const { pitch = 1, volume = 0.5 } = options;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25 * pitch, this.audioContext.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(261.63 * pitch, this.audioContext.currentTime + 0.1); // C4
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.1);
      };
    }
  
    // Footstep sound (soft thud)
    createFootstepSound() {
      return (options = {}) => {
        const { pitch = 1, volume = 0.3 } = options;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = 'sine';
        osc.frequency.value = 60 * pitch;
        
        filter.type = 'lowpass';
        filter.frequency.value = 100;
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.05);
      };
    }
  
    // Achievement/Success sound (ascending arpeggio)
    createAchievementSound() {
      return (options = {}) => {
        const { volume = 0.4 } = options;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        
        notes.forEach((freq, index) => {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.type = 'sine';
          osc.frequency.value = freq;
          
          const startTime = this.audioContext.currentTime + index * 0.1;
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
          
          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
      };
    }
  
    // UI Open sound (quick sweep up)
    createUIOpenSound() {
      return (options = {}) => {
        const { volume = 0.3 } = options;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.15);
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.15);
      };
    }
  
    // UI Close sound (quick sweep down)
    createUICloseSound() {
      return (options = {}) => {
        const { volume = 0.3 } = options;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.15);
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.15);
      };
    }
  
    // Zone enter sound (ethereal chime)
    createZoneEnterSound() {
      return (options = {}) => {
        const { pitch = 1, volume = 0.4 } = options;
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        frequencies.forEach((freq, index) => {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          const panner = this.audioContext.createStereoPanner();
          
          osc.connect(gain);
          gain.connect(panner);
          panner.connect(this.audioContext.destination);
          
          osc.type = 'sine';
          osc.frequency.value = freq * pitch;
          
          // Pan each note slightly
          panner.pan.value = (index - 1) * 0.5;
          
          const startTime = this.audioContext.currentTime + index * 0.05;
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(volume * (1 - index * 0.2), startTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
          
          osc.start(startTime);
          osc.stop(startTime + 0.5);
        });
      };
    }
  
    // Pickup/collect sound
    createPickupSound() {
      return (options = {}) => {
        const { volume = 0.4 } = options;
        
        // Two quick ascending tones
        [440, 880].forEach((freq, index) => {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.type = 'square';
          osc.frequency.value = freq;
          
          const startTime = this.audioContext.currentTime + index * 0.05;
          gain.gain.setValueAtTime(volume * 0.5, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
          
          osc.start(startTime);
          osc.stop(startTime + 0.1);
        });
      };
    }
  
    // Error/invalid action sound
    createErrorSound() {
      return (options = {}) => {
        const { volume = 0.3 } = options;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.value = 100;
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        // Add some dissonance
        const osc2 = this.audioContext.createOscillator();
        osc2.connect(gain);
        osc2.type = 'sawtooth';
        osc2.frequency.value = 105; // Slightly detuned
        
        osc.start(this.audioContext.currentTime);
        osc2.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.2);
        osc2.stop(this.audioContext.currentTime + 0.2);
      };
    }
  
    // Create custom sound effect
    createCustomSound(config) {
      return (options = {}) => {
        const {
          type = 'sine',
          frequency = 440,
          duration = 0.2,
          volume = 0.5,
          fadeIn = 0.01,
          fadeOut = 0.1
        } = { ...config, ...options };
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.type = type;
        osc.frequency.value = frequency;
        
        const now = this.audioContext.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + fadeIn);
        gain.gain.setValueAtTime(volume, now + duration - fadeOut);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        osc.start(now);
        osc.stop(now + duration);
      };
    }
  }
  
  export default SoundGenerator;
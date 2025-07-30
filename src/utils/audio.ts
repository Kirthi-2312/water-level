class AudioManager {
  private audioContext: AudioContext | null = null;
  private alarmAudio: HTMLAudioElement | null = null;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create alarm sound using Web Audio API
      this.createAlarmSound();
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  private createAlarmSound() {
    // Create a simple beep sound for the alarm
    const canvas = document.createElement('canvas');
    const audioData = this.generateBeepData();
    
    // Convert to blob and create audio element
    const blob = new Blob([audioData], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);
    
    this.alarmAudio = new Audio();
    this.alarmAudio.src = audioUrl;
    this.alarmAudio.loop = true;
    this.alarmAudio.volume = 0.3;
  }

  private generateBeepData(): ArrayBuffer {
    const sampleRate = 44100;
    const duration = 0.5; // 0.5 seconds
    const frequency = 800; // 800 Hz beep
    const samples = sampleRate * duration;
    
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Generate beep waveform
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
      view.setInt16(44 + i * 2, sample * 32767, true);
    }
    
    return buffer;
  }

  playAlarm() {
    if (this.alarmAudio) {
      this.alarmAudio.currentTime = 0;
      this.alarmAudio.play().catch(console.warn);
    }
  }

  stopAlarm() {
    if (this.alarmAudio) {
      this.alarmAudio.pause();
      this.alarmAudio.currentTime = 0;
    }
  }

  playClickSound() {
    // Simple click sound using oscillator
    if (this.audioContext) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    }
  }
}

export const audioManager = new AudioManager();
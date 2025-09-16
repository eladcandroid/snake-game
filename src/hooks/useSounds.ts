import { useCallback, useRef } from 'react';

export const useSounds = () => {
  const audioContext = useRef<AudioContext>();

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    initAudio();
    if (!audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  }, [initAudio]);

  const playEatSound = useCallback(() => {
    playTone(800, 0.1, 'square');
  }, [playTone]);

  const playGameOverSound = useCallback(() => {
    playTone(200, 0.5, 'sawtooth');
    setTimeout(() => playTone(150, 0.5, 'sawtooth'), 100);
  }, [playTone]);

  const playMoveSound = useCallback(() => {
    playTone(400, 0.05, 'triangle');
  }, [playTone]);

  return {
    playEatSound,
    playGameOverSound,
    playMoveSound,
  };
};
import { useGameUI } from '../contexts/GameUIContext';
import { useEffect, useRef } from 'react';

export const useGameAudio = (audioSource) => {
  const { isMuted } = useGameUI();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && audioSource) {
      audioRef.current.src = audioSource;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback prevented:", error);
        });
      }
    }
  }, [audioSource]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return audioRef;
}

import { useEffect, useRef, useState } from 'react';
import { useGameState } from '../../contexts/GameStateContext';
import '../../styles/BackgroundMusic.css';
import menuMusic from '../../assets/music/menu.mp3';
import nightMusic from '../../assets/music/night.mp3';
import minigameMusic from '../../assets/music/minigame.mp3';
import communityboardMusic from '../../assets/music/community-board.mp3';
import creditsMusic from '../../assets/music/credits.mp3';


const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const { gameState } = useGameState();
  const [isMuted, setIsMuted] = useState(false);

  const musicTracks = {
    menu: menuMusic,
    day1_morning: menuMusic,
    day2_morning: menuMusic,
    day3_morning: menuMusic,
    day1_night: nightMusic,
    day2_night: nightMusic,
    day3_night: nightMusic,
    day1_interaction: minigameMusic,
    day2_interaction: minigameMusic,
    day3_interaction: minigameMusic,
    day1_community_board: communityboardMusic,
    day2_community_board: communityboardMusic,
    day3_community_board: communityboardMusic,
    credits: creditsMusic
  };

  useEffect(() => {
    const currentTrack = musicTracks[gameState.currentScene];

    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay prevented:", error);
        });
      }
    }
  }, [gameState.currentScene]);
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted)
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto" />
      <button 
        onClick={toggleMute}
        className='music-button'
        aria-label={isMuted ? "Unmute music" : "Mute music"}>
          <span className='music-icon'>
            {isMuted ? '🔇' : '🔊' }
          </span>
        </button>
    </>
  );
};

export default BackgroundMusic;
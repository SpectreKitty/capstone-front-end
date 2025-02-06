import { useGameUI } from '../../contexts/GameUIContext';
import { useGameProgress } from '../../contexts';
import { useGameAudio } from '../../contexts';
import '../../styles/BackgroundMusic.css';

// Define music tracks mapping with direct URLs
const musicTracks = {
  // Menu and morning scenes
  menu: '/assets/music/menu.mp3',
  day1_morning: '/assets/music/menu.mp3',
  day2_morning: '/assets/music/menu.mp3',
  day3_morning: '/assets/music/menu.mp3',

  // Night scenes
  day1_night: '/assets/music/night.mp3',
  day2_night: '/assets/music/night.mp3',
  day3_night: '/assets/music/night.mp3',

  // Interaction/minigame scenes
  day1_interaction: '/assets/music/minigame.mp3',
  day2_interaction: '/assets/music/minigame.mp3',
  day3_interaction: '/assets/music/minigame.mp3',

  // Community board scenes
  day1_community_board: '/assets/music/community-board.mp3',
  day2_community_board: '/assets/music/community-board.mp3',
  day3_community_board: '/assets/music/community-board.mp3',

  // Credits
  credits: '/assets/music/credits.mp3'
};


const BackgroundMusic = () => {
  const { currentScene } = useGameProgress();
  const { isMuted, setIsMuted } = useGameUI();
  const currentTrack = musicTracks[currentScene] || musicTracks.menu;
  const audioRef = useGameAudio(currentTrack);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      />
      <button 
        onClick={toggleMute}
        className="music-button"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <span className="music-icon">
          {isMuted ? '🔇' : '🔊'}
        </span>
      </button>
    </>
  );
};

export default BackgroundMusic;
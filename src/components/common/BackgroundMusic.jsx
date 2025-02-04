import { useGameUI } from '../../contexts/GameUIContext';
import { useGameProgress } from '../../contexts';
import { useGameAudio } from '../../contexts';
import '../../styles/BackgroundMusic.css';

// Import all music tracks
import menuMusic from '../../assets/music/menu.mp3';
import nightMusic from '../../assets/music/night.mp3';
import minigameMusic from '../../assets/music/minigame.mp3';
import communityboardMusic from '../../assets/music/community-board.mp3';
import creditsMusic from '../../assets/music/credits.mp3';

// Define music tracks mapping
const musicTracks = {
  // Menu and morning scenes
  menu: menuMusic,
  day1_morning: menuMusic,
  day2_morning: menuMusic,
  day3_morning: menuMusic,

  // Night scenes
  day1_night: nightMusic,
  day2_night: nightMusic,
  day3_night: nightMusic,

  // Interaction/minigame scenes
  day1_interaction: minigameMusic,
  day2_interaction: minigameMusic,
  day3_interaction: minigameMusic,

  // Community board scenes
  day1_community_board: communityboardMusic,
  day2_community_board: communityboardMusic,
  day3_community_board: communityboardMusic,

  // Credits
  credits: creditsMusic
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
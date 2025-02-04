import morningImage from '/src/assets/images/backgrounds/bedroom.png';
import nightImage from '/src/assets/images/backgrounds/bedroom_night.png';
import communityBoardImage from '/src/assets/images/backgrounds/community_board.jpeg';
import defaultImage from '/src/assets/images/backgrounds/start_img.jpeg';

// Background types for reusable scenes
export const BACKGROUNDS = {
  MORNING: morningImage,
  NIGHT: nightImage,
  COMMUNITY_BOARD: communityBoardImage,
  DEFAULT: defaultImage,
};

// Scene types that repeat each day
const DAILY_SCENES = ['morning', 'community_board', 'interaction', 'night'];

// Map background type to scene type
const SCENE_TO_BACKGROUND = {
  morning: BACKGROUNDS.MORNING,
  community_board: BACKGROUNDS.COMMUNITY_BOARD,
  interaction: BACKGROUNDS.DEFAULT,
  night: BACKGROUNDS.NIGHT,
};

// Generate scene backgrounds for all days
export const sceneBackgrounds = Array.from({ length: 3 }, (_, index) => {
  const day = index + 1;
  return DAILY_SCENES.reduce((acc, scene) => ({
    ...acc,
    [`day${day}_${scene}`]: SCENE_TO_BACKGROUND[scene]
  }), {});
}).reduce((acc, dayScenes) => ({ ...acc, ...dayScenes }), {});
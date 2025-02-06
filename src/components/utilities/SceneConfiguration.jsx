// Define paths directly instead of importing like I was doing before
export const BACKGROUNDS = {
  MORNING: '/assets/images/backgrounds/bedroom.png',
  NIGHT: '/assets/images/backgrounds/bedroom_night.png',
  COMMUNITY_BOARD: '/assets/images/backgrounds/community_board.jpeg',
  DEFAULT: '/assets/images/backgrounds/start_img.jpeg',
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
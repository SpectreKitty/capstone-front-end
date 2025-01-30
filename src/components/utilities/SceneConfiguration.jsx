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

// Map each scene to its background
export const sceneBackgrounds = {
  // Day 1
  day1_morning: BACKGROUNDS.MORNING,
  day1_community_board: BACKGROUNDS.COMMUNITY_BOARD,
  day1_interaction: BACKGROUNDS.DEFAULT,
  day1_night: BACKGROUNDS.NIGHT,
  
  // Day 2
  day2_morning: BACKGROUNDS.MORNING,
  day2_community_board: BACKGROUNDS.COMMUNITY_BOARD,
  day2_interaction: BACKGROUNDS.DEFAULT,
  day2_night: BACKGROUNDS.NIGHT,
  
  // Day 3
  day3_morning: BACKGROUNDS.MORNING,
  day3_community_board: BACKGROUNDS.COMMUNITY_BOARD,
  day3_interaction: BACKGROUNDS.DEFAULT,
  day3_night: BACKGROUNDS.NIGHT,
};
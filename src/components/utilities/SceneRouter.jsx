import { useGameState } from '../../contexts/GameStateContext';
import { useSceneTransition } from '../../hooks/useSceneTransition';
import { 
  Day1MorningScene,
  Day1CommunityBoardScene,
  Day1InteractionScene,
  Day1NightScene,
  Day2MorningScene,
  Day2CommunityBoardScene,
  Day2InteractionScene,
  Day2NightScene,
  Day3MorningScene,
  Day3CommunityBoardScene,
  Day3InteractionScene,
  Day3NightScene,
  OliveMemoryGameScene,
  SarahCatchingScene,
  GardenWeedingScene
} from '../scenes/SceneBase';
import DayTransition from "../transitions/DayTransition";
import SceneTransition from "../transitions/SceneTransition";
import Credits from '../scenes/Credits';
import StartMenu from '../menu/StartMenu';

function SceneRouter() {
  const { gameState, updateGameState } = useGameState();
  const { startDayTransition } = useSceneTransition();

  switch(gameState.currentScene) {
    // Day transitions
    case 'day1_night':
      return <Day1NightScene onComplete={() => startDayTransition('2')} />;
    case 'day2_night':
      return <Day2NightScene onComplete={() => startDayTransition('3')} />;
    case 'day_transition':
      return (
        <DayTransition
          day={gameState.transitionData.day}
          onComplete={() => updateGameState({
            currentScene: gameState.transitionData.nextScene,
            dialogueIndex: 0,
            lastChoice: null
          })}
        />
      );
    // Regular scenes
    case 'transition':
      return <SceneTransition
        nextScene={gameState.transitionData.nextScene}
        transitionText={gameState.transitionData.transitionText}
      />;
    case 'day1_morning':
      return <Day1MorningScene />;
    case 'day1_community_board':
      return <Day1CommunityBoardScene />;
    case 'day1_interaction':
      return <Day1InteractionScene />;
    case 'day2_morning':
      return <Day2MorningScene />;
    case 'day2_community_board':
      return <Day2CommunityBoardScene />;
    case 'day2_interaction':
      return <Day2InteractionScene />;
    case 'day3_morning':
      return <Day3MorningScene />;
    case 'day3_community_board':
      return <Day3CommunityBoardScene />;
    case 'day3_interaction':
      return <Day3InteractionScene />;
    case 'day3_night':
      return <Day3NightScene />;
    case 'olive_memory':
      return <OliveMemoryGameScene />;
    case 'sarah_catching':
      return <SarahCatchingScene />;
    case 'garden_weeding':
      return <GardenWeedingScene />;
    case 'credits':
      return <Credits />;
    default:
      return <StartMenu />;
  }
}

export default SceneRouter;
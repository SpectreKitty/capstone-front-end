import { useGameState } from "../../contexts/GameStateContext";
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
  Day3NightScene
} from "../scenes/SceneBase"; //
import SceneTransition from "../transitions/SceneTransition";
import StartMenu from "../menu/StartMenu";

function SceneRouter() {
  const { gameState } = useGameState();

  switch(gameState.currentScene) {
    case 'transition':
      return <SceneTransition
        nextScene={gameState.transitionData.nextScene}
        transitionText={gameState.transitionData.transitionText} />;
    case 'day1_morning':
      return <Day1MorningScene />;
    case 'day1_community_board':
      return <Day1CommunityBoardScene />;
    case 'day1_interaction':
      return <Day1InteractionScene />;
    case 'day1_night':
      return <Day1NightScene />;
    case 'day2_morning':
      return <Day2MorningScene/>
    case 'day2_community_board':
      return <Day2CommunityBoardScene />;
    case 'day2_interaction':
      return <Day2InteractionScene />;
    case 'day2_night':
      return <Day2NightScene />;
    case 'day3_morning':
      return <Day3MorningScene/>
    case 'day3_community_board':
      return <Day3CommunityBoardScene />;
    case 'day3_interaction':
      return <Day3InteractionScene />;
    case 'day3_night':
      return <Day3NightScene />;
    default:
      return <StartMenu />;
  }
}

export default SceneRouter;
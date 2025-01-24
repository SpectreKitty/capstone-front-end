import { useGameState } from "../../contexts/GameStateContext";
import { 
  Day1MorningScene, 
  Day1CommunityBoardScene, 
  Day1InteractionScene, 
  Day1NightScene, 
  Day2MorningScene
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
    default:
      return <StartMenu />;
  }
}

export default SceneRouter;
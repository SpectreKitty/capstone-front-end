import { useGameState } from "../../../contexts/GameStateContext";
import Day1CommunityBoardScene from "../../scenes/day1/Day1CommunityBoardScene";
import Day1InteractionScene from "../../scenes/day1/Day1InteractionScene";
import Day1MorningScene from "../../scenes/day1/Day1MorningScene";
import SceneTransition from "../../transitions/SceneTransition";
import StartMenu from "../../menu/StartMenu";

function SceneRouter() {
  const { gameState } = useGameState();

  switch(gameState.currentScene) {
    case 'transition':
      return <SceneTransition
        nextScene={gameState.transitionData.nextScene}
        transitionText={gameState.transitionData.transitionText} />;
    case 'day1_morning':
      return <Day1MorningScene />
    case 'day1_community_board':
      return <Day1CommunityBoardScene />
    case 'day1_interaction':
      return <Day1InteractionScene />
    default:
      return <StartMenu />
  }
}

export default SceneRouter;
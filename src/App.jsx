import { GameStateProvider, useGameState } from "./contexts/GameStateContext";
import StartMenu from './components/menu/StartMenu.jsx';
import Day1MorningScene from "./components/scenes/day1/Day1MorningScene.jsx";
import Day1CommunityBoardScene from "./components/scenes/day1/Day1CommunityBoardScene.jsx";
import Day1InteractionScene from "./components/scenes/day1/Day1InteractionScene.jsx";
import SceneTransition from "./components/transitions/SceneTransition.jsx";


function GameContent() {
  const { gameState } = useGameState();

  if (gameState.currentScene === 'menu'){
    return <StartMenu />;
  }

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
      return <StartMenu />;
    }
  }

function App() {
  return (
    <GameStateProvider>
      <GameContent />
    </GameStateProvider>
  );
}

export default App;

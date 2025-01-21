import { GameStateProvider, useGameState } from "./contexts/GameStateContext";
import StartMenu from './components/menu/StartMenu.jsx';
import IntroductionScene from './components/scenes/IntroductionScene';
import Day1Scene from "./components/scenes/Day1Scene";


function GameScenes() {
  const { gameState } = useGameState();

  const renderScene = () => {
    switch(gameState.currentScene) {
      case 'menu':
        return <StartMenu />;
      case 'introduction':
        return <IntroductionScene />
      case 'day1Scene':
        return <Day1Scene />
      default:
        return <StartMenu />
    }
  }

  return renderScene();
}

function App() {
  return (
    <GameStateProvider>
      <GameScenes />
    </GameStateProvider>
  );
}

export default App;

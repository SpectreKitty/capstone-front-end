import { GameStateProvider, useGameState } from "./contexts/GameStateContext";
import { useState } from 'react';
import LogoutButton from "./components/common/LogoutButton.jsx";
import SaveLoadMenu from "./components/common/SaveLoadMenu.jsx";
import Login from './components/menu/Login.jsx';
import StartMenu from './components/menu/StartMenu.jsx';
import Day1MorningScene from "./components/scenes/day1/Day1MorningScene.jsx";
import Day1CommunityBoardScene from "./components/scenes/day1/Day1CommunityBoardScene.jsx";
import Day1InteractionScene from "./components/scenes/day1/Day1InteractionScene.jsx";
import SceneTransition from "./components/transitions/SceneTransition.jsx";

function GameContent() {
  const { gameState } = useGameState();

  if (!gameState.isLoggedIn) {
    return <Login />
  }

  return (
    <>
    <LogoutButton />
    {gameState.currentScene === 'menu' ? (
      <StartMenu />
    ) : (
      (() => {
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
  })()
)}
    </>
    );
  }

function App() {
  const [showSaveLoad, setShowSaveLoad] = useState(false);

  return (
    <GameStateProvider>
      <LogoutButton />
      <button 
        className="save-load-button"
        onClick={() => setShowSaveLoad(true)}
      >
        Save/Load
      </button>
      {showSaveLoad && <SaveLoadMenu onClose={() => setShowSaveLoad(false)} />}
      <GameContent />
    </GameStateProvider>
  );
}

export default App;

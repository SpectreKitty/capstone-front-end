import SceneRouter from "./components/common/utilities/SceneRouter";
import { GameStateProvider, useGameState } from "./contexts/GameStateContext";
import GameLayout from "./components/common/utilities/GameLayout";
import Login from '../src/components/menu/Login';


function GameContent() {
  const { gameState } = useGameState();
  return !gameState.isLoggedIn ? <Login /> : <SceneRouter />;
}

function App() {

  return (
    <GameStateProvider>
      <GameLayout>
        <GameContent />
      </GameLayout>
    </GameStateProvider>
  );
}

export default App;

import SceneRouter from "./components/utilities/SceneRouter";
import { GameStateProvider, useGameState } from "./contexts/GameStateContext";
import GameLayout from "./components/utilities/GameLayout";
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

import { useState } from "react";
import LogoutButton from "../common/LogoutButton";
import SaveLoadMenu from '../common/SaveLoadMenu';
import { useGameState } from "../../contexts/GameStateContext";


function GameLayout ({ children }) {
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const { gameState } = useGameState();

  return (
    <>
    {gameState.isLoggedIn && gameState.currentScene !== 'menu' && (
        <>
          <LogoutButton />
          <button 
              className="save-load-button"
              onClick={() => setShowSaveLoad(true)}>
              Save/Load
            </button>
            {showSaveLoad && <SaveLoadMenu onClose={() => setShowSaveLoad(false)} />}
        </>
    )}
    {children}
  </>
  );
}

export default GameLayout;
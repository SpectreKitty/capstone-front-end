import { useState } from "react";
import LogoutButton from "../menu/LogoutButton";
import SaveLoadMenu from '../menu/SaveLoadMenu';
import { useGameState } from "../../contexts/GameStateContext";
import BackgroundMusic from "../common/BackgroundMusic";


function GameLayout ({ children }) {
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const { gameState } = useGameState();

  return (
    <>
    {gameState.isLoggedIn && (
        <>
        <BackgroundMusic />
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
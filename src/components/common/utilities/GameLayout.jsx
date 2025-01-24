import { useState } from "react";
import { GameStateProvider } from "../../../contexts/GameStateContext";
import LogoutButton from "../LogoutButton";
import SaveLoadMenu from '../SaveLoadMenu';


function GameLayout ({ children }) {
  const [showSaveLoad, setShowSaveLoad] = useState(false);

  return (
    <>
      {GameStateProvider.isLoggedIn &&(
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
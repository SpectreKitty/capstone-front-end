import '../../styles/StartMenu.css';
import { useGameState } from '../../contexts/GameStateContext';
import { useGameUI } from '../../contexts/GameUIContext';
import { useAuth } from '../../contexts/AuthContext';
import SaveLoadMenu from '../menu/SaveLoadMenu';

export default function StartMenu() {
  const { updateGameState } = useGameState();
  const { isLoggedIn }= useAuth();
  const {showSaveLoad, setShowSaveLoad} = useGameUI();

  const handleStartGame = () => {
    updateGameState({
      currentScene: 'day_transition',
      transitionData: {
        day: "1",
        nextScene: 'day1_morning'
      }
    });
  };

  return (
    <div className="menu-container" style={{ backgroundImage: `url('/assets/images/backgrounds/start_img.jpeg')` }}>
      <h1 className="game-title">Kindness Simulator</h1>
      <div className="menu-buttons">
      <button className="menu-button" onClick={handleStartGame}>Start New Game</button>
      {isLoggedIn && (
          <button 
            className="menu-button"
            onClick={() => setShowSaveLoad(true)}
          >
            Save/Load Game
          </button>
        )}
      </div>
      {showSaveLoad && <SaveLoadMenu onClose={() => setShowSaveLoad(false)} />}
      </div>
  );
}

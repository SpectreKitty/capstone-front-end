import { useGameState } from '../../contexts/GameStateContext';
import { useGameUI } from '../../contexts/GameUIContext';
import { useAuth } from '../../contexts/AuthContext';
import SaveLoadMenu from '../menu/SaveLoadMenu';
import bgImage from '../../assets/images/backgrounds/start_img.jpeg'
import '../../styles/StartMenu.css';

export default function StartMenu() {
  const { updateGameState, gameState } = useGameState();
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
    <div className="menu-container" style={{ backgroundImage: `url(${bgImage}` }}>
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

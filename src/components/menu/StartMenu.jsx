import { useGameState } from '../../contexts/GameStateContext';
import bgImage from '../../assets/images/backgrounds/start_img.jpeg'
import '../../styles/StartMenu.css';

export default function StartMenu() {
  const { updateGameState } = useGameState();

  const handleStartGame = () => {
    updateGameState({
      currentScene: 'introduction',
      dialogueIndex: 0
    });
  };

  return (
    <div className="menu-container" style={{ backgroundImage: `url(${bgImage}` }}>
      <h1 className="game-title">Kindness Simulator</h1>
      <div className="menu-buttons">
        <button className="menu-button" onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
}

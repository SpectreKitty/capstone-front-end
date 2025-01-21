import Dialogue from '../common/Dialogue';
import { useGameState } from '../../contexts/GameStateContext';
import bgImage from '../../assets/images/backgrounds/start_img.jpeg';
import '../../styles/IntroductionScene.css'


export default function IntroductionScene() {
  const { gameState, updateGameState } = useGameState();

  const dialogues = [
    { character: "Narrator", text: "Welcome to our story..." },
    { character: "Main Character", text: "Where am I?" },
    { character: "Mysterious Voice", text: "You're about to begin an adventure..." },
  ];

  const handleDialogueComplete = () => {
    if (gameState.dialogueIndex < dialogues.length - 1) {
      updateGameState({ dialogueIndex: gameState.dialogueIndex + 1 });
      } else {
        updateGameState({
          currentScene: 'day1Scene',
          dialogueIndex: 0,
      });
    }
  };

  return (
    <div
      className="scene-container"
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <Dialogue
        { ...dialogues[gameState.dialogueIndex]}
        onComplete={handleDialogueComplete}
      />
    </div>
  );
}
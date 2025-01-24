import { useGameState } from "../../contexts/GameStateContext"
import Dialogue from '../common/Dialogue';
import sceneData from '../../data/sceneData.json'
import morningImage from '../../assets/images/backgrounds/morning-scene.jpeg'
import '../../styles/Day1Scene.css';

export const SceneBase = ({ sceneId }) => {
  const { gameState, updateGameState } = useGameState();
  const scene = sceneData.scenes[sceneId];
  const currentDialogue = scene.dialogues[gameState.dialogueIndex];

  const handleChoice = (choice) => {
    updateGameState({
      dialogueIndex: gameState.dialogueIndex + 1,
      selectedChoice: choice
    });
  };

  const handleDialogueComplete = () => {
    if (gameState.dialogueIndex < scene.dialogues.length - 1) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1
      });
    } else {
      updateGameState({
        currentScene: 'transition',
        transitionData: {
          nextScene: scene.nextScene,
          transitionText: 'Later...'
        }
      });
    }
  };

  return (
    <div className="scene-container"
      style={{ backgroundImage: `url(${morningImage})` }}>
        {currentDialogue.choices ? (
          <div className="choices-container">
            {currentDialogue.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-button"
                onClick={() => handleChoice(choice)}>
                  {choice.text}
                </button>
            ))}
          </div>
        ) : (
      <Dialogue
        {...currentDialogue}
        onComplete={handleDialogueComplete}/>
        )}
    </div>
  );
};

export const Day1MorningScene = () => <SceneBase sceneId="day1_morning" />;
export const Day1CommunityBoardScene = () => <SceneBase sceneId="day1_community_board" />;
export const Day1InteractionScene = () => <SceneBase sceneId="day1_interaction" />;
export const Day1NightScene = () => <SceneBase sceneId="day1_night" />;
export const Day2MorningScene = () => <SceneBase sceneId="day2_morning" />;
import { useGameState } from "../../contexts/GameStateContext";
import Dialogue from '../common/Dialogue';
import sceneData from '../../data/sceneData.json';
import morningImage from '../../assets/images/backgrounds/bedroom.png';
import nightImage from '../../assets/images/backgrounds/bedroom_night.png'
import boardImage from '../../assets/images/backgrounds/community_board.jpg';
import '../../styles/Scene.css';

export const SceneBase = ({ sceneId }) => {
  const { gameState, updateGameState } = useGameState();
  const scene = sceneData.scenes[sceneId];
  const currentDialogue = scene.dialogues[gameState.dialogueIndex];

  const getBackgroundImage = () => {
    if (sceneId.includes('community_board')) return boardImage;
    if (sceneId.includes('night')) return nightImage;
    return morningImage;
  };


  const handleDialogueComplete = () => {
    if (gameState.dialogueIndex < scene.dialogues.length - 1) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1,
        lastChoice: null
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

  const handleChoice = (choice) => {
    if (currentDialogue.choices) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1,
        lastChoice: choice
      });
    }
  };

  const renderContent = () => {
    if (!currentDialogue) return null;

    if (currentDialogue.choices) {
      return (
        <div className="dialogue-container">
          <div className="character-name">{currentDialogue.character}</div>
          <div className="dialogue-text">{currentDialogue.text}</div>
          <div className="choices-container">
            {currentDialogue.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-button"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (gameState.lastChoice) {
      return (
        <Dialogue
          {...gameState.lastChoice.response}
          onComplete={handleDialogueComplete}
        />
      );
    }

    return (
      <Dialogue
        {...currentDialogue}
        onComplete={handleDialogueComplete}
      />
    );
  };

  return (
    <div className="scene-container" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      <div className="dialogue-choices-container">
        {renderContent()}
      </div>
    </div>
  );
};

export const Day1MorningScene = () => <SceneBase sceneId="day1_morning" />;
export const Day1CommunityBoardScene = () => <SceneBase sceneId="day1_community_board" />;
export const Day1InteractionScene = () => <SceneBase sceneId="day1_interaction" />;
export const Day1NightScene = () => <SceneBase sceneId="day1_night" />;
export const Day2MorningScene = () => <SceneBase sceneId="day2_morning" />;
export const Day2CommunityBoardScene = () => <SceneBase sceneId="day2_community_board" />;
export const Day2InteractionScene = () => <SceneBase sceneId="day2_interaction" />;
export const Day2NightScene = () => <SceneBase sceneId="day2_night" />;
export const Day3MorningScene = () => <SceneBase sceneId="day3_morning" />;
export const Day3CommunityBoardScene = () => <SceneBase sceneId="day3_community_board" />;
export const Day3InteractionScene = () => <SceneBase sceneId="day3_interaction" />;
export const Day3NightScene = () => <SceneBase sceneId="day3_night" />;
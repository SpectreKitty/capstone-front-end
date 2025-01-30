import { useGameState } from "../../contexts/GameStateContext";
import Dialogue from '../common/Dialogue';
import Background from "../common/Background";
import { sceneBackgrounds, BACKGROUNDS } from "../utilities/SceneConfiguration";
import sceneData from '../../data/sceneData.json';
import Choices from '../common/Choices';
import OliveMemoryGame from '../games/OliveMemoryGame';
import SarahCatchingGame from '../games/SarahCatchingGame';
import GardenWeedingGame from "../games/GardenWeedingGame";
import '../../styles/Scene.css';

export const SceneBase = ({ sceneId }) => {
  const { gameState, updateGameState } = useGameState();
  const scene = sceneData.scenes[sceneId];
  const currentDialogue = scene.dialogues[gameState.dialogueIndex];

  const handleGameComplete = () => {
    updateGameState({
      dialogueIndex: gameState.dialogueIndex + 1,
      lastChoice: null
    });
  };

  const handleDialogueComplete = () => {
    if (gameState.dialogueIndex < scene.dialogues.length - 1) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1,
        lastChoice: null
      });
    } else {
      // Check if we're in day3_night (final scene)
      if (sceneId === 'day3_night') {
        // Transition to credits
        updateGameState({
          currentScene: 'credits',
          dialogueIndex: 0
        });
        return;
      }
  
      const currentDay = sceneId.match(/day(\d)/)?.[1];
      const nextDay = scene.nextScene.match(/day(\d)/)?.[1];
  
      // Handle day transitions for other night scenes
      if (sceneId.endsWith('_night') && nextDay !== currentDay && currentDay !== "3") {
        updateGameState({
          currentScene: 'day_transition',
          transitionData: {
            day: nextDay,
            nextScene: scene.nextScene
          },
          lastChoice: null
        });
      } else {
        updateGameState({
          currentScene: 'transition',
          transitionData: {
            nextScene: scene.nextScene,
            transitionText: 'Later...'
          },
          lastChoice: null
        });
      }
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

    if (gameState.lastChoice) {
      return (
        <Background imageSrc={sceneBackgrounds[sceneId] || BACKGROUNDS.DEFAULT}>
          <Dialogue
            {...gameState.lastChoice.response}
            onComplete={handleDialogueComplete}
          />
        </Background>
      );
    }

    if (currentDialogue.type === 'game') {
      // Determine which game to render based on the scene
      let GameComponent;
      switch(sceneId) {
        case 'day1_interaction':
          GameComponent = OliveMemoryGame;
          break;
        case 'day2_interaction':
          GameComponent = GardenWeedingGame;
          break;
        case 'day3_interaction':
          GameComponent = SarahCatchingGame;
          break;
        default:
          // Fallback to a default game or null
          GameComponent = null;
      }
    
      // Render the game if a component is found
      return GameComponent ? (
        <Background imageSrc={sceneBackgrounds[sceneId] || BACKGROUNDS.DEFAULT}>
          <GameComponent onGameComplete={handleGameComplete} />
        </Background>
      ) : null;
    }
    

  return (
    <Background imageSrc={sceneBackgrounds[sceneId] || BACKGROUNDS.DEFAULT}>
      <div className="w-full px-4">
        {currentDialogue.choices ? (
          <>
            <Choices
              choices={currentDialogue.choices}
              onChoice={handleChoice}
            />
            <Dialogue
              text={currentDialogue.text}
              character={currentDialogue.character}
            />
          </>
        ) : gameState.lastChoice ? (
          <Dialogue
            {...gameState.lastChoice.response}
            onComplete={handleDialogueComplete}
          />
        ) : (
          <Dialogue
            {...currentDialogue}
            onComplete={handleDialogueComplete}
          />
        )}
      </div>
    </Background>
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
export const OliveMemoryGameScene = () => <SceneBase sceneId="olive_memory" />;
export const SarahCatchingScene = () => <SceneBase sceneId="sarah_catching" />;
export const GardenWeedingScene = () => <SceneBase sceneId="garden_weeding" />;
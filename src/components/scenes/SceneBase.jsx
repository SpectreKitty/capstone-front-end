import { useGameState } from '../../contexts/GameStateContext';
import { useDialogue } from '../../hooks/useDialogue';
import { useSceneTransition } from '../../hooks/useSceneTransition';
import Dialogue from '../common/Dialogue';
import Background from '../common/Background';
import { sceneBackgrounds, BACKGROUNDS } from '../utilities/SceneConfiguration';
import Choices from '../common/Choices';
import OliveMemoryGame from '../games/OliveMemoryGame';
import SarahCatchingGame from '../games/SarahCatchingGame';
import GardenWeedingGame from '../games/GardenWeedingGame';
import sceneData from '../../data/sceneData.json';

export const SceneBase = ({ sceneId }) => {
  const { gameState, updateGameState } = useGameState();
  const { currentDialogue, advanceDialogue, handleChoice } = useDialogue();
  const { transitionToScene, startDayTransition } = useSceneTransition();

  const scene = sceneData.scenes[sceneId];

  const handleGameComplete = () => {
    advanceDialogue();
  };

  const handleDialogueComplete = () => {
    const hasMoreDialogue = advanceDialogue();
    
    if (!hasMoreDialogue) {
      // No more dialogue, handle scene transition
      if (sceneId === 'day3_night') {
        updateGameState({
          currentScene: 'credits',
          dialogueIndex: 0,
          lastChoice: null,
        });
        return;
      }

      const currentDay = sceneId.match(/day(\d)/)?.[1];
      const nextDay = scene.nextScene.match(/day(\d)/)?.[1];

      // Check for day transition first
      if (sceneId.endsWith('_night') && nextDay !== currentDay && currentDay !== "3") {
        startDayTransition(nextDay);
        return; // Important: return here to prevent the regular transition
      } 
      // Only reach here if it's not a day transition
      transitionToScene(scene.nextScene);
    }
  };


  // Handle last choice display
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

  // Handle game segments
  if (currentDialogue?.type === 'game') {
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
        GameComponent = null;
    }

    return GameComponent ? (
      <Background imageSrc={sceneBackgrounds[sceneId] || BACKGROUNDS.DEFAULT}>
        <GameComponent onGameComplete={handleGameComplete} />
      </Background>
    ) : null;
  }

  // Handle regular dialogue and choices
  return (
    <Background imageSrc={sceneBackgrounds[sceneId] || BACKGROUNDS.DEFAULT}>
      <div className="w-full px-4">
        {currentDialogue?.choices ? (
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

// Scene exports
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

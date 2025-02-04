import { useGameState } from '../contexts/GameStateContext';
import sceneData from '../data/sceneData.json';

export const useDialogue = () => {
  const { gameState, updateGameState } = useGameState();
  
  const getCurrentDialogue = () => {
    const scene = sceneData.scenes[gameState.currentScene];
    return scene?.dialogues[gameState.dialogueIndex];
  };

  const advanceDialogue = () => {
    const scene = sceneData.scenes[gameState.currentScene];
    if (gameState.dialogueIndex < scene.dialogues.length - 1) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1,
        lastChoice: null
      });
      return true;
    }
    return false;
  };

  const handleChoice = (choice) => {
    updateGameState({
      dialogueIndex: gameState.dialogueIndex + 1,
      lastChoice: choice
    });
  };
  
  return {
    currentDialogue: getCurrentDialogue(),
    dialogueIndex: gameState.dialogueIndex,
    advanceDialogue,
    handleChoice,
    hasNextDialogue: () => {
      const scene = sceneData.scenes[gameState.currentScene];
      return gameState.dialogueIndex < scene.dialogues.length - 1;
    }
  };
}
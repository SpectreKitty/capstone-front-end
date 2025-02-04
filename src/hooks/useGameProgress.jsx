import { useGameState } from '../contexts/GameStateContext';

export const useGameProgress = () => {
  const { gameState } = useGameState();
  
  return {
    currentDay: gameState.currentDay,
    currentScene: gameState.currentScene,
    dialogueIndex: gameState.dialogueIndex,
    isGameComplete: gameState.currentScene === 'credits',
    isInTransition: gameState.currentScene === 'transition' || 
                    gameState.currentScene === 'day_transition'
  };
}

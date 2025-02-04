import { useGameState } from '../contexts/GameStateContext';

export const useSceneTransition = () => {
  const { gameState, updateGameState } = useGameState();

  const transitionToScene = (nextScene, transitionText = 'Later...') => {
    updateGameState({
      currentScene: 'transition',
      transitionData: {
        nextScene,
        transitionText
      },
      lastChoice: null
    });
  };

  const startDayTransition = (nextDay) => {
    updateGameState({
      currentScene: 'day_transition',
      transitionData: {
        day: nextDay,
        nextScene: `day${nextDay}_morning`
      },
      lastChoice: null
    });
  };

  return { 
    transitionToScene, 
    startDayTransition,
    currentTransition: gameState.transitionData
  };
}

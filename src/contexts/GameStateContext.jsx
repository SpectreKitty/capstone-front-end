import { createContext, useContext, useState } from 'react';
import { useGameUI } from './GameUIContext';

const GameStateContext = createContext(null);

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    currentScene: 'menu',
    currentDay: 1,
    dialogueIndex: 0,
    transitionData: {
      nextScene: '',
      transitionText: '',
    },
    choices: {},
    inventory: [],
    flags: {}
  });
  const { showError } = useGameUI();

  const updateGameState = (updates) => {
    try {
      setGameState(prev => ({ ...prev, ...updates }));
    } catch (error) {
      showError('Failed to update game state');
      console.error('Game state update error:', error);
    }
  };

  const resetGameState = () => {
    setGameState({
      currentScene: 'menu',
      currentDay: 1,
      dialogueIndex: 0,
      transitionData: {
        nextScene: '',
        transitionText: '',
      },
      choices: {},
      inventory: [],
      flags: {}
    });
  };

  const value = {
    gameState,
    updateGameState,
    resetGameState
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
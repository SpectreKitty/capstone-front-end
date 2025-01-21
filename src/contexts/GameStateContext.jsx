import { createContext, useState, useContext } from 'react';

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState({
    currentScene: 'menu',
    dialogueIndex: 0,
    choices: {},
    inventory: [],
    flags: {},
  })

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates}));
  };

  return (
    <GameStateContext.Provider value = {{ gameState, updateGameState}}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
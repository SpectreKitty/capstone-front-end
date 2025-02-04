import { createContext, useContext, useState, useCallback } from 'react';

const GameUIContext = createContext(null);

export function GameUIProvider({ children }) {
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  }, []);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  const value = {
    showSaveLoad,
    setShowSaveLoad,
    isMuted,
    setIsMuted,
    isLoading,
    error,
    showError,
    startLoading,
    stopLoading
  };

  return (
    <GameUIContext.Provider value={value}>
      {error && (
        <div className="error-toast">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      {children}
    </GameUIContext.Provider>
  );
}

export function useGameUI() {
  const context = useContext(GameUIContext);
  if (!context) {
    throw new Error('useGameUI must be used within a GameUIProvider');
  }
  return context;
}

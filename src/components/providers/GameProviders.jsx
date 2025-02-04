import { AuthProvider } from '../../contexts/AuthContext';
import { GameUIProvider } from '../../contexts/GameUIContext';
import { SaveProvider } from '../../contexts/SaveContext';
import { GameStateProvider } from '../../contexts/GameStateContext';

export function GameProviders({ children }) {
  return (
    <GameUIProvider>
      <AuthProvider>
          <GameStateProvider>
            <SaveProvider>
              {children}
            </SaveProvider>
          </GameStateProvider>
        </AuthProvider>
      </GameUIProvider>
    );
  }

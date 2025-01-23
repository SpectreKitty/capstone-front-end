import { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInAnonymously as firebaseSignInAnonymously, 
  createUserWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
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
    flags: {},
    user: null,
    isLoggedIn: false
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      if (user) {
        updateGameState({
          user: user,
          isLoggedIn: true
        });
      } else {
        updateGameState({
          user: null,
          isLoggedIn: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      updateGameState({
        user: userCredential.user,
        isLoggedIn: true
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
      updateGameState({
        user: userCredential.user,
        isLoggedIn: true
      });
      return { success: true };
    } catch(error) {
      return { success: false, error: error.message};
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      updateGameState({
        user: null,
        isLoggedIn: false,
        currentScene: 'menu'
      });
      return { success: true};
    } catch(error) {
      return { success: false, error: error.message };
    }
  };

  const signInAnonymously = async () => {
    try {
      const result = await firebaseSignInAnonymously(auth);
      updateGameState({
        user: result.user,
        isLoggedIn: true
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates}));
  };

  return (
    <GameStateContext.Provider value = {{ 
      gameState, 
      updateGameState,
      login,
      register,
      signInAnonymously,
      logout
      }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
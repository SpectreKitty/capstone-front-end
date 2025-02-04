import { createContext, useState, useContext, useEffect } from 'react';
//Firebase authentication and Firestore imports
import { 
  signInWithEmailAndPassword, 
  signInAnonymously as firebaseSignInAnonymously, 
  createUserWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDoc, getDocs, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';

//creates context for game state management 
//so data doesn't need to be brought in through props
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

//Listens for firebase authentication state changes
  useEffect(() => {
    //updates game state based on auth status
    const unsubscribe = auth.onAuthStateChanged((user) => {
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

// Handles firebase email/password login
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

// Handles creating a new account
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

// Handles logout
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

// Handles anonymous authentication
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

//Handles saving a game and ties it to userId
  const saveGame = async (saveName) => {
    try {
      const saveData = {
        userId: gameState.user.uid,
        saveName, 
        timestamp: new Date().toISOString(),
        gameData: {
          currentScene: gameState.currentScene,
          currentDay: gameState.currentDay,
          dialogueIndex: gameState.dialogueIndex,
          choices: gameState.choices,
        }
      };

      await addDoc(collection(db, 'saves'), saveData);
      return { success: true, message: 'Game saved successfully!' };
    } catch (error) {
      console.error('Save error:', error)
      return { success: false, error: error.message };
    }
  };

//Handles loading a save based on userId
  const loadSaves = async () => {
    try {
      const savesRef = collection(db, 'saves');
      const q = query(
        savesRef,
        where('userId', '==', gameState.user.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const saves = [];
      querySnapshot.forEach((doc) => {
        const saveData = { id: doc.id, ...doc.data() }
        saves.push(saveData);
      });

      return { success: true, saves };
    } catch (error) {
      console.error("Error loading saves:", error)
      return { success: false, error: error.message };
    }
  };

// brings up an already saved game
  const loadGame = async (saveId) => {
    try {
      const docRef = doc(db, 'saves', saveId);
      const saveDoc = await getDoc(docRef);

      if (saveDoc.exists()) {
        const saveData = saveDoc.data();
        updateGameState(saveData.gameData);
        return { success: true };
      }
      return { success: false, error: 'Save not found' };
    } catch (error) {
      return { success: false, error: error.message}
    }
  };

// deletes a save
  const deleteSave = async (saveId) => {
    try {
      // Delete the save from the database
      await deleteDoc(doc(db, 'saves', saveId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting save:', error);
      return { success: false, error: 'Failed to delete save' };
    }
  };

  return (

      <GameStateContext.Provider value = {{ 
        gameState, 
        updateGameState,
        login,
        register,
        signInAnonymously,
        logout,
        saveGame,
        loadSaves,
        loadGame,
        deleteSave
        }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
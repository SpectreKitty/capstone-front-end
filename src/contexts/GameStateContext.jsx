import { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInAnonymously as firebaseSignInAnonymously, 
  createUserWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDoc, getDocs, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';

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

  const saveGame = async (saveName) => {
    try {
      console.log('User ID:', gameState.user?.uid);
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

  const loadSaves = async () => {
    try {
      console.log('Querying saves for User ID:', gameState.user.uid);
      const savesRef = collection(db, 'saves');
      const q = query(
        savesRef,
        where('userId', '==', gameState.user.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      console.log('Query snapshot size:', querySnapshot.size);
      const saves = [];
      querySnapshot.forEach((doc) => {
        const saveData = { id: doc.id, ...doc.data() }
        console.log('Individual save:', saveData);
        saves.push(saveData);
      });

      return { success: true, saves };
    } catch (error) {
      console.error("Error loading saves:", error)
      return { success: false, error: error.message };
    }
  };

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
import { createContext, useContext } from 'react';
import { db } from '../firebase/firebase';
import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  query, 
  where, 
  orderBy, 
  deleteDoc 
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { useGameUI } from './GameUIContext';
import { useGameState } from './GameStateContext';

const SaveContext = createContext(null);

export function SaveProvider({ children }) {
  const { user } = useAuth();
  const { startLoading, stopLoading, showError } = useGameUI();
  const { updateGameState } = useGameState();

  const saveGame = async (saveName, gameState) => {
    if (!user) return { success: false, error: 'Must be logged in to save' };
    
    try {
      startLoading();
      const saveData = {
        userId: user.uid,
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
      showError('Failed to save game');
      return { success: false, error: error.message };
    } finally {
      stopLoading();
    }
  };

  const loadSaves = async () => {
    if (!user) return { success: false, error: 'Must be logged in to load saves' };

    try {
      startLoading();
      const savesRef = collection(db, 'saves');
      const q = query(
        savesRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const saves = [];
      querySnapshot.forEach((doc) => {
        saves.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, saves };
    } catch (error) {
      showError('Failed to load saves');
      return { success: false, error: error.message };
    } finally {
      stopLoading();
    }
  };

  const loadGame = async (saveId) => {
    if (!user) return { success: false, error: 'Must be logged in to load game' };

    try {
      startLoading();
      const docRef = doc(db, 'saves', saveId);
      const saveDoc = await getDoc(docRef);

      if (!saveDoc.exists()) {
        throw new Error('Save not found');
      }

      const saveData = saveDoc.data().gameData;
      // Update game state with loaded data
      updateGameState({
        currentScene: saveData.currentScene,
        currentDay: saveData.currentDay,
        dialogueIndex: saveData.dialogueIndex,
        choices: saveData.choices || {},
      });
      
      return { success: true };
      
    } catch (error) {
      showError('Failed to load game');
      return { success: false, error: error.message };
    } finally {
      stopLoading();
    }
  };

  const deleteSave = async (saveId) => {
    if (!user) return { success: false, error: 'Must be logged in to delete saves' };

    try {
      startLoading();
      await deleteDoc(doc(db, 'saves', saveId));
      return { success: true };
    } catch (error) {
      showError('Failed to delete save');
      return { success: false, error: error.message };
    } finally {
      stopLoading();
    }
  };

  const value = {
    saveGame,
    loadSaves,
    loadGame,
    deleteSave
  };

  return (
    <SaveContext.Provider value={value}>
      {children}
    </SaveContext.Provider>
  );
}

export function useSave() {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
}

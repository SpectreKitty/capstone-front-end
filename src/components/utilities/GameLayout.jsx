import { useState } from "react";
import LogoutButton from "../menu/LogoutButton";
import SaveLoadMenu from '../menu/SaveLoadMenu';
import { useGameState } from "../../contexts/GameStateContext";
import BackgroundMusic from "../common/BackgroundMusic";
import sceneData from '../../data/sceneData.json';
import CharacterPortrait from "../common/CharacterPortrait";

function GameLayout({ children }) {
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const { gameState } = useGameState();

  // Get current dialogue and next dialogue from scene data if available
  const currentDialogue = gameState.dialogueIndex !== undefined && gameState.currentScene
    ? sceneData.scenes[gameState.currentScene]?.dialogues[gameState.dialogueIndex]
    : null;

  // Check if current dialogue is a game segment
  const isGameSegment = () => {
    return currentDialogue?.type === 'game';
  };


  
  // Function to determine the fixed position for each character
  const getCharacterPosition = (character) => {
    // Add character positions here based on your game's characters
    switch(character) {
      case "Main Character":
        return "left";
      default:
        return "right";
    }
  };

  // Function to check if character is currently speaking
  const isCharacterSpeaking = (character) => {
    return currentDialogue?.character === character;
  };

  // Get all unique characters in the current scene
  const getCurrentSceneCharacters = () => {
    if (!gameState.currentScene || !sceneData.scenes[gameState.currentScene]) return [];
    
    const characters = new Set();
    sceneData.scenes[gameState.currentScene].dialogues.forEach(dialogue => {
      if (dialogue.character && dialogue.character !== "Narrator") {
        characters.add(dialogue.character);
      }
    });
    return Array.from(characters);
  };

  return (
    <>
      {gameState.isLoggedIn && (
        <>
          <BackgroundMusic />
          <LogoutButton />
          <button 
            className="save-load-button"
            onClick={() => setShowSaveLoad(true)}
          >
            Save/Load
          </button>
          {showSaveLoad && <SaveLoadMenu onClose={() => setShowSaveLoad(false)} />}
        </>
      )}

      {/* Render all characters in the scene */}
      {!isGameSegment() && getCurrentSceneCharacters().map(character => (
        <CharacterPortrait 
          key={character}
          character={character}
          position={getCharacterPosition(character)}
          isSpeaking={isCharacterSpeaking(character)}
        />
      ))}

      {children}
    </>
  );
}

export default GameLayout;
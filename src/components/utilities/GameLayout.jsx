import LogoutButton from "../menu/LogoutButton";
import SaveLoadMenu from '../menu/SaveLoadMenu';
import BackgroundMusic from "../common/BackgroundMusic";
import sceneData from '../../data/sceneData.json';
import CharacterPortrait from "../common/CharacterPortrait";
import { useGameProgress, useDialogue, useAuth, useGameUI} from '../../contexts';

export default function GameLayout({ children }) {
  const { showSaveLoad, setShowSaveLoad } = useGameUI();
  const { isLoggedIn } = useAuth();
  const { currentScene } = useGameProgress();
  const { currentDialogue } = useDialogue();

  const isGameSegment = () => {
    return currentDialogue?.type === 'game';
  };

  const getCharacterPosition = (character) => {
    switch(character) {
      case "Main Character":
        return "left";
      default:
        return "right";
    }
  };

  const isCharacterSpeaking = (character) => {
    return currentDialogue?.character === character;
  };

  const getCurrentSceneCharacters = () => {
    if (!currentScene || !sceneData.scenes[currentScene]) return [];
    
    const characters = new Set();
    sceneData.scenes[currentScene].dialogues.forEach(dialogue => {
      if (dialogue.character && dialogue.character !== "Narrator") {
        characters.add(dialogue.character);
      }
    });
    return Array.from(characters);
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <BackgroundMusic />
          <LogoutButton />
          {currentScene !== 'menu' && (
            <button 
              className="save-load-button"
              onClick={() => setShowSaveLoad(true)}
            >
              Save/Load
            </button>
          )}
          {showSaveLoad && <SaveLoadMenu onClose={() => setShowSaveLoad(false)} />}
        </>
      )}

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

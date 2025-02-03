import '../../styles/CharacterPortrait.css';
import mainCharacterImage from '../../assets/images/characters/maincharacter.png';
import mrChenImage from '../../assets/images/characters/mrchen.png';
import sarahImage from '../../assets/images/characters/sarah.png';
import roseImage from '../../assets/images/characters/rose.png';
import mysteriousStranger from '../../assets/images/characters/mysteriousstranger.png';

const CHARACTER_CONFIG = {
  "Main Character": {
    image: mainCharacterImage,
  },
  "Sarah": {
    image: sarahImage,
  },
  "Mr. Chen": {
    image: mrChenImage,
    shouldFlip: true,
  },
  "Rose": {
    image: roseImage,
    shouldFlip: true,
  },
  "Mysterious Stranger": {
    image: mysteriousStranger,
  }
};

const CharacterPortrait = ({ character, position = 'right', isSpeaking = true }) => {
  if (!character || character === "Narrator" || !CHARACTER_CONFIG[character]) return null;

  const characterConfig = CHARACTER_CONFIG[character];
  const shouldFlipImage = characterConfig.shouldFlip;

  return (
    <div className={`character-portrait-container ${position}`}>
      <img 
        src={CHARACTER_CONFIG[character].image}
        alt={character}
        className={`character-portrait-image 
          ${!isSpeaking ? 'dimmed' : ''} 
          ${shouldFlipImage ? 'flipped' : ''}`}
      />
    </div>
  );
};

export default CharacterPortrait;
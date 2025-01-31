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
  },
  "Rose": {
    image: roseImage,
  },
  "Mysterious Stranger": {
    image: mysteriousStranger,
  }
};

const CharacterPortrait = ({ character, position = 'right', isSpeaking = true }) => {
  if (!character || character === "Narrator" || !CHARACTER_CONFIG[character]) return null;

  const getClassName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className={`character-portrait-container ${position}`}>
      <img 
        src={CHARACTER_CONFIG[character].image}
        alt={character}
        className={`character-portrait-image ${getClassName(character)}-border ${!isSpeaking ? 'dimmed' : ''}`}
      />
    </div>
  );
};

export default CharacterPortrait;
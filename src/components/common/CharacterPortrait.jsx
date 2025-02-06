import '../../styles/CharacterPortrait.css';

const CHARACTER_CONFIG = {
  "Main Character": {
    image: '/assets/images/characters/maincharacter.png',
  },
  "Sarah": {
    image: '/assets/images/characters/sarah.png',
  },
  "Mr. Chen": {
    image: '/assets/images/characters/mrchen.png',
    shouldFlip: true,
  },
  "Rose": {
    image: '/assets/images/characters/rose.png',
    shouldFlip: true,
  },
  "Mysterious Stranger": {
    image: '/assets/images/characters/mysteriousstranger.png',
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
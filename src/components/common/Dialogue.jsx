import { useState, useEffect } from 'react';
import '../../styles/Dialogue.css';

export default function Dialogue({ text, character, onComplete }) {
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = () => {
    if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
  }
};

  useEffect(() => {
    setIsComplete(false);
  }, [text]);

  const getClassName = (name) => {
    if (!name) return '';
    // First replace period and space with single hyphen
    return name.toLowerCase().replace(/[.\s]+/g, '-');
  };
  

  return (
    <div className="dialogue-container relative" onClick={handleClick}>
      <div className="dialogue-content">
        {character && (
          <div className={`character-name ${getClassName(character)}-text`}>
            {character}
          </div>
        )}
        <div className="dialogue-text">
          {text}
        </div>
        <div className="continue-indicator">
            ▼
        </div>
      </div>
      </div>
    );
  }
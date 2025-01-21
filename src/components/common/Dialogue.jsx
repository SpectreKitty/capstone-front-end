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


	return (
		<div
			className="dialogue-container" onClick={handleClick}>
			{character && (
				<div className="character-name">{character}</div>
			)}
		<div className="dialogue-text">{text}</div>
	</div>
	);
}
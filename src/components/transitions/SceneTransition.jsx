import '../../styles/SceneTransition.css'
import { useEffect, useState } from "react";
import { useGameState } from '../../contexts/GameStateContext';

export default function SceneTransition({ nextScene, transitionText }) {
  const { updateGameState } = useGameState();
  const [opacity, setOpacity] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setOpacity(1);
    setTimeout(() => setShowText(true), 1000);

    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        updateGameState({
          currentScene: nextScene,
          dialogueIndex: 0,
        });
      }, 1000);
    }, 3000);
  }, []);

  return (
    <div className="transition-container" style={{ opacity }}>
      {showText && (
        <div className="transition-text"> {transitionText}</div>
      )}
    </div>
  );
}
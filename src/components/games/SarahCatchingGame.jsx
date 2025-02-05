import '../../styles/SarahCatchingGame.css'
import { useState, useEffect, useCallback, useRef } from 'react';

const SarahCatchingGame = ({ onGameComplete }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [basketPosition, setBasketPosition] = useState(50);
  const [items, setItems] = useState([]);
  const [missedItems, setMissedItems] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const itemsRef = useRef([]);
  const WINNING_SCORE = 15;
  const MAX_MISSED = 5;

  const possibleItems = ['👶', '🧸', '🧺', '🧼', '🛏️', '🧩', '🧴', '📚', '🧷', '🧰', '🧦', '🧻', '🚿', '🪒', '🧽'];

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setBasketPosition(50);
    setItems([]);
    setMissedItems(0);
    setShowWinMessage(false);
    itemsRef.current = [];
  };

  const createItem = useCallback(() => {
    return {
      id: Math.random(),
      type: possibleItems[Math.floor(Math.random() * possibleItems.length)],
      position: Math.random() * 90,
      top: -10,
      counted: false
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setBasketPosition(prev => Math.max(0, prev - 8));
      } else if (e.key === 'ArrowRight') {
        setBasketPosition(prev => Math.min(90, prev + 8));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const itemInterval = setInterval(() => {
      if (itemsRef.current.length < 5) {
        const newItem = createItem();
        itemsRef.current = [...itemsRef.current, newItem];
        setItems(itemsRef.current);
      } 
      else if (itemsRef.current.length < 8 && Math.random() > 0.2) {
        const newItem = createItem();
        itemsRef.current = [...itemsRef.current, newItem];
        setItems(itemsRef.current);
      }
    }, 800);

    const moveInterval = setInterval(() => {
      itemsRef.current = itemsRef.current.map(item => ({
        ...item,
        top: item.top + 1.5
      }));

      const caughtItems = itemsRef.current.filter(item => 
        !item.counted &&
        item.top >= 85 &&
        item.top <= 95 &&
        Math.abs(item.position - basketPosition) < 10
      );

      if (caughtItems.length > 0) {
        setScore(prev => {
          const newScore = prev + caughtItems.length;
          if (newScore >= WINNING_SCORE && !gameOver) {
            setGameOver(true);
            setShowWinMessage(true);
            if (onGameComplete) {
              setTimeout(() => onGameComplete(), 1500);
            }
          }
          return newScore;
        });
        caughtItems.forEach(item => {
          item.counted = true;
        });
      }

      const missedNewItems = itemsRef.current.filter(item => !item.counted && item.top > 95);

      if (missedNewItems.length > 0) {
        missedNewItems.forEach(item => {
          item.counted = true;
        });
        setMissedItems(prev => {
          const newMissed = prev + missedNewItems.length;
          if (newMissed >= MAX_MISSED) {
            setGameOver(true);
          }
          return newMissed;
        });
      }

      itemsRef.current = itemsRef.current.filter(item => 
        item.top <= 95 &&
        !caughtItems.includes(item)
      );

      setItems([...itemsRef.current]);
    }, 40);

    return () => {
      clearInterval(itemInterval);
      clearInterval(moveInterval);
    };
  }, [gameOver, basketPosition, createItem, onGameComplete]);

  return (
    <div className="catching-game-container">
      <div className="game-area">
        <div className="score-display">
          Score: {score} / {WINNING_SCORE}
        </div>
        <div className="missed-display">
          Missed: {missedItems} / {MAX_MISSED}
        </div>

        {items.map(item => (
          <div
            key={item.id}
            className="falling-item"
            style={{
              left: `${item.position}%`,
              top: `${item.top}%`,
            }}
          >
            {item.type}
          </div>
        ))}

        <div
          className="basket"
          style={{
            left: `${basketPosition}%`,
            bottom: '5%',
          }}
        >
          🧺
        </div>

        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <h2 className="game-over-title">
                {showWinMessage? 'You Won!': 'Try Again!'}
              </h2>
              <p className="game-over-score">Final Score: {score}</p>
              {!showWinMessage && (
                <button
                  onClick={resetGame}
                  className="restart-button"
                >
                  Restart
                </button>
              )}
            </div>
          </div>
        )}

        {!gameOver && (
          <div className="instructions">
            Use ← → arrow keys to move the basket
          </div>
        )}
      </div>
    </div>
  );
};

export default SarahCatchingGame;

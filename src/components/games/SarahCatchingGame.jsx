import { useState, useEffect, useCallback } from 'react';
import '../../styles/CatchingGame.css';

const SarahCatchingGame = ({ onGameComplete }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [basketPosition, setBasketPosition] = useState(50);
  const [items, setItems] = useState([]);
  const [missedItems, setMissedItems] = useState(0);
  const WINNING_SCORE = 15;
  const MAX_MISSED = 5;

  const possibleItems = ['👶', '🧸', '🧺', '🧼', '🛏️', '🧩', '🧴', '📚', '🧷', '🧰', '🧦', '🧻', '🚿', '🪒', '🧽'];

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setBasketPosition(50);
    setItems([]);
    setMissedItems(0);
  };

  const createItem = useCallback(() => {
    return {
      id: Math.random(),
      type: possibleItems[Math.floor(Math.random() * possibleItems.length)],
      position: Math.random() * 90,
      top: -10,
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
      // Always spawn at least one item if there are less than 3 items
      if (items.length < 3) {
        setItems(prev => [...prev, createItem()]);
      } 
      // Randomly spawn additional items if there are less than 6 total
      else if (items.length < 6 && Math.random() > 0.5) {
        setItems(prev => [...prev, createItem()]);
      }
    }, 1000);

    const moveInterval = setInterval(() => {
      setItems(prev => {
        const newItems = prev.map(item => ({
          ...item,
          top: item.top + 1.5
        }));

        const caughtItems = newItems.filter(item => 
          item.top >= 85 &&
          item.top <= 95 &&
          Math.abs(item.position - basketPosition) < 10
        );

        const missedNewItems = newItems.filter(item => item.top > 95);
        if (missedNewItems.length > 0) {
          setMissedItems(prev => prev + missedNewItems.length);
        }

        if (caughtItems.length > 0) {
          setScore(prev => prev + caughtItems.length);
        }

        return newItems.filter(item => 
          item.top <= 95 &&
          !caughtItems.includes(item)
        );
      });
    }, 40);

    return () => {
      clearInterval(itemInterval);
      clearInterval(moveInterval);
    };
  }, [gameOver, basketPosition, createItem]);

  useEffect(() => {
    if (score >= WINNING_SCORE) {
      setGameOver(true);
      onGameComplete?.(true);
    } else if (missedItems >= MAX_MISSED) {
      setGameOver(true);
    }
  }, [score, missedItems, onGameComplete]);

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
                {score >= WINNING_SCORE ? 'You Won!' : 'Try Again!'}
              </h2>
              <p className="game-over-score">Final Score: {score}</p>
              {score < WINNING_SCORE && (
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
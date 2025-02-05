import '../../styles/GardenWeedingGame.css';
import { useState, useEffect } from 'react';

const GardenWeedingGame = ({ onGameComplete }) => {
  const [weeds, setWeeds] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isGameOver, setIsGameOver] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [winState, setWinState] = useState(false);

  // Initialize game with random weeds
  const initializeGame = () => {
    const initialWeeds = Array.from({ length: 8 }, (_, index) => ({
      id: index,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      health: Math.floor(Math.random() * 5) + 1, // 1-5 pulls needed
      size: Math.random() * 20 + 30,
    }));
    setWeeds(initialWeeds);
    setScore(0);
    setTimeLeft(20);
    setIsGameOver(false);
    setWinState(false);
    setInitialized(true);
  };
  
  useEffect(() => {
    initializeGame();
  }, []);


  // Timer countdown
  useEffect(() => {
    if (!initialized || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          setWinState(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialized, isGameOver]);

  // Check win condition
  useEffect(() => {
    if (initialized && weeds.length === 0 && !isGameOver) {
      setIsGameOver(true);
      setWinState(true);
      setTimeout(() => {
        onGameComplete();
      }, 1500);
    }
  }, [weeds, isGameOver, initialized, onGameComplete]);

  const handleWeedPull = (event, weedId) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isGameOver) return;

    setWeeds(prevWeeds => {
      const updatedWeeds = prevWeeds.map(weed => {
        if (weed.id === weedId) {
          const newHealth = weed.health - 1;
          if (newHealth <= 0) {
            setScore(prev => prev + 100);
            return null;
          }
          return { ...weed, health: newHealth };
        }
        return weed;
      }).filter(Boolean);

      return updatedWeeds;
    });
  };

  return (
    <div className="weeding-game-container">
      <div className="garden-bg-overlay">
        <div className="game-hud">
          <div className="score">Score: {score}</div>
          <div className="timer">Time: {timeLeft}s</div>
        </div>

        <div className="garden-plot">
          {weeds.map(weed => (
            <div
              key={weed.id}
              className={`weed pulls-${weed.health}`}
              style={{
                left: `${weed.x}%`,
                top: `${weed.y}%`,
                width: `${weed.size}px`,
                height: `${weed.size}px`,
                cursor: 'pointer',
                position: 'absolute',
                userSelect: 'none'
              }}
              onClick={(e) => handleWeedPull(e, weed.id)}
            >
              🌿
              <div className="weed-health">
                {Array(weed.health).fill('●').join(' ')}
              </div>
            </div>
          ))}
        </div>

        {isGameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <h2 className="game-over-title">
                {winState ? '🌺 Garden Cleared! 🌺' : '⏰ Time\'s Up! ⏰'}
              </h2>
              <p className="game-over-details">Final Score: {score}</p>
              <p className="game-over-details">Weeds Remaining: {weeds.length}</p>
              {winState ? (
                <p className="win-message">The garden looks beautiful now!</p>
              ) : (
                <>
                  <p className="lose-message">Keep practicing your gardening skills!</p>
                  <button 
                    className="restart-button"
                    onClick={initializeGame}
                  >
                    Try Again
                  </button>
                  </>
              )}
            </div>
          </div>
        )}

        {!isGameOver && (
          <div className="instructions">
            Click on weeds to remove them. Some weeds need multiple clicks!
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenWeedingGame;
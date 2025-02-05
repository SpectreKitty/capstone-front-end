import '../../styles/OliveMemoryGame.css';
import { useState, useEffect, useCallback } from 'react';

const generateCards = () => {
  const cardSymbols = [
    '🐱', '🏡', '🌿', '🐾', 
    '🐈', '🧸', '🌳', '🐭'
  ];
  
  return [...cardSymbols, ...cardSymbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
};

const OliveMemoryGame = ({ onGameComplete }) => {
  const [cards, setCards] = useState(generateCards());
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleCardFlip = useCallback((cardId) => {
    if (isLocked) return;

    setCards(prevCards => {
      // Find the card being flipped
      const clickedCard = prevCards.find(card => card.id === cardId);
      
      // If card is already flipped or matched, don't allow flipping
      if (clickedCard.isFlipped || clickedCard.isMatched) return prevCards;

      // Count currently flipped but unmatched cards
      const flippedCards = prevCards.filter(card => card.isFlipped && !card.isMatched);

      // If we already have one card flipped
      if (flippedCards.length === 1) {
        setAttempts(prev => prev + 1);
        const firstCard = flippedCards[0];
        
        // Check for match
        if (firstCard.symbol === clickedCard.symbol) {
          // Match found - mark both cards as matched
          return prevCards.map(card => 
            (card.id === cardId || card.id === firstCard.id)
              ? { ...card, isFlipped: true, isMatched: true }
              : card
          );
        } else {
          // No match - flip the second card, then flip both back
          setIsLocked(true); // Lock the board before flipping second card
          
          const newCards = prevCards.map(card =>
            card.id === cardId ? { ...card, isFlipped: true } : card
          );

          // Set timeout to flip cards back
          setTimeout(() => {
            setCards(currentCards =>
              currentCards.map(card =>
                (card.id === cardId || card.id === firstCard.id)
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setIsLocked(false); // Unlock the board after cards are flipped back
          }, 1000);

          return newCards;
        }
      }

      // First card of pair - just flip it
      return prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      );
    });
  }, [isLocked]);

  const restartGame = () => {
    setCards(generateCards());
    setAttempts(0);
    setIsLocked(false);
  };

  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched) {
      setTimeout(() => {
        onGameComplete();
      }, 3000);
    }
  }, [cards, onGameComplete]);

  const matchedPairs = cards.filter(card => card.isMatched).length / 2;

  return (
    <div className="memory-game-container">
      <div className="memory-game-overlay">
        <div className="memory-game-header">
          <h2>Catch Olive!</h2>
        </div>
        
        <div className="memory-game-stats">
          <p>Attempts: {attempts}</p>
          <p>Pairs Found: {matchedPairs}/8</p>
        </div>

        {matchedPairs === 8 ? (
          <div className="memory-game-win-overlay">
            <h2>Olive Caught!</h2>
            <p>Completed in {attempts} attempts</p>
          </div>
        ) : (
          <>
            <div className="memory-game-grid">
              {cards.map(card => (
                <div 
                  key={card.id}
                  onClick={() => handleCardFlip(card.id)}
                  className={`memory-card ${
                    card.isMatched 
                      ? 'memory-card-matched' 
                      : card.isFlipped 
                        ? 'memory-card-flipped' 
                        : 'memory-card-hidden'
                  }`}
                >
                  <div className="memory-card-inner">
                    <div className="memory-card-front">?</div>
                    <div className="memory-card-back">{card.symbol}</div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={restartGame}
              className="memory-game-restart"
            >
              Restart Game
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OliveMemoryGame;
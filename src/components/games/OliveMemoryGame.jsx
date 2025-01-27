import React, { useState, useEffect, useCallback } from 'react';
import bgImage from '../../assets/images/backgrounds/start_img.jpeg';
import '../../styles/OliveMemoryGame.css';

// Generate card images or symbols
const generateCards = () => {
  const cardSymbols = [
    '🐱', '🏡', '🌿', '🐾', 
    '🐈', '🧸', '🌳', '🐭'
  ];
  
  // Duplicate symbols and shuffle
  const cards = [...cardSymbols, ...cardSymbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
  
  return cards;
};

const OliveMemoryGame = ({ onGameComplete }) => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Flip a card
  const handleCardFlip = useCallback((cardId) => {
    // Prevent flipping already matched or currently flipped cards
    setCards(prevCards => prevCards.map(card => 
      card.id === cardId && !card.isMatched && !card.isFlipped
        ? { ...card, isFlipped: true }
        : card
    ));

    // Add to flipped cards
    setFlippedCardIds(prev => {
      const newFlipped = [...prev, cardId];
      
      // Check for match when two cards are flipped
      if (newFlipped.length === 2) {
        const [first, second] = newFlipped;
        const firstCard = cards.find(c => c.id === first);
        const secondCard = cards.find(c => c.id === second);

        // Increment attempts
        setAttempts(prevAttempts => prevAttempts + 1);

        // Check for match
        if (firstCard.symbol === secondCard.symbol) {
          // Match found
          setCards(prevCards => prevCards.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
        } else {
          // No match, flip back after a delay
          setTimeout(() => {
            setCards(prevCards => prevCards.map(card => 
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            ));
          }, 1000);
        }

        // Reset flipped cards
        return [];
      }
      
      return newFlipped;
    });
  }, [cards]);

  // Restart the game
  const restartGame = () => {
    setCards(generateCards());
    setFlippedCardIds([]);
    setAttempts(0);
  };

  // Check game state
  useEffect(() => {
    // Check for win condition (all cards matched)
    const allMatched = cards.every(card => card.isMatched);
    
    if (allMatched) {
      setTimeout(() => {
        onGameComplete();
      }, 1500);
    }
  }, [cards, onGameComplete]);

  // Render game board
  return (
    <div 
      className="memory-game-container" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="memory-game-overlay">
        <div className="memory-game-header">
          <h2>Find Olive!</h2>
        </div>
        
        <div className="memory-game-stats">
          <p>Attempts: {attempts}</p>
          <p>Cards Matched: {cards.filter(card => card.isMatched).length}/8</p>
        </div>

        {cards.every(card => card.isMatched) ? (
          <div className="memory-game-win-overlay">
            Olive Found!
          </div>
        ) : (
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
                {card.isFlipped || card.isMatched ? card.symbol : '?'}
              </div>
            ))}
          </div>
        )}

        {!cards.every(card => card.isMatched) && (
          <button 
            onClick={restartGame}
            className="memory-game-restart"
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default OliveMemoryGame;
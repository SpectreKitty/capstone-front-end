import { useEffect, useState } from 'react';
import { useGameState } from '../../contexts/GameStateContext';
import Background from '../common/Background';
import { BACKGROUNDS } from '../utilities/SceneConfiguration';
import '../../styles/Credits.css';

const Credits = () => {
  const { updateGameState } = useGameState();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const credits = [
    {
      section: "Kindness Simulator",
      items: ["A game about making a difference in your community"]
    },
    {
      section: "Thank you for Playing!",
      items: [
        "Created by",
        "Astry Brana",
      ]
    },
    {
      section: "Art Assets by:",
      items: [
        "Lynocs", "Two Orcs", "OpenAI"
      ]
    },
    {
      section: "Music by",
      items: [
        "xDeviruchi"
      ]
    },
    {
      section: "Special Thanks",
      items: [
        "To My Husband, who was always there to help me push forward",
        "To The Amazing ADA Community",
        "Both all my amazing classmates and the great instructors",
        "To my Amazing Friends and Family"
      ]
    }
  ];

  useEffect(() => {
    const totalDuration = 18000; // 18 seconds total
    const interval = 50; // Update every 50ms
    const step = 100 / (totalDuration / interval); // Calculate step size for smooth scroll

    const scrollInterval = setInterval(() => {
      setScrollPosition(prev => {
        const newPosition = prev + step;
        if (newPosition >= 100) {
          clearInterval(scrollInterval);
          setShowMenu(true);
          return 100;
        }
        return newPosition;
      });
    }, interval);

    // Backup timer to ensure menu shows up
    const menuTimer = setTimeout(() => {
      setShowMenu(true);
    }, totalDuration);

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(menuTimer);
    };
  }, []);

  const handleReturnToMenu = () => {
    updateGameState({
      currentScene: 'menu',
      dialogueIndex: 0,
      currentDay: 1
    });
  };

  return (
    <Background imageSrc={BACKGROUNDS.NIGHT}>
      <div className="credits-container">
        <div 
          className="credits-content"
          style={{ transform: `translateY(${-scrollPosition}%)` }}
        >
          {credits.map((section, index) => (
            <div 
              key={index} 
              className="credits-section"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <h2 className="credits-section-title">{section.section}</h2>
              {section.items.map((item, itemIndex) => (
                <p 
                  key={itemIndex} 
                  className="credits-item"
                  style={{ animationDelay: `${index * 0.5 + itemIndex * 0.2}s` }}
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        {showMenu && (
          <div className="menu-button-container">
            <button
              onClick={handleReturnToMenu}
              className="menu-button"
            >
              Return to Main Menu
            </button>
          </div>
        )}
      </div>
    </Background>
  );
};

export default Credits;
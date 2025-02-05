import '../../styles/DayTransition.css'
import { useEffect } from 'react';
import { BACKGROUNDS } from '../utilities/SceneConfiguration';

const DayTransition = ({ day, onComplete }) => {
  useEffect(() => {
    // Complete transition after 3 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div 
      className="day-transition-container"
      style={{ 
        backgroundImage: `url(${BACKGROUNDS.DEFAULT})`
      }}
    >
      <div className="day-transition-overlay" />
      <div className="day-transition-text">
        Day {day}
      </div>
    </div>
  );
};

export default DayTransition;
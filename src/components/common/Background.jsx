import { BACKGROUNDS } from '../utilities/SceneConfiguration';
import '../../styles/Background.css';

const Background = ({ imageSrc, children }) => {
  const backgroundImage = imageSrc || BACKGROUNDS.DEFAULT;
  
  return (
    <div className="game-background">
      <div 
        className="game-background-image"
        style={{ 
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      <div className="game-background-overlay" />
      <div className="game-background-content">
        {children}
      </div>
    </div>
  );
};

export default Background;
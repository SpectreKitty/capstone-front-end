import '../../styles/Background.css';
import { BACKGROUNDS } from '../utilities/SceneConfiguration';

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
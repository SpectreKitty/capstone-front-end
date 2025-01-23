import Dialogue from '../../common/Dialogue';
import { useGameState } from '../../../contexts/GameStateContext';
import morningImage from '../../../assets/images/backgrounds/morning-scene.jpeg';
import '../../../styles/Day1Scene.css'


export default function Day1MorningScene() {
  const { gameState, updateGameState } = useGameState();

  const dialogues = [
    { character: "Narrator", text: "The warm sunlight filters through the curtains, gently waking you up. Today marks the start the start of your new chapter in this little community-a fresh start in a place that already feels like it holds something special." },
    { character: "Main Character", text: "Alright, first day in a new place. Time to meet the neighbors and see what this town is all about. I wonder if they'll even notice I moved in..." },
    { character: "Main Character", text: "This garden... it feels like it's waiting for something, just like me. Maybe I can find my place here." },
    { character: "Narrator", text: "Step outside and explore the neighborhood. Who will you meet first?" }
  ];

    const handleDialogueComplete = () => {
        if (gameState.dialogueIndex < dialogues.length - 1) {
            updateGameState({
              dialogueIndex: gameState.dialogueIndex + 1
            });
        } else {
            updateGameState({
              currentScene: 'transition',
              transitionData: {
                nextScene:'day1_community_board',
                transitionText: 'Later that morning...'
              }
            });
        }
    };

    return (
        <div 
          className="scene-container"
            style={{ backgroundImage: `url(${morningImage}` }}
        >
          <Dialogue
            {...dialogues[gameState.dialogueIndex]}
            onComplete={handleDialogueComplete}
          />
        </div>
      );
    }
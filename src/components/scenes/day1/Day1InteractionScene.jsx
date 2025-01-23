import Dialogue from '../../common/Dialogue';
import { useGameState } from '../../../contexts/GameStateContext';
import morningImage from '../../../assets/images/backgrounds/morning-scene.jpeg';
import '../../../styles/Day1Scene.css'


export default function Day1InteractionScene() {
  const { gameState, updateGameState } = useGameState();

  const dialogues = [
    { character: "Narrator", text: "You are wandering through a quiet alleyway lined with blooming flowers and overgrown ivy when the faint sound of a meow catches your attention" },
    { character: "Main Character", text: "Wait...was that-" },
    { character: "Narrator", text: "You listen closely and hear another meow" },
    { character: "Main Character", text: "A cat! Could it be Olive?!" },
    { character: "Narrator", text: "You carefully follow the sound, stepping over a fallen flowerpot and turning a corner. There, under a parked bicycle, you spot a small gray tabby cat huddled close to the wall."},
    { character: "Main Character(softly)", text: "There you are, Olive. Hey, sweet girl... It's ok. I'm not going to hurt you."},
    { character: "Narrator", text: "The cat looks up, her green eyes wide with fear. She lets out a soft, nervous meow."},
    { character: "Main Character(kneeling down and extending a hand)", text: "You're scared, huh? It's alright. Let's get you home!" },
    { character: "Narrator", text: "You pull a small treat from your pocket(something you picked up earlier from the community board) and place it gently on the ground near Olive and wait patiently."},
    { character: "Main Character", text: "See? It's for you. You're safe now."},
    { character: "Narrator", text: "Olive hesitates but slowly steps forward, sniffing the treat. After a moment, she eats it and allows you to pick her up."},
    { character: "Main Character", text: "Gotcha! You're lighter than I expected. Alright, let's get you back to your family."},
    { character: "Narrator", text: "You knock on the door of small, cozy house where your neighbor Rose opens up the door her face lighting up as she sees Olive in your arms."},
    { character: "Rose", text: "Olive! Oh, my sweet baby, you're home!"},
    { character: "Rose(as she reaches out to take Olive)", text: "Thank you so much! I've been so worried. You're a lifesaver!"},
    { character: "Main Character", text: "I'm just glad I could help. I saw your poster on the community board and figured I'd keep an eye out."},
    { character: "Rose", text: "Well you've done more than that. I owe you one. Here- at lear take this as a thank-you."},
    { character: "Main Character(accepting the delicious looking plate of cookies from Rose)", text: "Thank you! I'm glad Olive's safe. Let me know if there's ever anything else I can do to help."},
    { character: "Narrator", text: "You and your neighbor wave goodbye as you feel a sense of accomplishment and connection to the community."}
  ];

  const handleDialogueComplete = () => {
    if (gameState.dialogueIndex < dialogues.length - 1) {
      updateGameState({
        dialogueIndex: gameState.dialogueIndex + 1
    });
    } else {
        updateGameState({
          currentScene: 'day1_night',
          dialogueIndex: 0
    });
    }
  };

  return (
    <div 
      className="scene-container"
      style={{ backgroundImage: `url(${morningImage}` }}>
      <Dialogue
      {...dialogues[gameState.dialogueIndex]}
      onComplete={handleDialogueComplete}/>
    </div>
  );
}
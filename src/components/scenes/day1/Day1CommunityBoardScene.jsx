import { useState } from 'react';
import Dialogue from '../../common/Dialogue';
import { useGameState } from '../../../contexts/GameStateContext';
import morningImage from '../../../assets/images/backgrounds/morning-scene.jpeg';
import '../../../styles/Day1Scene.css'


export default function Day1CommunityBoardScene() {
  const { gameState, updateGameState } = useGameState();

  const dialogues = [
    { character: "Narrator", text: "You walk through a quiet, sunlit path in the neighborhood. The sound of rustling leaves and distant chatter fills the air. As you turn a corner, you spot a wooden community board nestled under a large oak tree. It’s decorated with colorful flyers and notes pinned haphazardly." },
    { character: "Main Character", text: "Oh, a community board! Let's see what's going on around here." },
    { character: "Narrator", text: "You approach the board, your eyes scanning over the assortment of papers. One flyer catches your attention-a bright yellow poster with a picture of a small gray tabby cat" },
    { character: "Main Character(reads flyer)", text: "Missing Cat: Olive. Last seen near Maple Street. Please call if found." },
    { character: "Main Character", text: "Poor little thing. I hope someone's already helping look for her... Maybe I'll keep an eye out while I'm exploring."},
    { character: "Narrator", text: "You look at the contact details written at the bottom of the poster. It's clear that this is an opportunity to connect with the community and lend a hand"},
    { character: "Main Character", text: "This could be a good way to introduce myself. I mean, who doesn't love a good cat rescue story."},
    {character: "Main Character", text: "Alright, Olive. Let's find you!"}
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
            nextScene: 'day1_interaction',
            transitionText: 'Later that day...'
          }
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
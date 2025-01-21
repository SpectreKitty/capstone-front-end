import { useState } from 'react';
import Dialogue from '../common/Dialogue';
import { useGameState } from '../../contexts/GameStateContext';
import bgImage from '../../assets/images/backgrounds/start_img.jpeg'
import '../../styles/Day1Scene.css'


export default function Day1Scene() {
  const { gameState, updateGameState } = useGameState();

  const dialogues = [
    { character: "Narrator", text: "sample text" },
    { character: "Main Character", text: "sample text 2 "},
    { character: "Mysterious Voice", text: "sample text 3..."} 
  ];

    const handleDialogueComplete = () => {
        if (gameState.dialogueIndex < dialogues.length - 1) {
            updateGameState({
              dialogueIndex: gameState.dialogueIndex + 1
            });
        } else {
            updateGameState({
              currentScene: 'Day2Scene',
              dialogueIndex: 0
            });
        }
    };

    return (
        <div 
          className="scene-container"
            style={{ backgroundImage: `url(${bgImage}` }}
        >
          <Dialogue
            {...dialogues[gameState.dialogueIndex]}
            onComplete={handleDialogueComplete}
          />
        </div>
      );
    }
import { useState } from 'react';
import Dialogue from '../../common/Dialogue';
import { useGameState } from '../../../contexts/GameStateContext';
import morningImage from '../../assets/images/backgrounds/morning-scene.jpeg'
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
              currentScene: 'Day1CommunityBoardScene',
              dialogueIndex: 0
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
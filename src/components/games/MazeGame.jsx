import React, { useState, useEffect } from 'react';

const MazeGame = () => {
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [maze, setMaze] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const mazeSize = 15;

  // Generate maze using recursive backtracking
  const generateMaze = () => {
    const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(1));
    const stack = [];
    const start = { x: 1, y: 1 };
    
    const carve = (x, y) => {
      newMaze[y][x] = 0;
      const directions = [
        { dx: 0, dy: -2 }, // up
        { dx: 2, dy: 0 },  // right
        { dx: 0, dy: 2 },  // down
        { dx: -2, dy: 0 }  // left
      ].sort(() => Math.random() - 0.5);

      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        
        if (nx > 0 && nx < mazeSize - 1 && ny > 0 && ny < mazeSize - 1 && newMaze[ny][nx] === 1) {
          newMaze[ny - dir.dy/2][nx - dir.dx/2] = 0;
          stack.push({ x: nx, y: ny });
        }
      }
    };

    stack.push(start);
    while (stack.length > 0) {
      const current = stack.pop();
      carve(current.x, current.y);
    }

    // Create exit
    newMaze[mazeSize - 2][mazeSize - 2] = 0;
    return newMaze;
  };

  useEffect(() => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPlayer({ x: 1, y: 1 });
    setGameWon(false);
  }, []);

  const handleKeyPress = (e) => {
    if (gameWon) return;

    const moves = {
      ArrowUp: { dx: 0, dy: -1 },
      ArrowRight: { dx: 1, dy: 0 },
      ArrowDown: { dx: 0, dy: 1 },
      ArrowLeft: { dx: -1, dy: 0 }
    };

    const move = moves[e.key];
    if (!move) return;

    const newX = player.x + move.dx;
    const newY = player.y + move.dy;

    if (newX >= 0 && newX < mazeSize && 
        newY >= 0 && newY < mazeSize && 
        maze[newY][newX] === 0) {
      setPlayer({ x: newX, y: newY });
      
      if (newX === mazeSize - 2 && newY === mazeSize - 2) {
        setGameWon(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [player, maze, gameWon]);

  const resetGame = () => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPlayer({ x: 1, y: 1 });
    setGameWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold">
        {gameWon ? "Congratulations! You won!" : "Find your way to the exit"}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {maze.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`
                  w-8 h-8
                  ${cell === 1 ? 'bg-gray-800' : 'bg-white'}
                  ${player.x === x && player.y === y ? 'bg-blue-500' : ''}
                  ${x === mazeSize - 2 && y === mazeSize - 2 ? 'bg-green-500' : ''}
                `}
              />
            ))}
          </div>
        ))}
      </div>
      
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Reset Game
      </button>
      
      <div className="mt-4 text-gray-600">
        Use arrow keys to move
      </div>
    </div>
  );
};

export default MazeGame;
import { useState, useEffect } from 'react';

const numRows = 20;
const numCols = 10;
const cellSize = 30;
const emptyCell = 'white';

const tetrominoes = [
  [[1, 1, 1, 1]],    // I
  [[1, 1, 1], [0, 1, 0]],    // T
  [[1, 1, 1], [1, 0, 0]],    // L
  [[1, 1, 1], [0, 0, 1]],    // J
  [[1, 1], [1, 1]],          // O
  [[1, 1], [0, 1], [0, 1]],  // Z
  [[1, 1], [1, 0], [1, 0]]   // S
];
const pieceColors = {
  0: emptyCell,
  1: 'cyan',    // I piece
  2: 'purple',  // T piece
  3: 'orange',  // L piece
  4: 'blue',    // J piece
  5: 'yellow',  // O piece
  6: 'green',   // Z piece
  7: 'red',     // S piece
};

const getRandomTetromino = () => {
  const tetrominoIndex = Math.floor(Math.random() * tetrominoes.length);
  const tetromino = tetrominoes[tetrominoIndex];

  const newTetromino = tetromino.map(row => row.map(cell => (cell === 1 ? tetrominoIndex + 1 : 0)));

  return newTetromino;
};

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: numRows }, () => Array(numCols).fill(emptyCell)));
  const [currentTetromino, setCurrentTetromino] = useState(getRandomTetromino());

  const moveTetrominoDown = () => {
    const newTetromino = currentTetromino.map(row => [...row]);
  
    for (let row = 0; row < newTetromino.length; row++) {
      for (let col = 0; col < newTetromino[row].length; col++) {
        if (newTetromino[row][col] !== 0) {
          if (row + 1 < numRows) {
            if (!newTetromino[row + 1]) {
              newTetromino[row + 1] = Array(numCols).fill(0);
            }
            newTetromino[row + 1][col] = newTetromino[row][col];
            newTetromino[row][col] = 0;
          }
        }
      }
    }
  
    setCurrentTetromino(newTetromino);
  };

  const checkCollision = () => {
    for (let row = 0; row < currentTetromino.length; row++) {
      for (let col = 0; col < currentTetromino[row].length; col++) {
        if (currentTetromino[row][col] !== 0) {
          const newRow = row + 1;
  
          // Check collision with bottom boundary
          if (newRow >= numRows) {
            return true;
          }
  
          // Check collision with other occupied cells
          if (newRow < numRows && grid[newRow][col] !== emptyCell) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const updateGrid = () => {
    const newGrid = [...grid];
  
    for (let row = 0; row < currentTetromino.length; row++) {
      for (let col = 0; col < currentTetromino[row].length; col++) {
        if (currentTetromino[row][col] !== 0) {
          newGrid[row][col] = pieceColors[currentTetromino[row][col]];
        }
      }
    }
    console.log(newGrid);
    setGrid(newGrid);
  };

  const handleGameOver = () => {
    console.log('Game Over');
    // Display "Game Over" and reset the game
    // ...
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveTetrominoDown();

      if (checkCollision()) {
        updateGrid();
        setCurrentTetromino(getRandomTetromino());

        if (checkCollision()) {
          clearInterval(interval);
          handleGameOver();
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Tetris</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)` }}>
        {grid.map((row, rowIndex) =>
          row.map((cellColor, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cellColor,
                border: '1px solid gray',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
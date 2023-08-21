import Cell from "./celda"; // Asegúrate de ajustar la ruta según la ubicación de tus archivos

const rows = 20; // Número de filas del tablero
const cols = 10; // Número de columnas del tablero

function Board() {
  const initialBoard = Array.from({ length: rows }, () => Array(cols).fill(false)); // Matriz inicial de celdas vacías

  return (
    <div className="board">
      {initialBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((filled, colIndex) => (
            <Cell key={colIndex} filled={filled} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
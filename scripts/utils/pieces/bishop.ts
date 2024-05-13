type SquareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';
type Square = {
    color: string | null,
    type: SquareType,
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
};
type Chessboard = Square[][];

export const bishop = (board: Chessboard, bishop: Square, targetSquare: Square): Square | null => {
  const { row: bishopRow, col: bishopCol } = getSquarePosition(board, bishop);
  const { row: targetRow, col: targetCol } = getSquarePosition(board, targetSquare);

  if (bishopRow === targetRow && bishopCol === targetCol) {
      return null; // Bishop cannot move to its own square
  }

  // Check if target square is in the bishop's line of fire
  const diffRow = Math.abs(bishopRow - targetRow);
  const diffCol = Math.abs(bishopCol - targetCol);

  if (diffRow === diffCol) {
      // Determine the direction of movement
      const rowDirection = targetRow > bishopRow ? 1 : -1;
      const colDirection = targetCol > bishopCol ? 1 : -1;

      // Iterate along the diagonal path from the bishop to the target square
      for (let i = 1; i < diffRow; i++) {
          const currentRow = bishopRow + i * rowDirection;
          const currentCol = bishopCol + i * colDirection;
          const currentSquare = board[currentRow][currentCol];
          
          // Check for obstacles (non-empty squares) along the path
          if (currentSquare.color !== null) {
              return null; // Obstacle detected
          }
      }

      return bishop; // No obstacles, target square is reachable
  }

  return null; // Target square is not reachable by bishop's movement
}

function getSquarePosition(board: Chessboard, square: Square): { row: number, col: number } {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === square) {
                return { row, col };
            }
        }
    }
    throw new Error('Square not found on the board.');
}

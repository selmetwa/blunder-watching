type SquareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';
type Square = {
    color: string | null,
    type: SquareType,
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
};
type Chessboard = Square[][];

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

export const king = (board: Chessboard, king: Square, targetSquare: Square): Square | null => {
  const { row: kingRow, col: kingCol } = getSquarePosition(board, king);
  const { row: targetRow, col: targetCol } = getSquarePosition(board, targetSquare);

  if (kingRow === targetRow && kingCol === targetCol) {
      return null; // King cannot move to its own square
  }

  // Check if target square is adjacent to the king
  const diffRow = Math.abs(kingRow - targetRow);
  const diffCol = Math.abs(kingCol - targetCol);
  if ((diffRow === 1 && diffCol === 0) || (diffRow === 0 && diffCol === 1) || (diffRow === 1 && diffCol === 1)) {
      return king; // Target square is adjacent, king can move there
  }

  return null; // Target square is not adjacent to the king
}

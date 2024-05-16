import { Chessboard, Square } from '../../types';
import { getSquarePosition } from './helpers';

export const rook = (board: Chessboard, rook: Square, targetSquare: Square): Square | null => {
  const { row: rookRow, col: rookCol } = getSquarePosition(board, rook);
  const { row: targetRow, col: targetCol } = getSquarePosition(board, targetSquare);

  if (rookRow === targetRow && rookCol === targetCol) {
      return null; // Rook cannot move to its own square
  }

  // Check if target square is in the rook's line of fire (same row or column)
  if (rookRow === targetRow || rookCol === targetCol) {
      // Determine the direction of movement (vertical or horizontal)
      const isVertical = rookRow !== targetRow;

      // Determine the direction of movement (+1 or -1)
      const direction = isVertical ? (targetRow > rookRow ? 1 : -1) : (targetCol > rookCol ? 1 : -1);

      // Iterate along the path from the rook to the target square
      for (let i = 1; isVertical ? (rookRow + i * direction !== targetRow) : (rookCol + i * direction !== targetCol); i++) {
          const currentRow = isVertical ? (rookRow + i * direction) : rookRow;
          const currentCol = isVertical ? rookCol : (rookCol + i * direction);
          const currentSquare = board[currentRow][currentCol];

          // Check for obstacles (non-empty squares) along the path
          if (currentSquare?.color !== null) {
              return null; // Obstacle detected
          }
      }

      return rook; // No obstacles, target square is reachable
  }

  return null; // Target square is not reachable by rook's movement
}

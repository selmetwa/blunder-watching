import { Chessboard, Square } from '../../types';
import { getSquarePosition } from './helpers';

export const queen = (board: Chessboard, queen: Square, targetSquare: Square): Square | null => {
  const { row: queenRow, col: queenCol } = getSquarePosition(board, queen);
  const { row: targetRow, col: targetCol } = getSquarePosition(board, targetSquare);

  if (queenRow === targetRow && queenCol === targetCol) {
      return null; // Queen cannot move to its own square
  }

  // Check if target square is reachable by queen's movement (vertical, horizontal, or diagonal)
  const diffRow = Math.abs(queenRow - targetRow);
  const diffCol = Math.abs(queenCol - targetCol);

  // Check if target square is in the queen's line of fire (same row, same column, or same diagonal)
  if (queenRow === targetRow || queenCol === targetCol || diffRow === diffCol) {
      // Determine the direction of movement (vertical, horizontal, or diagonal)
      const isVertical = queenRow !== targetRow;
      const isDiagonal = diffRow === diffCol;
      const direction = isVertical ? (targetRow > queenRow ? 1 : -1) : (isDiagonal ? (targetRow > queenRow ? 1 : -1) : (targetCol > queenCol ? 1 : -1));

      // Iterate along the path from the queen to the target square
      for (let i = 1; (isVertical && queenRow + i * direction !== targetRow) || (!isVertical && !isDiagonal && queenCol + i * direction !== targetCol); i++) {
          const currentRow = isVertical ? (queenRow + i * direction) : (isDiagonal ? (queenRow + i * direction) : queenRow);
          const currentCol = !isVertical ? (queenCol + i * direction) : (isDiagonal ? (queenCol + i * direction) : queenCol);
          const currentSquare = board[currentRow][currentCol];

          // Check for obstacles (non-empty squares) along the path
          if (currentSquare?.color !== null) {
              return null; // Obstacle detected
          }
      }

      return queen; // No obstacles, target square is reachable
  }

  return null; // Target square is not reachable by queen's movement
}

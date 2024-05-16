import { Chessboard, Square } from '../../../types';

export const getSquarePosition = (board: Chessboard, square: Square): { row: number, col: number } => {
  for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === square) {
              return { row, col };
          }
      }
  }
  throw new Error('Square not found on the board.');
}

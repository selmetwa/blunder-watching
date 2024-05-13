import { square } from '../../types';

export const pawn = (chessboard: square[][], square: square, target:square): square | null => {
  // white pawn
  if (square.color === 'w' && square.type === 'p') {
    const [file, rank] = square.square.split('');
    const fileIndex = file.charCodeAt(0) - 97;
    const rankIndex = parseInt(rank) - 1;

    if (fileIndex > 0) {
      const leftSquare = chessboard[rankIndex + 1][fileIndex - 1];
      if (target.square === leftSquare.square) {
        return square
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex + 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        return square
      }
    }
  }

  // black pawn
  if (square.color === 'b' && square.type === 'p') {
    const [file, rank] = square.square.split('');
    const fileIndex = file.charCodeAt(0) - 97;
    const rankIndex = parseInt(rank) - 1;

    if (fileIndex > 0) {
      const leftSquare = chessboard[rankIndex - 1][fileIndex - 1];
      if (target.square === leftSquare.square) {
        return square
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex - 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        return square
      }
    }
  }

  return null;
}
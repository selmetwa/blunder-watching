import { Square } from '../../types';

export const pawn = (chessboard: Square[][], pawn: Square, target:Square): Square | null => {
  // white pawn
  if (pawn.color === 'w' && pawn.type === 'p') {
    const [file, rank] = pawn.square.split('');
    const fileIndex = file.charCodeAt(0) - 97;
    const rankIndex = parseInt(rank) - 1;

    if (fileIndex > 0) {
      const leftSquare = chessboard[rankIndex + 1][fileIndex - 1];
      if (target.square === leftSquare.square) {
        return pawn
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex + 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        return pawn
      }
    }
  }

  // black pawn
  if (pawn.color === 'b' && pawn.type === 'p') {
    const [file, rank] = pawn.square.split('');
    const fileIndex = file.charCodeAt(0) - 97;
    const rankIndex = parseInt(rank) - 1;

    if (fileIndex > 0) {
      const leftSquare = chessboard[rankIndex - 1][fileIndex - 1];
      if (target.square === leftSquare.square) {
        return pawn
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex - 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        return pawn
      }
    }
  }

  return null;
}
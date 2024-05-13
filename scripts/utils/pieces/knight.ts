import { square } from "../../types";

export const knight = (chessboard: square[][], knight: square, targetSquare: square): square | null => {
  const [file, rank] = knight.square.split('');
  const fileIndex = file?.charCodeAt(0) - 97;
  const rankIndex = parseInt(rank) - 1;

  const possibleMoves = [
    [rankIndex + 2, fileIndex + 1],
    [rankIndex + 2, fileIndex - 1],
    [rankIndex - 2, fileIndex + 1],
    [rankIndex - 2, fileIndex - 1],
    [rankIndex + 1, fileIndex + 2],
    [rankIndex + 1, fileIndex - 2],
    [rankIndex - 1, fileIndex + 2],
    [rankIndex - 1, fileIndex - 2],
  ];

  for (let i=0; i<possibleMoves.length; i++) {
    const [r, f] = possibleMoves[i];
    if (r >= 0 && r < 8 && f >= 0 && f < 8) {
      const square = chessboard[r][f];

      if (square.square === targetSquare.square) {
        return knight;
      }
    }
  }

  return null;
}
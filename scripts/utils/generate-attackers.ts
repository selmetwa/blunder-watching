import { pawn } from './pieces/pawn';
import { square } from '../types';
import { knight } from './pieces/knight';
import { bishop } from './pieces/bishop';
import { rook } from './pieces/rook';
import { queen } from './pieces/queen';
import { king } from './pieces/king';

export const generateAttackers = (chessboard: square[][], targetSquare: square): {
  attackers: square[],
} => {
  const attackers =  [];

  for (let r=0; r<8; r++) {
    for (let f=0; f<8; f++) {
      const square = chessboard[r][f];
      if (square.type === 'p') {
        const res = pawn(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }

      if (square.type === 'n') {
        const res = knight(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }

      if (square.type === 'b') {
        const res = bishop(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }

      if (square.type === 'r') {
        const res = rook(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }

      if (square.type === 'q') {
        const res = queen(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }

      if (square.type === 'k') {
        const res = king(chessboard, square, targetSquare);

        if (res) {
          attackers.push(res);
        }
      }
    }
  }

  return {
    attackers: attackers,
  };
}
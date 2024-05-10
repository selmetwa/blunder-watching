import { pawn } from './pawn';

type squareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';
type square = {
    color: string | null,
    type: squareType, 
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
}
export const generateAttackers = (chessboard: square[][], targetSquare: square): {
  attackers: square[],
  defenders: square[],
} => {
  const attackers = [];
  const defenders = [];

  for (let r=0; r<8; r++) {
    for (let f=0; f<8; f++) {
      const square = chessboard[r][f];
      if (square.type === 'p') {
        const attacksFromPawn = pawn(chessboard, square, targetSquare);
        if (attacksFromPawn?.type === 'attack') {
          attackers.push(attacksFromPawn);
        }
        if (attacksFromPawn?.type === 'defend') {
          defenders.push(attacksFromPawn);
        }
      }
    }
  }

  return {
    attackers,
    defenders,
  };
}
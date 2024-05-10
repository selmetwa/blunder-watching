type squareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';
type square = {
    color: string | null,
    type: squareType, 
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
}

export const pawn = (chessboard: square[][], square: square, target:square): {
  type: 'attack' | 'defend',
  square: square,
} | null => {
  // console.log({ chessboard, square, target })

  // white pawn
  if (square.color === 'w' && square.type === 'p') {
    const [file, rank] = square.square.split('');
    const fileIndex = file.charCodeAt(0) - 97;
    const rankIndex = parseInt(rank) - 1;

    if (fileIndex > 0) {
      const leftSquare = chessboard[rankIndex + 1][fileIndex - 1];
      if (target.square === leftSquare.square) {
        if (target.color === 'b') {
          return {
            square,
            type: 'attack',
          };
        } else {
          return {
            square,
            type: 'defend',
          };
        }
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex + 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        if (target.color === 'b') {
          return {
            square,
            type: 'attack',
          };
        } else {
          return {
            square,
            type: 'defend',
          };
        }
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
        if (target.color === 'w') {
          return {
            square,
            type: 'attack',
          };
        } else {
          return {
            square,
            type: 'defend',
          };
        }
      }
    }

    if (fileIndex < 7) {
      const rightSquare = chessboard[rankIndex - 1][fileIndex + 1];
      if (target.square === rightSquare.square) {
        if (target.color === 'w') {
          return {
            square,
            type: 'attack',
          };
        } else {
          return {
            square,
            type: 'defend',
          };
        }
      }
    }
  }

  return null;
}
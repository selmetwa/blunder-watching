import { generateAttackers } from "./generate-attackers";

const allSquares = [
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
]

const fileMap = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
}

const playingAs: 'w' | 'b' = 'w';

export const generate2dArray = (pieceNodes: ChildNode[]) => {
  const pieces = Array.from(pieceNodes);
  console.log({ pieces })

  const occupiedSquares = pieces.map(piece => {
    const classList = piece.classList;
    const pieceTypeInfo = classList[1];
    const pieceSquareInfo = classList[2].split('-')[1];

    const pieceColor = pieceTypeInfo?.charAt(0);
    const pieceType = pieceTypeInfo?.charAt(1);

    const file = Number(pieceSquareInfo?.charAt(0));
    const rank = pieceSquareInfo?.charAt(1);

    const square = `${fileMap[file]}${rank}`;

    return {
      color: pieceColor,
      type: pieceType,
      square: square,
      attackers: [],
      defenders: [],
    }
  })

  const occupiedSquareCoordinates = occupiedSquares.map(square => square.square);

  const emptySquares = allSquares
    .filter(square => !occupiedSquareCoordinates.includes(square))
    .map(square => ({
        color: null,
        type: 'e', 
        square,
        attackers: [],
        defenders: [],
    }));


  const allSquaresWithPieces = [...occupiedSquares, ...emptySquares];

  const chessboard = Array.from({ length: 8 }, () => Array(8).fill(null));
  allSquaresWithPieces.forEach(piece => {
      const { color, type, square, attackers, defenders } = piece;
      const [file, rank] = square.split(''); // Reverse the square string to match array indexing
      const fileIndex = file.charCodeAt(0) - 97; // Convert file to array index (a=0, b=1, ..., h=7)
      const rankIndex = parseInt(rank) - 1; // Convert rank to array index (1=0, 2=1, ..., 8=7)
      chessboard[rankIndex][fileIndex] = { color, type, square, attackers, defenders };
  });


  for (let r=0; r<8; r++) {
    for (let f=0; f<8; f++) {
      const square = chessboard[r][f];
      const { attackers: res } = generateAttackers(chessboard, square);

      if (square.color === 'w') {
        const defenders = res.filter(attacker => attacker.color === 'w');
        const attackers = res.filter(attacker => attacker.color === 'b');
        chessboard[r][f].attackers = attackers;
        chessboard[r][f].defenders = defenders;
      }

      if (square.color === 'b') {
        const defenders = res.filter(attacker => attacker.color === 'b');
        const attackers = res.filter(attacker => attacker.color === 'w');
        chessboard[r][f].attackers = attackers;
        chessboard[r][f].defenders = defenders;
      }

      if (square.color === null) {
        if (playingAs === 'w') {
          const defenders = res.filter(attacker => attacker.color === 'w');
          const attackers = res.filter(attacker => attacker.color === 'b');
          chessboard[r][f].attackers = attackers;
          chessboard[r][f].defenders = defenders;
        } else {
          const defenders = res.filter(attacker => attacker.color === 'b');
          const attackers = res.filter(attacker => attacker.color === 'w');
          chessboard[r][f].attackers = attackers;
          chessboard[r][f].defenders = defenders;
        }
      }
    }
  }

  console.log({ chessboard })
}
import { Chessboard } from "../types";
import { allPossiblePieces, allSquares, fileNumberToLetterMap, pieceValues } from "../constants";
import { generateAttackers } from "./generate-attackers";

export const generateChessboard = (pieceNodes: Element[], playingAs: 'white' | 'black'): Chessboard => {
  const pieces = Array.from(pieceNodes);
  const occupiedSquares = pieces.map(piece => {
    const classList = piece.classList;

    const values = Object.values(classList);
    const pieceTypeInfo = values.find(value => allPossiblePieces.includes(value));
    const pieceSquareInfoA = values.find(value => value.startsWith('square-'));
    const pieceSquareInfo = pieceSquareInfoA?.split('-')[1];

    const pieceColor = pieceTypeInfo?.charAt(0);

    const pieceType = pieceTypeInfo?.charAt(1);

    const file = Number(pieceSquareInfo?.charAt(0));
    const rank = pieceSquareInfo?.charAt(1);

    const square = `${fileNumberToLetterMap[file]}${rank}`;

    return {
      color: pieceColor,
      type: pieceType,
      square: square,
      attackers: [],
      defenders: [],
      value: pieceValues[pieceType ?? 'e'],
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
        value: 0,
    }));


  const allSquaresWithPieces = [...occupiedSquares, ...emptySquares];

  const chessboard = Array.from({ length: 8 }, () => Array(8).fill(null));
  allSquaresWithPieces.forEach(piece => {
      const { color, type, square, attackers, defenders, value } = piece;
      const [file, rank] = square.split(''); // Reverse the square string to match array indexing
      const fileIndex = file.charCodeAt(0) - 97; // Convert file to array index (a=0, b=1, ..., h=7)
      const rankIndex = parseInt(rank) - 1; // Convert rank to array index (1=0, 2=1, ..., 8=7)

      if (chessboard?.[rankIndex]?.[fileIndex] !== undefined) {
        chessboard[rankIndex][fileIndex] = { color, type, square, attackers, defenders, value };
      }
  });


  for (let r=0; r<8; r++) {
    for (let f=0; f<8; f++) {
      const square = chessboard[r][f];
      const { attackers: res } = generateAttackers(chessboard, square);

      if (chessboard?.[r]?.[f] !== undefined) {
        if (playingAs === 'white') {
          if (square.color === 'w') {
            const defenders = res.filter(attacker => attacker.color === 'w');
            const attackers = res.filter(attacker => attacker.color === 'b');
            chessboard[r][f].attackers = attackers;
            chessboard[r][f].defenders = defenders;
          }

          if (square.color === 'b') {
            const defenders = res.filter(attacker => attacker.color === 'w');
            const attackers = res.filter(attacker => attacker.color === 'b');
            chessboard[r][f].attackers = attackers;
            chessboard[r][f].defenders = defenders;
          }
          if (square.color === null) {
            const defenders = res.filter(attacker => attacker.color === 'w');
            const attackers = res.filter(attacker => attacker.color === 'b');
            chessboard[r][f].attackers = attackers;
            chessboard[r][f].defenders = defenders;
          }
        } else {
          // handle this later
          if (square.color === 'w') {
            const defenders = res.filter(attacker => attacker.color === 'b');
            const attackers = res.filter(attacker => attacker.color === 'w');
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
            const defenders = res.filter(attacker => attacker.color === 'b');
            const attackers = res.filter(attacker => attacker.color === 'w');
            chessboard[r][f].attackers = attackers;
            chessboard[r][f].defenders = defenders;
          }
        }
      }
    }
  }

  return chessboard
}
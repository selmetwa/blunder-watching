"use strict";
self["webpackHotUpdateblunder_watching"]("scripts/generate-chess-board",{

/***/ "./scripts/utils/generate-chess-board.ts":
/*!***********************************************!*\
  !*** ./scripts/utils/generate-chess-board.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateChessboard: () => (/* binding */ generateChessboard)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./scripts/constants.ts");
/* harmony import */ var _generate_attackers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate-attackers */ "./scripts/utils/generate-attackers.ts");


const generateChessboard = pieceNodes => {
  const pieces = Array.from(pieceNodes);
  const occupiedSquares = pieces.map(piece => {
    const classList = piece.classList;
    const pieceTypeInfo = classList[1];
    const pieceSquareInfo = classList[2].split('-')[1];
    const pieceColor = pieceTypeInfo?.charAt(0);
    const pieceType = pieceTypeInfo?.charAt(1);
    const file = Number(pieceSquareInfo?.charAt(0));
    const rank = pieceSquareInfo?.charAt(1);
    const square = `${_constants__WEBPACK_IMPORTED_MODULE_0__.fileNumberToLetterMap[file]}${rank}`;
    return {
      color: pieceColor,
      type: pieceType,
      square: square,
      attackers: [],
      defenders: []
    };
  });
  const occupiedSquareCoordinates = occupiedSquares.map(square => square.square);
  const emptySquares = _constants__WEBPACK_IMPORTED_MODULE_0__.allSquares.filter(square => !occupiedSquareCoordinates.includes(square)).map(square => ({
    color: null,
    type: 'e',
    square,
    attackers: [],
    defenders: []
  }));
  const allSquaresWithPieces = [...occupiedSquares, ...emptySquares];
  const chessboard = Array.from({
    length: 8
  }, () => Array(8).fill(null));
  allSquaresWithPieces.forEach(piece => {
    const {
      color,
      type,
      square,
      attackers,
      defenders
    } = piece;
    const [file, rank] = square.split(''); // Reverse the square string to match array indexing
    const fileIndex = file.charCodeAt(0) - 97; // Convert file to array index (a=0, b=1, ..., h=7)
    const rankIndex = parseInt(rank) - 1; // Convert rank to array index (1=0, 2=1, ..., 8=7)

    if (chessboard?.[rankIndex]?.[fileIndex] !== undefined) {
      chessboard[rankIndex][fileIndex] = {
        color,
        type,
        square,
        attackers,
        defenders
      };
    }
  });
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const square = chessboard[r][f];
      const {
        attackers: res
      } = (0,_generate_attackers__WEBPACK_IMPORTED_MODULE_1__.generateAttackers)(chessboard, square);
      if (chessboard?.[r]?.[f] !== undefined) {
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
          if (_constants__WEBPACK_IMPORTED_MODULE_0__.playingAs === 'w') {
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
  }
  return chessboard;
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("85d99fe579aff5f8faa7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=generate-chess-board.343ee17958bb37b509a0.hot-update.js.map
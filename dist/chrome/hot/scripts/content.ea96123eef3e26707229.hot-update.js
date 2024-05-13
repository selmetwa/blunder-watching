"use strict";
self["webpackHotUpdateblunder_watching"]("scripts/content",{

/***/ "./scripts/utils/pieces/rook.ts":
/*!**************************************!*\
  !*** ./scripts/utils/pieces/rook.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rook: () => (/* binding */ rook)
/* harmony export */ });
function getSquarePosition(board, square) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === square) {
        return {
          row,
          col
        };
      }
    }
  }
  throw new Error('Square not found on the board.');
}
const rook = (board, rook, targetSquare) => {
  const {
    row: rookRow,
    col: rookCol
  } = getSquarePosition(board, rook);
  const {
    row: targetRow,
    col: targetCol
  } = getSquarePosition(board, targetSquare);
  if (rookRow === targetRow && rookCol === targetCol) {
    return null; // Rook cannot move to its own square
  }

  // Check if target square is in the rook's line of fire (same row or column)
  if (rookRow === targetRow || rookCol === targetCol) {
    // Determine the direction of movement (vertical or horizontal)
    const isVertical = rookRow !== targetRow;

    // Determine the direction of movement (+1 or -1)
    const direction = isVertical ? targetRow > rookRow ? 1 : -1 : targetCol > rookCol ? 1 : -1;

    // Iterate along the path from the rook to the target square
    for (let i = 1; isVertical ? rookRow + i * direction !== targetRow : rookCol + i * direction !== targetCol; i++) {
      const currentRow = isVertical ? rookRow + i * direction : rookRow;
      const currentCol = isVertical ? rookCol : rookCol + i * direction;
      const currentSquare = board[currentRow][currentCol];

      // Check for obstacles (non-empty squares) along the path
      if (currentSquare?.color !== null) {
        return null; // Obstacle detected
      }
    }
    return rook; // No obstacles, target square is reachable
  }
  return null; // Target square is not reachable by rook's movement
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("af195c61fde9a53e2b5e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.ea96123eef3e26707229.hot-update.js.map
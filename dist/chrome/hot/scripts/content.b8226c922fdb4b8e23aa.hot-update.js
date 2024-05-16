"use strict";
self["webpackHotUpdateblunder_watching"]("scripts/content",{

/***/ "./scripts/content.ts":
/*!****************************!*\
  !*** ./scripts/content.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_generate_chess_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/generate-chess-board */ "./scripts/utils/generate-chess-board.ts");
if (true) {
  module.hot.accept();
}
;
console.log("content script loaded!");

const board = document.querySelector('wc-chess-board');
let classString = '';
function findStringDifference(str1, str2) {
  let diff = '';
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] !== str2[i]) {
      diff += str2[i];
    }
  }
  return diff;
}
function calculate() {
  const childNodes = board && board.childNodes;
  if (!childNodes) {
    return;
  }
  const pieceNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node;
      return elementNode.classList.contains('piece');
    }
    return false;
  });
  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  console.log({
    classString,
    _classString
  });
  classString = _classString;
  const chessboard = (0,_utils_generate_chess_board__WEBPACK_IMPORTED_MODULE_0__.generateChessboard)(pieceNodes);
  const flatChessboard = chessboard.flat();
  for (const square of flatChessboard) {
    console.log({
      obj: square,
      square: square.square,
      defenders: square.defenders.length,
      attackers: square.attackers.length
    });
  }
  console.log({
    chessboard
  });
}
setTimeout(() => {
  calculate();
}, 1000);
function testing() {
  const childNodes = board && board.childNodes;
  if (!childNodes) {
    return;
  }
  const pieceNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node;
      return elementNode.classList.contains('piece');
    }
    return false;
  });
  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  const diff = findStringDifference(classString, _classString);
  if (!!diff.trim()) {
    classString = _classString;
    calculate();
  }
}
const observer = new MutationObserver(mutationsList => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'attributes') {
      if (mutation.attributeName === 'class') {
        const targetNode = mutation.target;
        if (targetNode.classList.contains('piece') && !targetNode.classList.contains('dragging')) {
          testing();
        }
      }
    }
  });
});
if (board && board.childNodes) {
  board.childNodes.forEach(node => {
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['class']
    });
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0d8a428ca17f55c2c3e8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.b8226c922fdb4b8e23aa.hot-update.js.map
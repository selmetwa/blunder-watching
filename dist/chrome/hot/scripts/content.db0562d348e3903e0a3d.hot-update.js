"use strict";
self["webpackHotUpdateblunder_watching"]("scripts/content",{

/***/ "./scripts/content.ts":
/*!****************************!*\
  !*** ./scripts/content.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_generate_chess_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/generate-chess-board */ "./scripts/utils/generate-chess-board.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./scripts/constants.ts");
/* harmony import */ var _utils_calculate_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/calculate-color */ "./scripts/utils/calculate-color.ts");
/* harmony import */ var _utils_find_string_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/find-string-difference */ "./scripts/utils/find-string-difference.ts");
if (true) {
  module.hot.accept();
}
;
console.log("content script loaded!");




const board = document.querySelector('wc-chess-board');
let classString = '';
function calculate(pieceMoved = '') {
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
  const emptyNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node;
      return elementNode.classList.contains('empty');
    }
    return false;
  });
  emptyNodes.forEach(childNode => {
    board.removeChild(childNode);
  });
  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  classString = _classString;
  const chessboard = (0,_utils_generate_chess_board__WEBPACK_IMPORTED_MODULE_0__.generateChessboard)(pieceNodes);
  const flatChessboard = chessboard.flat();
  console.log({
    flatChessboard,
    childNodes,
    emptyNodes
  });
  for (const square of flatChessboard) {
    const [file, rank] = square && square.square && square?.square?.split('') || [];
    const selector = `.square-${_constants__WEBPACK_IMPORTED_MODULE_1__.fileLetterToNumberMap[file]}${rank}`;
    const squareElements = document.querySelectorAll(selector);
    if (square.type === 'e') {
      const color = (0,_utils_calculate_color__WEBPACK_IMPORTED_MODULE_2__.calculateColor)(square.attackers.length, square.defenders.length);
      const emptySquare = document.createElement('div');
      emptySquare.style.backgroundSize = '100%';
      emptySquare.style.cursor = 'pointer'; // Setting multiple cursor styles for cross-browser compatibility
      emptySquare.style.cursor = 'grab';
      emptySquare.style.cursor = '-webkit-grab';
      emptySquare.style.height = '12.5%';
      emptySquare.style.left = '0';
      emptySquare.style.overflow = 'hidden';
      emptySquare.style.position = 'absolute';
      emptySquare.style.top = '0';
      emptySquare.style.touchAction = 'none';
      emptySquare.style.width = '12.5%';
      emptySquare.style.willChange = 'transform';
      emptySquare.style.outline = '1px solid black';
      emptySquare.style.backgroundColor = color;
      emptySquare.classList.add('empty');
      emptySquare.classList.add(`square-${_constants__WEBPACK_IMPORTED_MODULE_1__.fileLetterToNumberMap[file]}${rank}`);
      const childDiv = document.createElement('div');
      childDiv.classList.add('attackers-defenders');
      const childText = document.createElement('p');
      childText.style.fontSize = '12px';
      childDiv.style.padding = '2px';
      childText.innerText = `${square.defenders.length - square.attackers.length}`;
      childDiv.appendChild(childText);
      emptySquare.appendChild(childDiv);
      board.appendChild(emptySquare);
    }
    squareElements.forEach(squareElement => {
      const children = squareElement?.querySelectorAll('.attackers-defenders');
      children?.forEach(child => {
        squareElement?.removeChild(child);
      });
      if (squareElement) {
        const color = (0,_utils_calculate_color__WEBPACK_IMPORTED_MODULE_2__.calculateColor)(square.attackers.length, square.defenders.length);
        if (color) {
          squareElement.style.backgroundColor = color;
        } else {
          squareElement.style.backgroundColor = '';
        }
        const childDiv = document.createElement('div');
        childDiv.classList.add('attackers-defenders');
        const childText = document.createElement('p');
        childText.style.fontSize = '12px';
        childDiv.style.padding = '2px';
        childText.innerText = `${square.defenders.length - square.attackers.length}`;
        childDiv.appendChild(childText);
        squareElement.style.outline = '1px solid black';
        squareElement.appendChild(childDiv);
      }
    });
  }
  if (pieceMoved) {
    const joinedSelector = pieceMoved.split(' ').join('.');
    const pieceMovedElement = document.querySelector(`.${joinedSelector}`);
    if (pieceMovedElement) {
      const children = pieceMovedElement?.querySelectorAll('.attackers-defenders');
      children?.forEach(child => {
        pieceMovedElement?.removeChild(child);
      });
    }
  }
}
setTimeout(() => {
  calculate();
}, 1000);
function repaint(pieceMoved) {
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
  const diff = (0,_utils_find_string_difference__WEBPACK_IMPORTED_MODULE_3__.findStringDifference)(classString, _classString);
  if (!!diff.trim()) {
    classString = _classString;
    calculate(pieceMoved);
  }
}
const observer = new MutationObserver(mutationsList => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'attributes') {
      if (mutation.attributeName === 'class') {
        const targetNode = mutation.target;
        if (targetNode.classList.contains('piece') && !targetNode.classList.contains('dragging')) {
          repaint(targetNode.classList.value);
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
/******/ 	__webpack_require__.h = () => ("b41dfa03ab673c095dca")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content.db0562d348e3903e0a3d.hot-update.js.map
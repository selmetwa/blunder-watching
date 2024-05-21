"use strict";
self["webpackHotUpdateblunder_watching"]("content_scripts/content-0",{

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




let selectedOption = 'white';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'selectedOption') {
    const selectedValue = request.value;
    sendResponse({
      status: 'Option received'
    });
    selectedOption = selectedValue;
    calculate();
  }
});
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

  // const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  const _classString = pieceNodes.map(node => {
    const element = node;
    return `${element.classList[1]}_${element.classList[2]}`;
  }).join('_');
  classString = _classString;
  const chessboard = (0,_utils_generate_chess_board__WEBPACK_IMPORTED_MODULE_0__.generateChessboard)(pieceNodes, selectedOption);
  const flatChessboard = chessboard.flat();
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
      emptySquare.style.backgroundColor = color || '';
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
        const element = squareElement;
        const color = (0,_utils_calculate_color__WEBPACK_IMPORTED_MODULE_2__.calculateColor)(square.attackers.length, square.defenders.length);
        element.style.backgroundColor = color || '';
        element.style.opacity = '1';
        // element.style.zIndex = '10';
        const childDiv = document.createElement('div');
        childDiv.classList.add('attackers-defenders');
        const childText = document.createElement('p');
        childText.style.fontSize = '12px';
        childDiv.style.padding = '2px';
        childText.innerText = `${square.defenders.length - square.attackers.length}`;
        childDiv.appendChild(childText);
        element.style.outline = '1px solid black';
        element.appendChild(childDiv);
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
      // pieceMovedElement.style.zIndex = '10';
      pieceMovedElement.style.backgroundColor = 'transparent';
    }
  }
}
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
  const _classString = pieceNodes.map(node => {
    const element = node;
    return `${element.classList[1]}_${element.classList[2]}`;
  }).join('_');
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
/******/ 	__webpack_require__.h = () => ("9b5cffe69c69b340aacc")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=content-0.388c2a96ff56a9013a6c.hot-update.js.map
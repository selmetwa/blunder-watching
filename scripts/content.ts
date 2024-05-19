console.log("content script loaded!")
import { generateChessboard } from './utils/generate-chess-board';
import { fileLetterToNumberMap } from './constants';

const board = document.querySelector('wc-chess-board') as HTMLElement

let classString = '';

function findStringDifference(str1: string, str2: string) {
  let diff = '';
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] !== str2[i]) {
          diff += str2[i];
      }
  }
  return diff;
}

function calculate(pieceMoved = '') {
  const childNodes = board && board.childNodes;

  if (!childNodes) {
    return;
  }

  const pieceNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element;
      return elementNode.classList.contains('piece');
    }
    return false;
  });

  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  classString = _classString;

  const chessboard = generateChessboard(pieceNodes);
  const flatChessboard = chessboard.flat();

  for (const square of flatChessboard) {
    const [file, rank] = square && square.square && square?.square?.split('') || [];
    const selector = `.square-${fileLetterToNumberMap[file]}${rank}`;
    const squareElements = document.querySelectorAll(selector);

    squareElements.forEach((squareElement) => {
      const children = squareElement?.querySelectorAll('.attackers-defenders');
      children?.forEach((child) => {
        squareElement?.removeChild(child);
      });
  
      if (squareElement) {
        const childDiv = document.createElement('div');
        childDiv.classList.add('attackers-defenders');
        const childText = document.createElement('p');
        childText.innerText = `d: ${square.defenders.length}, a: ${square.attackers.length}`;
        childDiv.appendChild(childText);
  
        squareElement.appendChild(childDiv);
      }
    })
  }

  if (pieceMoved) {
    const joinedSelector = pieceMoved.split(' ').join('.');
    const pieceMovedElement = document.querySelector(`.${joinedSelector}`);

    if (pieceMovedElement) {
      const children = pieceMovedElement?.querySelectorAll('.attackers-defenders');
      children?.forEach((child) => {
        pieceMovedElement?.removeChild(child);
      });
    }
  }
}

calculate();

function testing(pieceMoved: string) {
  const childNodes = board && board.childNodes;

  if (!childNodes) {
    return;
  }

  const pieceNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element;
      return elementNode.classList.contains('piece');
    }
    return false;
  });

  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');

  const diff = findStringDifference(classString, _classString);

  if (!!diff.trim()) {
    classString = _classString;
    calculate(pieceMoved);
  }
}

const observer = new MutationObserver(mutationsList => {
  mutationsList.forEach(mutation => {
      if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'class') {
              const targetNode = mutation.target as HTMLElement;
              if (targetNode.classList.contains('piece') && !targetNode.classList.contains('dragging')) {
                testing(targetNode.classList.value)
              }
          }
      }
  });
});

if (board && board.childNodes) {
  board.childNodes.forEach(node => {
    observer.observe(node, { attributes: true, attributeFilter: ['class'] });
  });
}
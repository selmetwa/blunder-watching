import { generateChessboard } from './utils/generate-chess-board';
import { fileLetterToNumberMap } from './constants';
import { calculateColor } from './utils/calculate-color';
import { findStringDifference } from './utils/find-string-difference';
import { simulateExchangeForWhite, simulateExchangeForBlack } from './utils/simulate-exchange';
import { createEmptySquare } from './ui-helpers/create-empty-square';
import { createHangingIcon } from './ui-helpers/create-hanging-icon';
import { createSquareName } from './ui-helpers/create-square-name'
import { createExchangeDiff } from './ui-helpers/create-exchange-diff';

let selectedOption: 'white' | 'black' = 'white';

const link = document.createElement('link');
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
link.rel = 'stylesheet';
document.head.appendChild(link);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'selectedOption') {
    const selectedValue = request.value;
    sendResponse({ status: 'Option received' });
    selectedOption = selectedValue;
    calculate();
  }
});

const board = document.querySelector('wc-chess-board') as HTMLElement

let classString = '';

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

  const emptyNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element;
      return elementNode.classList.contains('empty');
    }
    return false;
  })

  emptyNodes.forEach(childNode => {
    board.removeChild(childNode);
  });

  const _classString = pieceNodes.map(node => {
    const element = node as HTMLElement;
    return `${element.classList[1]}_${element.classList[2]}`;
  }).join('_');
  classString = _classString;

  const chessboard = generateChessboard(pieceNodes as Element[], selectedOption);
  const flatChessboard = chessboard.flat();

  for (const square of flatChessboard) {
    const [file, rank] = square && square.square && square?.square?.split('') || [];
    const selector = `.square-${fileLetterToNumberMap[file]}${rank}`;
    const squareElements = document.querySelectorAll(selector);

    if (square.type === 'e') {
      const emptySquare = createEmptySquare(square)
      board.appendChild(emptySquare);
  }

    squareElements.forEach((squareElement) => {
      const children = squareElement?.querySelectorAll('.attackers-defenders');
      const targetChildren = squareElement?.querySelectorAll('.target');
      children?.forEach((child) => {
        squareElement?.removeChild(child);
      });

      targetChildren?.forEach((child) => {
        squareElement?.removeChild(child);
      });
  
      if (squareElement) {
        const element = squareElement as HTMLElement;
        const color = calculateColor(square.attackers.length, square.defenders.length);
  
        let winnerOfExchange = {
          winner: 'null',
          diff: 0
        };
        if (selectedOption === 'white' && square.color === 'b' && square.defenders.length > 0 && square.attackers.length > 0) {
          winnerOfExchange = simulateExchangeForWhite(square);
        }
        if (selectedOption === 'black' && square.color === 'w' && square.defenders.length > 0 && square.attackers.length > 0) {
          winnerOfExchange = simulateExchangeForBlack(square);
        }
        
        let isHanging = false;
        if (selectedOption === 'white') {
          isHanging = square.color === 'w' ? square.defenders.length === 0 : square.attackers.length === 0;
        } else {
          isHanging = square.color === 'b' ? square.defenders.length === 0 : square.attackers.length === 0;
        }

        element.style.backgroundColor = color || '';
        element.style.opacity = '1';
        const childDiv = document.createElement('div');
        childDiv.classList.add('attackers-defenders');
        const childText = document.createElement('p');
        childText.style.fontSize = '12px';
        childDiv.style.padding = '2px';
        childText.innerText = `${square.defenders.length - square.attackers.length}`;
        childDiv.appendChild(childText);

        element.style.outline = '1px solid black';

        if (isHanging) {
          const iconElement = createHangingIcon()
          element.appendChild(iconElement)
        } else if (winnerOfExchange?.winner !== 'null' && winnerOfExchange.diff > 0) {
          const targetDiv = createExchangeDiff(selectedOption, winnerOfExchange)
          element.appendChild(targetDiv)
        }


        const squareNameDiv = createSquareName(square)
        element.appendChild(squareNameDiv)
        element.appendChild(childDiv);
      }
    })
  }

  if (pieceMoved) {
    const joinedSelector = pieceMoved.split(' ').join('.');
    const pieceMovedElement = document.querySelector(`.${joinedSelector}`) as HTMLElement;
  
    if (pieceMovedElement) {
      const children = pieceMovedElement?.querySelectorAll('.attackers-defenders');
      children?.forEach((child) => {
        pieceMovedElement?.removeChild(child);
      });
      pieceMovedElement.style.backgroundColor = 'transparent';
    }
  }
}

function repaint(pieceMoved: string) {
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

  const _classString = pieceNodes.map(node => {
    const element = node as HTMLElement;
    return `${element.classList[1]}_${element.classList[2]}`;
  }).join('_');

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
                repaint(targetNode.classList.value)
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
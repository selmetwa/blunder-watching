import { generateChessboard } from './utils/generate-chess-board';
import { fileLetterToNumberMap } from './constants';
import { calculateColor } from './utils/calculate-color';
import { findStringDifference } from './utils/find-string-difference';
import { simulateExchangeForWhite, simulateExchangeForBlack } from './utils/simulate-exchange';

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
      const color = calculateColor(square.attackers.length, square.defenders.length);
      const emptySquare = document.createElement('div') as HTMLElement;
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
      emptySquare.classList.add(`square-${fileLetterToNumberMap[file]}${rank}`);
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
          const iconClass = 'fa-solid fa-crosshairs'
          const targetDiv = document.createElement('div');
          const icon = document.createElement('i');
          icon.style.color = 'black';
          icon.style.zIndex = '1000';
          icon.style.fontSize = '12px';
          icon.style.padding = '4px';
          targetDiv.style.position = 'absolute';
          targetDiv.style.top = '0';
          targetDiv.style.right = '0';
          icon.className = iconClass;
          targetDiv.classList.add('target')
          targetDiv.appendChild(icon);
          element.appendChild(targetDiv);
        } else if (winnerOfExchange?.winner !== 'null' && winnerOfExchange.diff > 0) {
          const targetDiv = document.createElement('div');
          const childText = document.createElement('p');
          targetDiv.classList.add('target')
          targetDiv.style.fontSize = '12px'
          targetDiv.style.position = 'absolute';
          targetDiv.style.top = '0';
          targetDiv.style.right = '0';
          targetDiv.style.padding = '2px';
          const prefix = selectedOption === winnerOfExchange.winner  ? '+' : '-'
          childText.innerText = `${prefix}${winnerOfExchange.diff}`
          targetDiv.appendChild(childText);
          element.appendChild(targetDiv)
        }

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
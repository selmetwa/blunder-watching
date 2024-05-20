console.log("content script loaded!")
import { generateChessboard } from './utils/generate-chess-board';
import { fileLetterToNumberMap } from './constants';

const board = document.querySelector('wc-chess-board') as HTMLElement

let classString = '';

function calculateColor(attackers: number, defenders: number) {
  const reds = [
    'rgba(197, 150, 151, 1)', 
    'rgba(190, 137, 137, 1)',
    'rgba(183, 123, 123, 1)',
    'rgba(175, 110, 110, 1)',
    'rgba(168, 97, 97, 1)',
    'rgba(158, 87, 87, 1)',
    'rgba(151, 74, 74, 1)',
    'rgba(144, 61, 61, 1)',
  ]

  const greens = [
    'rgba(151, 196, 175, 1)',
    'rgba(129, 177, 158, 1)',
    'rgba(108, 158, 141, 1)',
    'rgba(86, 139, 124, 1)',
    'rgba(65, 120, 107, 1)',
    'rgba(43, 101, 90, 1)',
    'rgba(22, 82, 73, 1)',
    'rgba(0, 63, 56, 1)',
  ]

  if (attackers === defenders) {
    return 'rgba(201, 240, 255, 1)'; // make this blue
  }

  if (attackers > defenders) {
    return reds[attackers - defenders - 1];
  }

  if (defenders > attackers) {
    return greens[defenders - attackers - 1];
  }
}

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

  const _classString = pieceNodes.map(node => `${node.classList[1]}_${node.classList[2]}`).join('_');
  classString = _classString;

  const chessboard = generateChessboard(pieceNodes);
  const flatChessboard = chessboard.flat();
  console.log({ flatChessboard, childNodes, emptyNodes })

  for (const square of flatChessboard) {
    const [file, rank] = square && square.square && square?.square?.split('') || [];
    const selector = `.square-${fileLetterToNumberMap[file]}${rank}`;
    const squareElements = document.querySelectorAll(selector);

    if (square.type === 'e') {
      const color = calculateColor(square.attackers.length, square.defenders.length);
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
      children?.forEach((child) => {
        squareElement?.removeChild(child);
      });
  


      if (squareElement) {
        const color = calculateColor(square.attackers.length, square.defenders.length);
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
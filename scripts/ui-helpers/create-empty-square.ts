import { Square } from "../types"
import { fileLetterToNumberMap } from '../constants';
import { calculateColor } from '../utils/calculate-color';

export const createEmptySquare = (square: Square) => {
  const [file, rank] = square && square.square && square?.square?.split('') || [];

  const color = calculateColor(square.attackers.length, square.defenders.length);

  const emptySquare = document.createElement('div') as HTMLElement;
  emptySquare.style.backgroundSize = '100%';
  emptySquare.style.cursor = 'pointer';
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
  childDiv.style.padding = '2px';

  const childText = document.createElement('p');
  childText.style.fontSize = '12px';
  childText.innerText = `${square.defenders.length - square.attackers.length}`;
  childDiv.appendChild(childText);
  emptySquare.appendChild(childDiv);

  const squareNameDiv = document.createElement('div')
  squareNameDiv.classList.add('target')
  const squareNameText = document.createElement('p');
  squareNameText.textContent = `${square.square}`
  squareNameText.style.fontSize = '11px'
  squareNameDiv.style.position = 'absolute';
  squareNameDiv.style.bottom = '0';
  squareNameDiv.style.right = '0';
  squareNameDiv.style.padding = '2px';
  squareNameDiv.appendChild(squareNameText)
  emptySquare.appendChild(squareNameDiv)

  return emptySquare
}
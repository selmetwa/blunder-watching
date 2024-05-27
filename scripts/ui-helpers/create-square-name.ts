import { Square } from "../types"

export const createSquareName = (square: Square) => {
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

  return squareNameDiv
}
export const createExchangeDiff = (selectedOption: 'white' | 'black', winnerOfExchange: {
  winner: string,
  diff: number
}) => {
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

  return targetDiv
}
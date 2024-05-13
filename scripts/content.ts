console.log("content script loaded!")
import { generate2dArray } from './utils/generate-2d-array';

const board = document.querySelector('wc-chess-board') as HTMLElement

function calculate() {
  const childNodes = board.childNodes;
  
  const pieceNodes = Array.from(childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element;
      return elementNode.classList.contains('piece');
    }
    return false;
  });
  
  generate2dArray(pieceNodes);
}

calculate();

// Create a new MutationObserver instance
const observer = new MutationObserver(mutationsList => {
  // Check each mutation in the list
  mutationsList.forEach(mutation => {
      // Check if the mutation is an attribute change
      if (mutation.type === 'attributes') {
          // Check if the changed attribute is the class name
          if (mutation.attributeName === 'class') {
              const targetNode = mutation.target as HTMLElement;
              // Check if the target node is a child node with the "piece" class and not the "dragging" class
              if (targetNode.classList.contains('piece') && !targetNode.classList.contains('dragging')) {
                calculate(); // Replace 'yourFunction' with the function you want to run
              }
          }
      }
  });
});

// Configure the observer to watch for attribute changes (specifically class changes) in the child nodes of the board element
if (board && board.childNodes) {
  board.childNodes.forEach(node => {
    observer.observe(node, { attributes: true, attributeFilter: ['class'] });
  });
}

import { Square } from "../types";

type color = 'white' | 'black' | 'null';

export const simulateExchangeForWhite = (square: Square): {
  winner: color,
  diff: number
} => {
  // Clone and sort the attackers and defenders by value (ascending order)
  let whiteAttackers = [...square.defenders].sort((a, b) => a.value - b.value) ?? [];
  let blackDefenders = [...square.attackers].sort((a, b) => a.value - b.value) ?? [];

  // Include the piece on the square in the defenders array
  blackDefenders.unshift(square)
  let whiteLostValue = 0;
  let blackLostValue = 0;

  // Simulate the exchange
  while (whiteAttackers.length > 0 && blackDefenders.length > 0) {
    // White captures a black piece
    blackLostValue += (blackDefenders.shift()?.value ?? 0);
    
    // If there are still defenders left, black captures a white piece
    if (blackDefenders.length > 0) {
      whiteLostValue += whiteAttackers.shift()?.value ?? 0;
    }
  }

  // Determine if white wins the exchange
  if (blackLostValue > whiteLostValue) {
      return {
          winner: 'white',
          diff: blackLostValue - whiteLostValue
      };
  } else if (blackLostValue < whiteLostValue) {
      return {
          winner: 'black',
          diff: whiteLostValue - blackLostValue
      };
  } else {
      return {
          winner: 'null',
          diff: 0
      };
  }
}

export const simulateExchangeForBlack = (square: Square): {
  winner: color,
  diff: number
} => {
  // Clone and sort the attackers and defenders by value (ascending order)
  let blackAttackers = [...square.defenders].sort((a, b) => a.value - b.value) ?? [];
  let whiteDefenders = [...square.attackers].sort((a, b) => a.value - b.value) ?? [];
  
  // Include the piece on the square in the defenders array
  whiteDefenders.unshift(square);

  let blackLostValue = 0;
  let whiteLostValue = 0;

  // Simulate the exchange
    while (blackAttackers.length > 0 && whiteDefenders.length > 0) {
      // Black captures a white piece
      whiteLostValue += (whiteDefenders.shift()?.value ?? 0);
      
      // If there are still defenders left, white captures a black piece
      if (whiteDefenders.length > 0) {
        blackLostValue += (blackAttackers.shift()?.value ?? 0);
      }
    }

  // Determine if black wins the exchange
  if (whiteLostValue > blackLostValue) {
      return {
          winner: 'black',
          diff: whiteLostValue - blackLostValue
      };
  } else if (whiteLostValue < blackLostValue) {
      return {
          winner: 'white',
          diff: blackLostValue - whiteLostValue
      };
  } else {
      return {
          winner: 'null',
          diff: 0
      };
  }
}

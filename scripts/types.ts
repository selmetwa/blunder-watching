export type SquareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';

export type Square = {
    color: string | null,
    type: SquareType,
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
    class: string
};

export type Chessboard = Square[][];
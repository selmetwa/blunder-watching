export type SquareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';

export type Square = {
    color: 'w' | 'b' | null,
    type: SquareType,
    square: string,
    attackers: Array<Square>,
    defenders: Array<Square>,
    class: string
    value: number
};

export type Chessboard = Square[][];
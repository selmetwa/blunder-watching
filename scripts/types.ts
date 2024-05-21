export type SquareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';

export type Square = {
    color: string | null,
    type: SquareType,
    square: string,
    attackers: Array<Square>,
    defenders: Array<Square>,
    class: string
};

export type Chessboard = Square[][];
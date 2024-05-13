export type squareType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'e';

export type square = {
    color: string | null,
    type: squareType, 
    square: string,
    attackers: Array<any>,
    defenders: Array<any>,
}

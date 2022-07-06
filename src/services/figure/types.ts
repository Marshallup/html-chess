export type FigureType = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook' | 'pawnKing';

export interface Figure {
    type: FigureType,
    isWhite: boolean,
    isFirstMove: boolean,
    isActive: boolean,
}

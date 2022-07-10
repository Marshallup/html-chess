export type FigureType = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook' | 'pawnKing';

export interface Figure {
    type: FigureType,
    isWhite: boolean,
    isFirstMove: boolean,
    isActive: boolean,
}

export interface CellsAction {
    moveCellsID: string[],
    cutCellsID: string[],
}

export interface CellsIDSides {
    top: string[],
    right: string[],
    bottom: string[],
    left: string[],
}

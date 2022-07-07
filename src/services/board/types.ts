import { Figure } from '../figure/types';

export type Player = 'player1' | 'player2';

export interface BoardCell {
    figure: Figure | false,
    isEven: boolean,
}

export interface PlayerInfo {
    countFigures: number,
    countCutFigures: number,
}

export interface Board {
    whitePlayer: PlayerInfo,
    blackPlayer: PlayerInfo,
    cells: {
        [id: string]: BoardCell
    },
}

import { Figure } from '../Figure/types';
// import Queen from '../Figures/Queen';
// import Pawn from '../Figures/Pawn';
// import Rook from '../Figures/Rook';
// import King from '../Figures/King';
// import Knight from '../Figures/Knight';
// import Bishop from '../Figures/Bishop';

export interface PlayerInfo {
  countFigures: number,
  countCutFigures: number,
}

export interface BoardCellData {
  figure: Figure | false,
  isEven: boolean,
}

export type BoardCells = {
  [id: string]: BoardCellData;
}

export interface Board {
  whitePlayer: PlayerInfo,
  blackPlayer: PlayerInfo,
  cells: BoardCells,
}

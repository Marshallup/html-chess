import {
  getFigureAfterInit,
  FigureType,
  CellsAction,
  createCellActionData,
} from '../figure';
import { LETTERS } from './consts';
import {
  getCellIdFromIdx,
  getIsEvenCell,
  parseCellID,
} from './helpers';
import { availCellsForPawn } from '../pawn';
import { avaiableCellsForRook } from '../rook';
import { avaiableCellsForKnight } from '../knight';
import { Board, BoardCell } from './types';

export * from './helpers';
export * from './types';

export function createBoardData(): Board['cells'] {
  const boardCells: Board['cells'] = {};

  for (let i = 0; i < 64; i += 1) {
    const obj: BoardCell = {
      figure: getFigureAfterInit(i),
      isEven: getIsEvenCell(i),
    };

    boardCells[getCellIdFromIdx(i)] = obj;
  }

  console.log(boardCells, 'boardCells');

  return boardCells;
}

export function getAvaiableCells(
  boardData: Board['cells'],
  figureType: FigureType,
  isFirstZood: boolean,
  cellID: string,
  isFirstPlayer: boolean,
): CellsAction {
  const [numberCell, letterCell] = parseCellID(cellID);
  const idxLetter = LETTERS.indexOf(letterCell);
  const currentCell = boardData[cellID];

  switch (figureType) {
    case 'pawn':
      return availCellsForPawn(
        boardData,
        isFirstPlayer,
        isFirstZood,
        numberCell,
        letterCell,
        idxLetter,
        currentCell,
      );
    case 'rook':
      return avaiableCellsForRook(
        boardData,
        numberCell,
        letterCell,
        idxLetter,
        isFirstPlayer,
      );
    case 'knight':
      return avaiableCellsForKnight(
        boardData,
        numberCell,
        letterCell,
        idxLetter,
        isFirstPlayer,
      );
    default:
      return createCellActionData();
  }
}

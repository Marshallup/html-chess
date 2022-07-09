import { checkIsOtherPlayerFigure, getCellsAction, CellsAction } from '../figure';
import { LETTERS } from '../board/consts';
import { Board, BoardCell } from '../board/types';

export function cutDownCellsForPawn(
  boardData: Board['cells'],
  isFirstPlayer: boolean,
  idxLetter: number,
  numberCell: number,
  currentCell: BoardCell,
): string[] {
  const cutDownCells = [];
  const numberMoveCell = isFirstPlayer ? numberCell + 1 : numberCell - 1;
  const leftLetter = `${numberMoveCell}${LETTERS[idxLetter - 1]}`;
  const rightLetter = `${numberMoveCell}${LETTERS[idxLetter + 1]}`;
  const leftCell = boardData[leftLetter];
  const rightCell = boardData[rightLetter];

  if (checkIsOtherPlayerFigure(leftCell?.figure, currentCell?.figure)) {
    cutDownCells.push(leftLetter);
  }

  if (checkIsOtherPlayerFigure(rightCell?.figure, currentCell?.figure)) {
    cutDownCells.push(rightLetter);
  }

  return cutDownCells;
}

export function availCellsForPawn(
  boardData: Board['cells'],
  isFirstPlayer: boolean,
  isFirstZood: boolean,
  numberCell: number,
  letterCell: string,
  idxLetter: number,
  currentCell: BoardCell,
): CellsAction {
  const avaiableCells = [];

  if (isFirstPlayer) {
    avaiableCells.push(`${numberCell + 1}${letterCell}`);

    if (isFirstZood) {
      avaiableCells.push(`${numberCell + 2}${letterCell}`);
    }
  } else {
    avaiableCells.push(`${numberCell - 1}${letterCell}`);

    if (isFirstZood) {
      avaiableCells.push(`${numberCell - 2}${letterCell}`);
    }
  }

  const cellsAction = getCellsAction(boardData, avaiableCells, isFirstPlayer);

  cellsAction.cutCellsID = cutDownCellsForPawn(
    boardData,
    isFirstPlayer,
    idxLetter,
    numberCell,
    currentCell,
  );

  return cellsAction;
}

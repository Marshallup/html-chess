import { Board } from '../board/types';
import { LETTERS, COUNT_CELLS } from '../board/consts';
import { getCellsAction, CellsAction, CellsIDSides } from '../figure';

export function getCellsIDFromRook(
  numberCell: number,
  letterCell: string,
  letterIdx: number,
) {
  const cellsID: CellsIDSides = {
    top: [],
    right: [],
    bottom: [],
    left: [],
  };

  for (let i = numberCell + 1; i <= COUNT_CELLS; i += 1) {
    cellsID.top.push(`${i}${letterCell}`);
  }

  for (let i = letterIdx + 1; i < LETTERS.length; i += 1) {
    cellsID.right.push(`${numberCell}${LETTERS[i]}`);
  }

  for (let i = numberCell - 1; i >= 1; i -= 1) {
    cellsID.bottom.push(`${i}${letterCell}`);
  }

  for (let i = letterIdx - 1; i >= 0; i -= 1) {
    cellsID.left.push(`${numberCell}${LETTERS[i]}`);
  }

  return cellsID;
}

export function getCells(
  boardData: Board['cells'],
  availableCells: string[],
  isFirstPlayer: boolean,
): CellsAction {
  let idxEnemy = -1;

  const cells = getCellsAction(
    boardData,
    availableCells,
    isFirstPlayer,
    (_, idxFigureEnemy) => {
      idxEnemy = idxFigureEnemy;
    },
  );

  if (idxEnemy > -1) {
    cells.cutCellsID = [availableCells[idxEnemy]];
  }

  return cells;
}

export function avaiableCellsForRook(
  boardData: Board['cells'],
  numberCell: number,
  letterCell: string,
  letterIdx: number,
  isFirstPlayer: boolean,
): CellsAction {
  const cells = getCellsIDFromRook(numberCell, letterCell, letterIdx);

  const top = getCells(
    boardData,
    cells.top,
    isFirstPlayer,
  );
  const right = getCells(
    boardData,
    cells.right,
    isFirstPlayer,
  );
  const bottom = getCells(
    boardData,
    cells.bottom,
    isFirstPlayer,
  );
  const left = getCells(
    boardData,
    cells.left,
    isFirstPlayer,
  );

  return {
    moveCellsID: [
      ...top.moveCellsID,
      ...right.moveCellsID,
      ...bottom.moveCellsID,
      ...left.moveCellsID,
    ],
    cutCellsID: [
      ...top.cutCellsID,
      ...right.cutCellsID,
      ...bottom.cutCellsID,
      ...left.cutCellsID,
    ],
  };
}

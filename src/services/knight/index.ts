import { Board } from '../board/types';
import { LETTERS } from '../board/consts';
import {
  createCellActionData,
  createCellSides,
  isEnemyFigure,
} from '../figure';
import { CellsIDSides, CellsAction } from '../figure/types';

export function getCells(
  numberCell: number,
  letterIdx: number,
): CellsIDSides {
  const sides = createCellSides();

  if (numberCell <= 6) {
    if (letterIdx > 0) {
      sides.top.push(`${numberCell + 2}${LETTERS[letterIdx - 1]}`);
    }

    if (letterIdx < LETTERS.length) {
      sides.top.push(`${numberCell + 2}${LETTERS[letterIdx + 1]}`);
    }
  }

  if (letterIdx + 2 <= 6) {
    if (letterIdx >= 2) {
      sides.right.push(`${numberCell - 1}${LETTERS[letterIdx + 2]}`);
    }

    if (letterIdx <= 6 && numberCell <= 7) {
      sides.right.push(`${numberCell + 1}${LETTERS[letterIdx + 2]}`);
    }
  }

  if (letterIdx - 2 >= 0) {
    if (numberCell >= 2) {
      sides.left.push(`${numberCell - 1}${LETTERS[letterIdx - 2]}`);
    }
    if (numberCell <= 7) {
      sides.left.push(`${numberCell + 1}${LETTERS[letterIdx - 2]}`);
    }
  }

  if (numberCell - 2 >= 1) {
    if (letterIdx >= 1) {
      sides.bottom.push(`${numberCell - 2}${LETTERS[letterIdx - 1]}`);
    }

    if (letterIdx <= 7) {
      sides.bottom.push(`${numberCell - 2}${LETTERS[letterIdx + 1]}`);
    }
  }

  return sides;
}

export function getAvailableCell(
  boardData: Board['cells'],
  cellIds: string[],
  isFirstPlayer: boolean,
) {
  const data = createCellActionData();

  cellIds.forEach((cellID) => {
    const { figure } = boardData[cellID];

    if (figure) {
      const isFriendFigure = isEnemyFigure(boardData, cellID, isFirstPlayer);

      if (!isFriendFigure) {
        data.cutCellsID.push(cellID);
      }
    } else {
      data.moveCellsID.push(cellID);
    }
  });

  return data;
}

export function avaiableCellsForKnight(
  boardData: Board['cells'],
  numberCell: number,
  letterCell: string,
  letterIdx: number,
  isFirstPlayer: boolean,
): CellsAction {
  const cells = getCells(
    numberCell,
    letterIdx,
  );
  const actions = createCellActionData();

  Object.values(cells).forEach((cellsIds) => {
    const cellsAction = getAvailableCell(boardData, cellsIds, isFirstPlayer);

    actions.moveCellsID = [
      ...actions.moveCellsID,
      ...cellsAction.moveCellsID,
    ];

    actions.cutCellsID = [
      ...actions.cutCellsID,
      ...cellsAction.cutCellsID,
    ];
  });

  return actions;
}

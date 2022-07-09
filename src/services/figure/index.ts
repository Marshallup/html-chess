import { FigureType, CellsAction } from './types';
import { BoardCell, Board } from '../board/types';

export * from './types';

export function createCellActionData(): CellsAction {
  return {
    moveCellsID: [],
    cutCellsID: [],
  };
}

export function getCellsAction(
  boardData: Board['cells'],
  availableCells: string[],
  isFirstPlayer: boolean,
  cbStraightEnemyFigure?: (
    cells: CellsAction,
    findIdxFigure: number
  ) => void,
): CellsAction {
  const cells: CellsAction = {
    moveCellsID: availableCells,
    cutCellsID: [],
  };
  const idxCellFigure = availableCells.findIndex((cellID) => boardData[cellID]?.figure);
  const figure = boardData[availableCells[idxCellFigure]]?.figure;

  if (figure) {
    const isFriendFigure = figure.isWhite === isFirstPlayer;

    cells.moveCellsID = availableCells.filter((_, cellIdx) => cellIdx < idxCellFigure);

    if (!isFriendFigure) {
      cbStraightEnemyFigure?.(cells, idxCellFigure);
    }
  }

  return cells;
}

export function getIsWhiteFigure(idx: number): boolean {
  if (idx >= 48) {
    return true;
  }

  return false;
}

export function getFigureAfterInit(idx: number): BoardCell['figure'] {
  let figure: FigureType | undefined;

  if (idx < 16) {
    if (idx >= 8) {
      figure = 'pawn';
    }

    if (idx === 0 || idx === 7) {
      figure = 'rook';
    }

    if (idx === 1 || idx === 6) {
      figure = 'knight';
    }

    if (idx === 2 || idx === 5) {
      figure = 'bishop';
    }

    if (idx === 3) {
      figure = 'king';
    }

    if (idx === 4) {
      figure = 'queen';
    }
  }

  if (idx >= 48) {
    if (idx < 56) {
      figure = 'pawn';
    }

    if (idx === 56 || idx === 63) {
      figure = 'rook';
    }
    if (idx === 57 || idx === 62) {
      figure = 'knight';
    }
    if (idx === 58 || idx === 61) {
      figure = 'bishop';
    }
    if (idx === 59) {
      figure = 'king';
    }
    if (idx === 60) {
      figure = 'queen';
    }
  }

  if (figure) {
    return {
      type: figure,
      isWhite: getIsWhiteFigure(idx),
      isFirstMove: true,
      isActive: false,
    };
  }
  return false;
}

export function checkIsOtherPlayerFigure(figure1: BoardCell['figure'], figure2: BoardCell['figure']) {
  if (figure1 && figure2) {
    return figure1.isWhite !== figure2.isWhite;
  }

  return false;
}

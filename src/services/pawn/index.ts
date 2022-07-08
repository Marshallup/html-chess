import { checkIsOtherPlayerFigure } from '../figure';
import { Board, BoardCell } from '../board/types';

export function canMoveCells(boardData: Board['cells'], avaiableCells: string[]): string[] {
  const idxCellWithFigure = avaiableCells.findIndex((cellID) => boardData[cellID]?.figure);

  if (idxCellWithFigure > -1) {
    return avaiableCells.filter((_, cellIdx) => cellIdx > idxCellWithFigure);
  }

  return avaiableCells;
}

export function availCellsForPawn(
  boardData: Board['cells'],
  isFirstPlayer: boolean,
  isFirstZood: boolean,
  numberCell: number,
  letterCell: string,
) {
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

  if (avaiableCells.length) {
    return canMoveCells(boardData, avaiableCells);
  }

  return avaiableCells;
}

export function cutDownCellsForPawn(
  boardData: Board['cells'],
  isFirstPlayer: boolean,
  idxLetter: number,
  numberCell: number,
  currentCell: BoardCell,
  letters: string[],
): string[] {
  const cutDownCells = [];
  const numberMoveCell = isFirstPlayer ? numberCell + 1 : numberCell - 1;
  const leftLetter = `${numberMoveCell}${letters[idxLetter - 1]}`;
  const rightLetter = `${numberMoveCell}${letters[idxLetter + 1]}`;
  const leftCell = boardData[leftLetter];
  const rightCell = boardData[rightLetter];

  if (checkIsOtherPlayerFigure(leftCell.figure, currentCell.figure)) {
    cutDownCells.push(leftLetter);
  }

  if (checkIsOtherPlayerFigure(rightCell.figure, currentCell.figure)) {
    cutDownCells.push(rightLetter);
  }

  return cutDownCells;
}

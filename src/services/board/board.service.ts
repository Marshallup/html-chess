import { getFigureAfterInit } from '../figure/figure.service';
import { FigureType } from '../figure/types';
import { Board, BoardCell } from './types';

export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const countCells = 8;

export function isNumberCell(idx: number) {
  if (idx % countCells === 0) {
    return true;
  }

  return false;
}
export function getNumberCell(idx: number) {
  return countCells - idx / countCells;
}
export function isWordCell(idx: number): boolean {
  if (idx > 55) {
    return true;
  }

  return false;
}
export function getWordCell(idx: number): string {
  return letters[idx - 56];
}
export function getLetterBoard(
  cellIdx: number,
  cellNumber: number,
  idxMinus: number,
) {
  return `${countCells - cellNumber}${letters[countCells - (idxMinus - cellIdx)]}`;
}
export function getCellIdFromIdx(idx: number) {
  const cellNumber = idx + 1;

  if (cellNumber < 9) {
    return `${countCells}${letters[idx]}`;
  }

  if (cellNumber < 17) {
    return getLetterBoard(cellNumber, 1, 17);
  }

  if (cellNumber < 25) {
    return getLetterBoard(cellNumber, 2, 25);
  }

  if (cellNumber < 33) {
    return getLetterBoard(cellNumber, 3, 33);
  }

  if (cellNumber < 41) {
    return getLetterBoard(cellNumber, 4, 41);
  }

  if (cellNumber < 49) {
    return getLetterBoard(cellNumber, 5, 49);
  }

  if (cellNumber < 57) {
    return getLetterBoard(cellNumber, 6, 57);
  }

  return getLetterBoard(cellNumber, 7, 65);
}

export function isFillCell(idx: number) {
  if ((idx / countCells) % 2 < 1) {
    if (idx % 2 === 0) {
      return false;
    }
    return true;
  }

  if (idx % 2 === 0) {
    return true;
  }

  return false;
}

export function getIsEvenCell(idx: number): boolean {
  if (idx % 2 === 0) {
    return true;
  }

  return false;
}

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

export function getIsAvailableCell(availableCells: string[], cellID: string) {
  return availableCells.indexOf(cellID) > -1;
}

export function getAvaiableCells(
  figureType: FigureType,
  isFirstZood: boolean,
  cellID: string,
  isFirstPlayer: boolean,
): string[] {
  const cellIDArr = cellID.split('');
  const numberCell = +cellIDArr[0];
  const letterCell = cellIDArr[1];
  // const indexLetter = letters.indexOf(letterCell);
  const avaiableCells: string[] = [];

  switch (figureType) {
    case 'pawn':
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

      break;
    default:
      return [];
  }

  return avaiableCells;
}

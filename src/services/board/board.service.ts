import { getFigureAfterInit } from '../figure/figure.service';
import { Board, BoardCell } from './types';

export function isNumberCell(idx: number) {
  if (idx % 8 === 0) {
    return true;
  }

  return false;
}
export function getNumberCell(idx: number) {
  return 8 - idx / 8;
}
export function isWordCell(idx: number): boolean {
  if (idx > 55) {
    return true;
  }

  return false;
}
export function getWordCell(idx: number): string {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return letters[idx - 56];
}
export function getCellIdFromIdx(idx: number) {
  const cellNumber = idx + 1;

  if (cellNumber < 9) {
    return `a${cellNumber}`;
  }

  if (cellNumber < 17) {
    return `b${cellNumber}`;
  }

  if (cellNumber < 25) {
    return `c${cellNumber}`;
  }

  if (cellNumber < 33) {
    return `d${cellNumber}`;
  }

  if (cellNumber < 41) {
    return `e${cellNumber}`;
  }

  if (cellNumber < 49) {
    return `f${cellNumber}`;
  }

  if (cellNumber < 57) {
    return `g${cellNumber}`;
  }

  return `h${cellNumber}`;
}

export function isFillCell(idx: number) {
  if ((idx / 8) % 2 < 1) {
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

  return boardCells;
}

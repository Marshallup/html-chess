import { FigureType } from './types';
import { BoardCell } from '../board/types';

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

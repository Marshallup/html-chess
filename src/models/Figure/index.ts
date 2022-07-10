import { FigureType } from './types';

abstract class Figure {
  type: FigureType;

  isWhite: boolean;

  isFirstMove = true;

  isActive = false;

  constructor(
    type: FigureType,
    isWhite: boolean,
  ) {
    this.type = type;
    this.isWhite = isWhite;
  }

  static getIsWhiteFigure(idx: number): boolean {
    if (idx >= 48) {
      return true;
    }

    return false;
  }
}

export default Figure;
export * from './types';

import { BoardCells, BoardCellData } from './types';
import Figure, { FigureType } from '../Figure';
import Queen from '../Figures/Queen';
import Pawn from '../Figures/Pawn';
import Rook from '../Figures/Rook';
import King from '../Figures/King';
import Knight from '../Figures/Knight';
import Bishop from '../Figures/Bishop';

class Board {
  private static LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  private static COUNT_CELLS = 8;

  data: BoardCells;

  constructor() {
    this.data = Board.setStartPosFigures();
  }

  private static getIsEvenCell(idx: number): boolean {
    if (idx % 2 === 0) {
      return true;
    }
    return false;
  }

  private static getFigureTypeAfterInit(idx: number): FigureType | '' {
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
      return figure;
    }
    return '';
  }

  private static getLetterBoard(
    cellIdx: number,
    cellNumber: number,
    idxMinus: number,
  ) {
    return `${Board.COUNT_CELLS - cellNumber}${Board.LETTERS[Board.COUNT_CELLS - (idxMinus - cellIdx)]}`;
  }

  private static getCellIdFromIdx(idx: number) {
    const cellNumber = idx + 1;

    if (cellNumber < 9) {
      return `${Board.COUNT_CELLS}${Board.LETTERS[idx]}`;
    }

    if (cellNumber < 17) {
      return Board.getLetterBoard(cellNumber, 1, 17);
    }

    if (cellNumber < 25) {
      return Board.getLetterBoard(cellNumber, 2, 25);
    }

    if (cellNumber < 33) {
      return Board.getLetterBoard(cellNumber, 3, 33);
    }

    if (cellNumber < 41) {
      return Board.getLetterBoard(cellNumber, 4, 41);
    }

    if (cellNumber < 49) {
      return Board.getLetterBoard(cellNumber, 5, 49);
    }

    if (cellNumber < 57) {
      return Board.getLetterBoard(cellNumber, 6, 57);
    }

    return Board.getLetterBoard(cellNumber, 7, 65);
  }

  private static initFigureByType(type: FigureType | '', idx: number): BoardCellData['figure'] {
    switch (type) {
      case 'pawn':
        return new Pawn(Figure.getIsWhiteFigure(idx));
      case 'bishop':
        return new Bishop(Figure.getIsWhiteFigure(idx));
      case 'king':
        return new King(Figure.getIsWhiteFigure(idx));
      case 'knight':
        return new Knight(Figure.getIsWhiteFigure(idx));
      case 'queen':
        return new Queen(Figure.getIsWhiteFigure(idx));
      case 'rook':
        return new Rook(Figure.getIsWhiteFigure(idx));
      default:
        return false;
    }
  }

  private static setStartPosFigures() {
    const boardCells: BoardCells = {};

    for (let i = 0; i < 64; i += 1) {
      const typeFigure = Board.getFigureTypeAfterInit(i);
      const obj: BoardCellData = {
        figure: Board.initFigureByType(typeFigure, i),
        isEven: Board.getIsEvenCell(i),
      };
      boardCells[Board.getCellIdFromIdx(i)] = obj;
    }
    console.log(boardCells, 'boardCells class');
    return boardCells;
  }
}

export * from './types';
export default Board;

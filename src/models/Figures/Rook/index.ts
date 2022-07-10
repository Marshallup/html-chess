import Figure from '@/models/Figure';

class Rook extends Figure {
  constructor(isWhite: boolean) {
    super('rook', isWhite);
  }
}

export default Rook;

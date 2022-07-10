import Figure from '@/models/Figure';

class Pawn extends Figure {
  constructor(isWhite: boolean) {
    super('pawn', isWhite);
  }
}

export default Pawn;

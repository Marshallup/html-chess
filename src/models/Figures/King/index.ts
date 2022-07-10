import Figure from '@/models/Figure';

class King extends Figure {
  constructor(isWhite: boolean) {
    super('king', isWhite);
  }
}

export default King;

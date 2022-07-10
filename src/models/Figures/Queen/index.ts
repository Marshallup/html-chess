import Figure from '@/models/Figure';

class Queen extends Figure {
  constructor(isWhite: boolean) {
    super('queen', isWhite);
  }
}

export default Queen;

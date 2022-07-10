import Figure from '@/models/Figure';

class Knight extends Figure {
  constructor(isWhite: boolean) {
    super('knight', isWhite);
  }
}

export default Knight;

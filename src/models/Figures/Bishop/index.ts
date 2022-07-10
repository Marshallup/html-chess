import Figure from '@/models/Figure';

class Bishop extends Figure {
  constructor(isWhite: boolean) {
    super('bishop', isWhite);
  }
}

export default Bishop;

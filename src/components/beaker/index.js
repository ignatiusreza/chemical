import { MIX } from 'constants/elements';

class Beaker {
  mix(a, b) {
    return MIX[a][b];
  }
}

export default Beaker;

import { ELEMENTARY, MIX } from 'constants/elements';
import Element from 'components/element';

class Beaker {
  constructor() {
    this.elements = ELEMENTARY.map(element => new Element(element));
  }

  attached() {
    this.raf = window.requestAnimationFrame(this.tick);
  }

  detached() {
    window.cancelAnimationFrame(this.raf);
  }

  onMouseUp() {
    this._broadcast('onMouseUp');
  }

  tick = () => {
    this._broadcast('tick');
    this.raf = window.requestAnimationFrame(this.tick);
  };

  mix(a, b) {
    return MIX[a][b];
  }

  _broadcast(event) {
    this.elements.forEach(element => element[event]());
  }
}

export default Beaker;

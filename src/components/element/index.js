import { SPEED } from 'constants/config';
import { ELEMENTS } from 'constants/elements';

class Element {
  constructor(index) {
    this.index = index;
    this.x = Math.random() * 100; // between 0 ~ 100%
    this.y = Math.random() * 100;
    this.dx = Math.random() * SPEED * 2 - SPEED; // between -SPEED ~ SPEED
    this.dy = Math.random() * SPEED * 2 - SPEED;
  }

  display() {
    return ELEMENTS[this.index];
  }

  tick = () => {
    this._updateX();
    this._updateY();
  };

  _updateX() {
    const [x, dx] = this._update(this.x, this.dx);

    this.x = x;
    this.dx = dx;
  }

  _updateY() {
    const [y, dy] = this._update(this.y, this.dy);

    this.y = y;
    this.dy = dy;
  }

  _update(a, da) {
    a = a + da;

    if (a < 0) {
      return [-a, -da];
    } else if (a > 100) {
      return [100 - (a - 100), -da];
    } else {
      return [a, da];
    }
  }
}

export default Element;

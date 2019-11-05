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

  setPosition(x, y) {
    this.x = this._inRelativeTo(x, window.innerWidth);
    this.y = this._inRelativeTo(y, window.innerHeight);
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseMove(event) {
    if (!this.isMouseDown) return;

    this.x = this._inRelativeTo(event.pageX, window.innerWidth);
    this.y = this._inRelativeTo(event.pageY, window.innerHeight);
    this.dx = this._inRelativeTo(event.movementX / 5, window.innerWidth, SPEED * 5);
    this.dy = this._inRelativeTo(event.movementY / 5, window.innerHeight, SPEED * 5);
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onTouchStart(event) {
    console.log('onTouchStart');
    this._prevTouches = [event.touches[0]];
    this.onMouseDown();
  }

  onTouchMove(event) {
    this.onMouseMove(this._translateTouchEvent('mousemove', event));
    this._prevTouches.push(event.touches[0]);
  }

  onTouchEnd() {
    this._prevTouches = [];
    this.onMouseUp();
  }

  display() {
    return ELEMENTS[this.index];
  }

  tick = () => {
    if (this.isMouseDown) return;

    this._updateX();
    this._updateY();
  };

  _translateTouchEvent(type, touchEvent) {
    const touch = touchEvent.touches[0];
    // comparing the last touch with the one before it tend to result in 0 movement,
    // hence we calculate average movements from all the touches
    const movement = this._prevTouches.reduce(
      ({ x, y, prev }, touch) => ({
        x: x + (touch.pageX - prev.pageX),
        y: y + (touch.pageY - prev.pageY),
        prev: touch,
      }),
      { x: 0, y: 0, prev: this._prevTouches[0] },
    );

    return {
      pageX: touch.pageX,
      pageY: touch.pageY,
      movementX: movement.x / this._prevTouches.length,
      movementY: movement.y / this._prevTouches.length,
    };
  }

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

  _inRelativeTo(local, global, boundary = 100) {
    let percentage = (local / global) * 100;

    if (percentage > boundary) return boundary;
    else if (percentage < -boundary) return -boundary;
    else return percentage;
  }
}

export default Element;

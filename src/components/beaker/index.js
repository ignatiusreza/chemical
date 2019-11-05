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

  onMouseMove(event) {
    const element = this._getDraggedElement();

    if (element) element.onMouseMove(event);
  }

  onMouseUp(event) {
    this._checkForCollision(event);
    this._broadcast('onMouseUp');
  }

  onTouchMove(event) {
    const element = this._getDraggedElement();

    if (element) element.onTouchMove(event);
  }

  onTouchEnd(event) {
    const mouseEvent = this._translateTouchEvent('mouseup', event);
    this.onMouseUp(mouseEvent);
  }

  tick = () => {
    this._broadcast('tick');
    this.raf = window.requestAnimationFrame(this.tick);
  };

  _checkForCollision(event) {
    let draggedElement = this._getDraggedElement();
    if (!draggedElement) {
      this._spawnNewElement(event);
      return;
    }

    let collidingElement = this._getCollidingElement(draggedElement);
    if (!collidingElement) return;

    this._mix(event, draggedElement, collidingElement);
  }

  _spawnNewElement(event) {
    let index = Math.floor(Math.random() * ELEMENTARY.length);
    let newElement = new Element(ELEMENTARY[index]);

    newElement.setPosition(event.pageX, event.pageY);
    this.elements.push(newElement);
  }

  _getDraggedElement() {
    return this.elements.find(element => element.isMouseDown);
  }

  _getCollidingElement(draggedElement) {
    return this.elements.find(
      element => element !== draggedElement && this._isCollide(draggedElement.node, element.node),
    );
  }

  _isCollide(a, b) {
    return !(
      a.offsetTop + a.clientHeight < b.offsetTop ||
      a.offsetTop > b.offsetTop + b.clientHeight ||
      a.offsetLeft + a.clientWidth < b.offsetLeft ||
      a.offsetLeft > b.offsetLeft + b.clientWidth
    );
  }

  _translateTouchEvent(type, touchEvent) {
    const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];

    return { pageX: touch.pageX, pageY: touch.pageY };
  }

  _mix(event, a, b) {
    let target = MIX[a.index]?.[b.index];

    if (!target) return;

    let merged = new Element(target);
    merged.setPosition(event.pageX, event.pageY);

    this.elements.splice(this.elements.indexOf(a), 1);
    this.elements.splice(this.elements.indexOf(b), 1);

    this.elements.push(merged);
  }

  _broadcast(event) {
    this.elements.forEach(element => element[event]());
  }
}

export default Beaker;

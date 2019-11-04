import { ELEMENTS } from 'constants/elements';
import Element from 'components/element';

describe('Element', () => {
  describe('onMouseMove', () => {
    it('updates element position and velocity in related to the mouse position', () => {
      const element = stubElement({ x: 50, y: 50, dx: 1, dy: -1 });

      element.onMouseDown();
      // jest set window size @ 1024 x 768
      element.onMouseMove({ pageX: 102.4, pageY: 38.4, movementX: 20.48, movementY: -15.36 });
      element.onMouseUp();

      expect(element.x).toEqual(10);
      expect(element.y).toEqual(5);
      expect(element.dx).toEqual(0.25);
      expect(element.dy).toEqual(-0.25);
    });

    it('is ignored unless onMouseDown is called first', () => {
      const element = stubElement({ x: 50, y: 50, dx: 1, dy: -1 });

      element.onMouseMove({ pageX: 102.4, pageY: 38.4, movementX: 20.48, movementY: -3.84 });

      expect(element.x).toEqual(50);
      expect(element.y).toEqual(50);
      expect(element.dx).toEqual(1);
      expect(element.dy).toEqual(-1);
    });
  });

  describe('display()', () => {
    it('displays the visual representation of certain element', () => {
      ELEMENTS.forEach((visual, index) => {
        const element = new Element(index);

        expect(element.display()).toEqual(visual);
      });
    });
  });

  describe('tick()', () => {
    it('updates the element position', () => {
      const element = stubElement({ x: 50, y: 50, dx: 1, dy: -1 });

      element.tick();

      expect(element.x).toEqual(51);
      expect(element.y).toEqual(49);
    });

    it('bounces if the element next position is out of bound', () => {
      const element = stubElement({ x: 100, y: 0, dx: 1, dy: -2 });

      element.tick();

      expect(element.x).toEqual(99);
      expect(element.dx).toEqual(-1);

      expect(element.y).toEqual(2);
      expect(element.dy).toEqual(2);
    });

    it('does not updates the element position if mouse is down', () => {
      const element = stubElement({ x: 50, y: 50, dx: 1, dy: -1 });

      element.onMouseDown();
      element.tick();

      expect(element.x).toEqual(50);
      expect(element.y).toEqual(50);
    });
  });
});

function stubElement(stubs = {}) {
  const element = new Element(0);

  element.x = stubs.x ?? 50;
  element.y = stubs.y ?? 50;
  element.dx = stubs.dx ?? 1;
  element.dy = stubs.dy ?? 1;

  return element;
}

import { ELEMENTS } from 'constants/elements';
import Element from 'components/element';

describe('Element', () => {
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

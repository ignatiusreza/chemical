import Beaker from 'components/beaker';
import Element from 'components/element';
import { indexOf } from 'helpers';

describe('Beaker', () => {
  describe('onMouseUp', () => {
    it('broadcast the event to all elements', () => {
      const beaker = new Beaker();
      const spies = beaker.elements.map(element => jest.spyOn(element, 'onMouseUp'));
      const event = { pageX: 0, pageY: 0 };

      beaker.onMouseUp(event);

      spies.forEach(spy => {
        expect(spy).toHaveBeenCalled();
      });
      jest.restoreAllMocks();
    });

    it('mixes 2 basic elements together', () => {
      [
        // prettier-ignore
        ['💧', '💧', '💧'],
        ['💧', '🌍', '🌱'],
        ['💧', '🔥', '☁'],
        ['💧', '🌬', '🌊'],
        ['🌍', '🌍', '🌍'],
        ['🌍', '🔥', '🔩'],
        ['🌍', '🌬', '🌪'],
        ['🔥', '🔥', '🔥'],
        ['🔥', '🌬', '🌫'],
        ['🌬', '🌬', '🌬'],
      ].forEach(([a, b, c]) => {
        expect(mix(a, b)).toEqual(c);
        expect(mix(b, a)).toEqual(c);
      });
    });
  });
});

function mix(a, b) {
  const beaker = new Beaker();

  // terribly inplementation specific, but okay for now..
  beaker.elements = [collidableElement(indexOf(a)), collidableElement(indexOf(b))];
  beaker.elements[0].onMouseDown();
  beaker.onMouseUp({ pageX: 0, pageY: 0 });

  return beaker.elements[0].display();
}

function collidableElement(index) {
  const element = new Element(index);

  element.setPosition(0, 0);
  element.node = {
    offsetLeft: 0,
    offsetTop: 0,
    clientWidth: 50,
    clientHeight: 50,
  };

  return element;
}

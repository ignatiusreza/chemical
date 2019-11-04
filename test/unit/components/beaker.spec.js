import Beaker from 'components/beaker';
import { indexOf } from 'helpers';

describe('Beaker', () => {
  let beaker;

  beforeEach(() => {
    beaker = new Beaker();
  });

  describe('onMouseUp', () => {
    it('broadcast the event to all elements', () => {
      const spies = beaker.elements.map(element => jest.spyOn(element, 'onMouseUp'));

      beaker.onMouseUp();

      spies.forEach(spy => {
        expect(spy).toHaveBeenCalled();
      });
      jest.restoreAllMocks();
    });
  });

  describe('mix', () => {
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
        expect(beaker.mix(indexOf(a), indexOf(b))).toEqual(indexOf(c));
        expect(beaker.mix(indexOf(b), indexOf(a))).toEqual(indexOf(c));
      });
    });
  });
});

import Beaker from 'components/beaker';
import { indexOf } from 'helpers';

describe('Beaker', () => {
  let beaker;

  beforeEach(() => {
    beaker = new Beaker();
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
      expect(beaker.mix(indexOf(a), indexOf(b))).toEqual(indexOf(c));
      expect(beaker.mix(indexOf(b), indexOf(a))).toEqual(indexOf(c));
    });
  });
});

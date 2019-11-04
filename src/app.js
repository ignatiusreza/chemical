import Beaker from 'components/beaker';

export class App {
  beaker = new Beaker();

  attached() {
    this.beaker.attached();
  }

  detached() {
    this.beaker.detached();
  }
}

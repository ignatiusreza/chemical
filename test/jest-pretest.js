import 'aurelia-polyfills';
import { Options } from 'aurelia-loader-nodejs';
import { globalize } from 'aurelia-pal-nodejs';
import path from 'path';
import raf from 'raf';

Options.relativeToDir = path.join(__dirname, 'unit');

globalize();
window.requestAnimationFrame = raf;
window.cancelAnimationFrame = raf.cancel;

import { Select } from './Select';

export class Plugin {
  init() {
    jQuery.fn.asSelect = function asSelect(options) {
      const defaults = {
        deselectable: false,
        speed: 100,
      };

      const select = new Select(jQuery(this), jQuery.extend(defaults, options));
      select.init();
    };
  }
}

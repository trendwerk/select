import { Select } from './Select';

export class Plugin {
  init() {
    jQuery.fn.asSelect = function asSelect(options) {
      const defaults = {
        speed: 100,
      };

      const select = new Select(jQuery(this), jQuery.extend(defaults, options));
      select.init();
    };
  }
}

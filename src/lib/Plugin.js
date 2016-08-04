import { Select } from './Select';

export class Plugin {
  init() {
    jQuery.fn.asSelect = function asSelect(options) {
      const defaults = {
        deselectable: true,
        onSelect: null,
        speed: 200,
      };

      const select = new Select(jQuery(this), jQuery.extend(defaults, options));
      select.init();
    };
  }
}

import { Select } from './Select';

export class Plugin {
  init() {
    jQuery.fn.asSelect = function asSelect(options) {
      const defaults = {
        deselectable: true,
        onSelect: null,
        speed: 200,
      };

      this.each(function initialize() {
        const select = new Select(jQuery(this), jQuery.extend(defaults, options));
        select.init();
      });
    };
  }
}

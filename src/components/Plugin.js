import { Select } from './Select';

export class Plugin {
  init() {
    jQuery.fn.asSelect = function asSelect() {
      const select = new Select(jQuery(this), jQuery(document));
      select.init();
    };
  }
}

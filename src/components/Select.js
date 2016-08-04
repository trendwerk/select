export class Select {
  constructor($element, options) {
    this.$document = jQuery(document);
    this.$element = $element;
    this.$field = $element.find('input[type="hidden"]');
    this.$label = $element.find('span');
    this.speed = options.speed;
  }

  init() {
    this._registerEvents();
  }

  _registerEvents() {
    this.$document.mouseup(event => {
      if (! this.$element.is(event.target) && this.$element.has(event.target).length === 0) {
        this._close();
      } else {
        this._toggle();

        if (this.$element.find('li').is(event.target)) {
          this._select(jQuery(event.target));
        }
      }
    });
  }

  _toggle() {
    this.$element.toggleClass('open');
    this.$element.find('ul').slideToggle(this.speed);
  }

  _close() {
    this.$element.removeClass('open');
    this.$element.find('ul').slideUp(this.speed);
  }

  _select($element) {
    const label = $element.text();
    const value = $element.data('value');

    this.$label.text(label);

    this.$element.find('li').removeClass('active');
    $element.addClass('active');

    this.$field.val(value);
  }
}

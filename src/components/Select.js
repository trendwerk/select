export class Select {
  constructor($element, options) {
    this.$document = jQuery(document);
    this.$element = $element;
    this.$field = $element.find('input[type="hidden"]');
    this.$label = $element.find('label');
    this.speed = options.speed;
  }

  init() {
    this._registerEvents();
  }

  _registerEvents() {
    this.$document.on(this._getEvent(), event => {
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

  _getEvent() {
    return this._isTouch() ? 'touchstart' : 'mousedown';
  }

  _toggle() {
    this.$element.toggleClass('open');
    this.$element.find('ul').slideToggle(this.speed);
  }

  _close() {
    this.$element.removeClass('open');
    this.$element.find('ul').slideUp(this.speed);
  }

  _select($item) {
    const $allItems = this.$element.find('li');
    const label = $item.text();
    const value = $item.data('value');

    this.$label.text(label);

    $allItems.removeClass('active');
    $item.addClass('active');

    this.$field.val(value);
  }

  _isTouch() {
    return (
      ('ontouchstart' in window) ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    );
  }
}

export class Select {
  constructor($element, $document, options) {
    this.$document = $document;
    this.$element = $element;
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
}

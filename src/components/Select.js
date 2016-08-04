export class Select {
  constructor($element, options) {
    this.$document = jQuery(document);
    this.$element = $element;
    this.$field = $element.find('input[type="hidden"]');
    this.$items = null;
    this.$label = $element.find('label');
    this.$list = $element.find('ul');
    this.deselectable = options.deselectable;
    this.speed = options.speed;
  }

  init() {
    this._updateItems();

    if (this.deselectable) {
      this._createDeselectable();
    }

    this._registerEvents();
    this._populate();
  }

  _updateItems() {
    this.$items = this.$list.find('li');
  }

  _createDeselectable() {
    const label = this.$label.text();
    this.$list.prepend(`<li data-value="">${label}</li>`);
    this._updateItems();

    this._select(this.$items.first());
  }

  _registerEvents() {
    this.$document.on(this._getEvent(), event => {
      if (! this.$element.is(event.target) && this.$element.has(event.target).length === 0) {
        this._close();
      } else {
        this._toggle();

        if (this.$items.is(event.target)) {
          this._select(jQuery(event.target));
        }
      }
    });
  }

  _populate() {
    if (this.$field.val()) {
      const $selected = this.$element.find(`li[data-value="${this.$field.val()}"]`);

      if ($selected.length) {
        this._select($selected);
      }
    }
  }

  _getEvent() {
    return this._isTouch() ? 'touchstart' : 'mousedown';
  }

  _toggle() {
    this.$element.toggleClass('open');
    this.$list.slideToggle(this.speed);
  }

  _close() {
    this.$element.removeClass('open');
    this.$list.slideUp(this.speed);
  }

  _select($item) {
    const label = $item.text();
    const value = $item.data('value');

    this.$label.text(label);

    this.$items.removeClass('active');
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

export class Select {
  constructor($element, options) {
    this.$document = jQuery(document);
    this.$element = $element;
    this.$field = $element.find('input[type="hidden"]');
    this.$htmlBody = jQuery('html, body');
    this.$items = null;
    this.$label = $element.find('label');
    this.$list = $element.find('ul');
    this.deselectable = options.deselectable;
    this.onSelect = options.onSelect;
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

    if (! this.$field.val()) {
      this._select(this.$items.first());
    }
  }

  _registerEvents() {
    this.$document.on(this._getOutsideEvent(), event => {
      if (! this.$element.is(event.target) && this.$element.has(event.target).length === 0) {
        this._close();
      }
    });

    this.$element.on(this._getInsideEvent(), event => {
      this._maybeScrollToElement();
      this._toggle();

      if (this.$items.is(event.target)) {
        this._select(jQuery(event.target));
      }
    });

    this.$field.on('change', () => {
      this._populate();
    });
  }

  _getOutsideEvent() {
    return this._isTouch() ? 'touchstart' : 'mousedown';
  }

  _getInsideEvent() {
    return this._isTouch() ? 'click' : 'mousedown';
  }

  _populate() {
    const value = this.$field.val();
    const $selected = this.$items.filter(`[data-value="${value}"]`).first();

    if ($selected.length) {
      this._select($selected);
    }
  }

  _toggle() {
    this.$element.toggleClass('open');
    this.$list.slideToggle(this.speed);
  }

  _maybeScrollToElement() {
    if (this._isTouch() && ! this.$element.hasClass('open')) {
      this.$htmlBody.animate({
        scrollTop: this.$element.offset().top,
      });
    }
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

    if (typeof this.onSelect === 'function') {
      this.onSelect($item);
    }
  }

  _isTouch() {
    return (
      ('ontouchstart' in window) ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    );
  }
}

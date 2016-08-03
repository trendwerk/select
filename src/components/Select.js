export class Select {
  constructor($element, $document, options) {
    this.$document = $document;
    this.$element = $element;
    this.speed = options.speed;
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    this.$document.mouseup(event => {
      if (! this.$element.is(event.target) && this.$element.has(event.target).length === 0) {
        this.$element.removeClass('open');
        this.$element.find('ul').slideUp(this.speed);
      } else {
        this.$element.toggleClass('open');
        this.$element.find('ul').slideToggle(this.speed);
      }
    });
  }
}

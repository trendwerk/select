export class Select {
  constructor($element, $document) {
    this.$document = $document;
    this.$element = $element;
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    this.$document.mouseup(event => {
      if (! this.$element.is(event.target) && this.$element.has(event.target).length === 0) {
        this.$element.removeClass('open');
        this.$element.find('ul').slideUp(100);
      } else {
        this.$element.toggleClass('open');
        this.$element.find('ul').slideToggle(100);
      }
    });
  }
}

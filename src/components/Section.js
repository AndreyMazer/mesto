export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  renderElements(items) {
    items.reverse().forEach((item) => {
      this._containerSelector.prepend(this._renderer(item));
    });
  }

}

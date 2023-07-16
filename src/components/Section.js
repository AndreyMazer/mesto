export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.appendChild(element);
  }

  renderElements(items) {
    items.forEach((item) => {
      this._containerSelector.prepend(this._renderer(item));
    });
  }

}

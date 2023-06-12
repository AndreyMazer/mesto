export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderElements() {
    this._items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}

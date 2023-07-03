import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector(".popup__title-big");
    this._image = this._popup.querySelector(".popup__picture_big");
  }
  open({ name, link }) {
    this._title.textContent = name;
    this._image.src = link;
    super.open();
  };
}

/*import { Popup } from "./Popup.js";

export class PopupWithAssent extends Popup {
  constructor(popupId, callback) {
    super(popupId);
    this._callback = callback;
    this._button = this._popup.querySelector(".popup__save");
    this._buttonText = this._button.textContent;
    this._cardId = null;
    this._deleteCard = null;
  }

  open = (cardId, deleteCard) => {
    super.open();
    this._cardId = cardId;
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._callback(this._cardId, this._deleteCard);
    });
  }

  renderLoading(isDisabled, text) {
    this._button.disabled = isDisabled;
    this._button.textContent = text || this._buttonText;
  }
}*/

///////////////////////////////////////////////////////////////////////

import { Popup } from "./Popup.js";

export class PopupWithAssent extends Popup {
  constructor(popupId, callback) {
    super(popupId);
    this._callback = callback;
    this._button = this._popup.querySelector('.popup__save');
    this._buttonText = this._button.textContent;
    this._cardId = null;
    this._deleteCard = null;
  }

  open = (cardId, deleteCard) => {
    super.open();
    this._cardId = cardId;
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._callback(this._cardId, this._deleteCard);
    });
  }

  renderLoading(isDisabled, text) {
    this._button.disabled = isDisabled;
    this._button.textContent = text || this._buttonText;
  }
}


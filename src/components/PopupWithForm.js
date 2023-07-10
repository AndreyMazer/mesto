/*import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}*/

///////////////////////////////////////////////////////////////

import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupId, submitFormCallback) {
    super(popupId);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach( input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFormCallback(this._getInputValues());
    });
  }

  renderLoading(isDisabled, text) {
    this._submitButton.disabled = isDisabled;
    this._submitButton.textContent = text || this._submitButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}


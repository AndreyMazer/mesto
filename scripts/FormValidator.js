export class FormValidator {
  constructor(validConfig, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._disableButtonClass = validConfig.disableButtonClass;
    this._textErrorSelector = validConfig.textErrorSelector;
    this._errorTemplateClass = validConfig.errorTemplateClass;
  }

  _findFormElements() {
    this._inputList = this._formSelector.querySelectorAll(this._inputSelector);
    this._submitButton = this._formSelector.querySelector(
      this._submitButtonSelector
    );
  }

  _getErrorTextElement(input) {
    return (this._errorTextElement = this._formSelector.querySelector(
      `${this._textErrorSelector}${input.name}`
    ));
  }

  _showInputError(input, errorTextElement, validationMessage) {
    input.classList.add(this._errorTemplateClass);
    errorTextElement.textContent = validationMessage;
  }
  _hideInputError(input, errorTextElement) {
    input.classList.remove(this._errorTemplateClass);
    errorTextElement.textContent = "";
  }
  _enableButton() {
    this._submitButton.classList.remove(this._disableButtonClass);
    this._submitButton.disabled = false;
  }
  disableButton() {
    this._submitButton.classList.add(this._disableButtonClass);
    this._submitButton.disabled = true;
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(
        input,
        this._getErrorTextElement(input),
        input.validationMessage
      );
    } else {
      this._hideInputError(input, this._getErrorTextElement(input));
    }
  }

  _hasInvalidInputs() {
    const inputListArray = [...this._inputList];
    return inputListArray.filter((input) => !input.validity.valid).length === 0;
  }

  _toggleButtonState() {
    if (this._hasInvalidInputs()) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._findFormElements();
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this.disableButton();
  }
}

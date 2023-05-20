export class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._handleOpenPopup = handleOpenPopup;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like_active");
      });

    this._element
      .querySelector(".element__gora")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _handleCardClick() {
    this._handleOpenPopup(this._name, this._link);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector(".element__title");
    const cardImage = this._element.querySelector(".element__gora");

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    return this._element;
  }
}

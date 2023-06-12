export class Card {
  constructor(data, cardTemplate, openBigPopup) {
    this._photoCard = data;
    this._cardTemplate = cardTemplate;
    this._openBigPopup = openBigPopup;
  }

  _finedElements() {
    this._card = this._cardTemplate.content
      .querySelector(".element")
      .cloneNode(true);
  }

  _finedCardElements() {
    this._cardTitle = this._card.querySelector(".element__title");
    this._cardImage = this._card.querySelector(".element__gora");
    this._deleteButton = this._card.querySelector(".element__delete");
    this._likeButton = this._card.querySelector(".element__like");
  }
  _setCardElements() {
    this._cardTitle.textContent = this._photoCard.name;
    this._cardImage.setAttribute("src", this._photoCard.link);
    this._cardImage.setAttribute("name", this._photoCard.name);
    this._cardImage.setAttribute("alt", this._photoCard.name);
  }

  _handleLikeImage() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _handleDeleteButton() {
    this._card.remove();
    this._card = null;
  }

  _handleOpenBigPopup() {
    this._openBigPopup(this._photoCard);
  }

  _addListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeImage();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleOpenBigPopup();
    });
  }

  createCard() {
    this._finedElements();
    this._finedCardElements();
    this._setCardElements();
    this._addListeners();

    return this._card;
  }
}

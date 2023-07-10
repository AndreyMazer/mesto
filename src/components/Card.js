/*export class Card {
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
}*/
/////////////////////////////////////////////////////////////////

export class Card {
    constructor(data, cardTemplate, openZoomPhoto, handleLike, handleDeleteCard, userId) {
        this._photoCard = data;
        this._photoCardId = data._id;
        this._likes = data.likes;
        this._ownerId = this._photoCard.owner._id;
        this._cardTemplate = cardTemplate;
        this._openZoomPhoto = openZoomPhoto;
        this._handleLike = handleLike;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        this._templateCard = this._defineCard();
        this._cardLikesCounter = this._templateCard.querySelector('.element__like-counter');
        this._cardHeading = this._templateCard.querySelector('.element__title');
        this._cardImage = this._templateCard.querySelector('.element__gora');
        this._deleteButtonCard = this._templateCard.querySelector('.element__delete');
        this._likeButton = this._templateCard.querySelector('.element__like');
    }

    _defineCard() {
        return this._cardTemplate.content.querySelector('.element').cloneNode(true);
    }

    _defineDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButtonCard.classList.add('element__delete');
            this._deleteButtonCard.disabled = true;
        }
    }

    _isCardLiked() {
        return Boolean(this._likes.find(like => {
            return like._id === this._userId
        }));
    }

    _defineLikeButton() {
        if (this._isCardLiked()) {
            this._likeButton.classList.add('element__like_active');
        }
    }

    _setCardElements() {
        this._cardHeading.textContent = this._photoCard.name;
        this._cardImage.setAttribute('src', this._photoCard.link);
        this._cardImage.setAttribute('alt', this._photoCard.name);
    }

    _setLikesCounter() {
        this._cardLikesCounter.textContent = this._likes.length;
    }

    _changeLikesCounter = (likes) => {
        this._likes = likes;
        this._cardLikesCounter.textContent = this._likes.length;
    }

    _changeLikeStatus = () => {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handleDeleteButtonClick = () => {
        this._templateCard.remove();
        this._templateCard = null;
    }

    _handleOpenZoomClick() {
        this._openZoomPhoto(this._photoCard);
    }

    _addListeners() {
        this._likeButton.addEventListener('click', (event) => {
            if (this._isCardLiked()) {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, true)
            } else {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, false)
            }
        });
        this._deleteButtonCard.addEventListener('click', () => {
            this._handleDeleteCard(this._photoCardId, this._handleDeleteButtonClick);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleOpenZoomClick();
        });
    }

    createCard() {
        this._defineCard();
        this._setCardElements();
        this._setLikesCounter();
        this._defineDeleteButton();
        this._defineLikeButton();
        this._addListeners();

        return this._templateCard;
    }
}


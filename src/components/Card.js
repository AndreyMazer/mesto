export class Card {
    constructor(data, cardTemplate, openBigPopup, handleLike, handleDeleteCard, userId) {
        this._photoCard = data;
        this._photoCardId = data._id;
        this._likes = data.likes;
        this._ownerId = this._photoCard.owner._id;
        this._cardTemplate = cardTemplate;
        this._openBigPopup = openBigPopup;
        this._handleLike = handleLike;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        this._templateCard = this._finedElements();
        this._likesCounter = this._templateCard.querySelector('.element__like-counter');
        this._cardHeading = this._templateCard.querySelector('.element__title');
        this._cardImage = this._templateCard.querySelector('.element__gora');
        this._deleteButton = this._templateCard.querySelector('.element__delete');
        this._likeButton = this._templateCard.querySelector('.element__like');
    }

    _finedElements() {
       const card = this._cardTemplate.content.querySelector('.element').cloneNode(true);
       return card
    }

    _finedDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButton.classList.add('element__delete_active');
        }
    }

    _cardLiked() {
        return (this._likes.find(like => {
            return like._id !== this._userId
        }));
    }

    _finedLikeButton() {
        if (this._cardLiked()) {
            this._likeButton.classList.add('element__like_active');
        }
    }

    _setCardElements() {
        this._cardHeading.textContent = this._photoCard.name;
        this._cardImage.setAttribute("src", this._photoCard.link);
        this._cardImage.setAttribute("alt", this._photoCard.name);
        this._cardImage.setAttribute("name", this._photoCard.name);
    }

    _setLikesCounter() {
        this._likesCounter.textContent = this._likes.length;
    }

    _changeLikesCounter = (likes) => {
        this._likes = likes;
        this._likesCounter.textContent = this._likes.length;
    }

    _changeLikeStatus = () => {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handleDeleteButtonClick = () => {
        this._templateCard.remove();
        this._templateCard = null;
    }

    _handleOpenBigPopup() {
        this._openBigPopup(this._photoCard);
    }

    _addListeners() {
        this._likeButton.addEventListener('click', () => {
            if (this._cardLiked()) {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, true)
            } else {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, false)
            }
        });
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this._photoCardId, this._handleDeleteButtonClick);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleOpenBigPopup();
        });
    }

    createCard() {
        this._finedElements();
        this._setCardElements();
        this._setLikesCounter();
        this._finedDeleteButton();
        this._finedLikeButton();
        this._addListeners();
    
        return this._templateCard;
    }
}
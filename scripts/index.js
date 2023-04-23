const buttonOpenEditProfilePopup = document.querySelector(".info__edit");
const careerElement = document.querySelector(".info__career");
const nameElement = document.querySelector(".info__name");
const buttonsClosePopup = document.querySelectorAll(".popup__close-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");

//попапы
const everyPopup = document.querySelectorAll(".popup");
const popupBig = document.querySelector("#popupBigCard");
const popupPic = document.querySelector("#popupCard-PlaceADD");
const popupInfo = document.querySelector("#popupProfileEdit");

//формы
const formEditProfile = document.querySelector("#formProfileEdit");
const formAddCard = document.querySelector("#formPlace-cardAdd");

//инпуты
const inputCareerUserForm = document.querySelector(".popup__input_type_career");
const inputNameUserForm = document.querySelector(".popup__input_type_name");
const inputCardName = document.querySelector(".popup__input_type_place-name");
const inputCardLink = document.querySelector(".popup__input_type_place-link");

//открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

//закрыть попап на esc
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const btnEsc = document.querySelector(".popup_opened");
    closePopup(btnEsc);
  }
}

//закрыть попап оверлэй
everyPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

//неактивная кнопка submit
function disableBtnForm(popup) {
  submitBtn = popup.querySelector(".popup__save");
  submitBtn.classList.add("popup__save_disabled");
  submitBtn.disabled = true;
}

//кнопки открытия попапов
buttonOpenEditProfilePopup.addEventListener("click", function () {
  openPopup(popupInfo);
  disableBtnForm(popupInfo);
  inputNameUserForm.value = nameElement.textContent;
  inputCareerUserForm.value = careerElement.textContent;
});

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupPic);
  disableBtnForm(popupPic);
  formAddCard.reset();
});

//сохранение попапа
function submitFormEditProfile(evt) {
  evt.preventDefault();
  nameElement.textContent = inputNameUserForm.value;
  careerElement.textContent = inputCareerUserForm.value;
  closePopup(popupInfo);
}

formEditProfile.addEventListener("submit", submitFormEditProfile);

//картинки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Челябинская область",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал",
  },
];

const elements = document.querySelector(".elements");

//мусорка
function deleteButtonClick(evt) {
  const btnDlt = evt.target;
  const picDlt = btnDlt.closest(".element");
  picDlt.remove();
}

//лойс
function likeButtonClick(evt) {
  const btnLike = evt.target;
  btnLike.classList.toggle("element__like_active");
}

//добавить картинку
function createCard(card) {
  const newCard = document.querySelector(".template").content.cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  cardTitle.textContent = card.name;
  const cardImage = newCard.querySelector(".element__gora");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.alt);
  const deleteButton = newCard.querySelector(".element__delete");
  deleteButton.addEventListener("click", deleteButtonClick);
  const likeButton = newCard.querySelector(".element__like");
  likeButton.addEventListener("click", likeButtonClick);
  const popupBigOpen = newCard.querySelector(".element__gora");
  popupBigOpen.addEventListener("click", openBigPopup);
  return newCard;
}

function renderCard(card) {
  const newCard = createCard(card);
  elements.prepend(newCard);
}
``;

function handleFormPicSubmit(evt) {
  evt.preventDefault();
  const card = {
    alt: inputCardName.value,
    link: inputCardLink.value,
  };
  renderCard(card);
  formAddCard.reset();
  closePopup(popupPic);
}

formAddCard.addEventListener("submit", handleFormPicSubmit);

initialCards.forEach((card) => {
  renderCard(card);
});

//увеличение картинки
const popupBigPicture = popupBig.querySelector(".popup__picture_big");
const popupBigTitle = popupBig.querySelector(".popup__title-big");

function openBigPopup(evt) {
  popupBigPicture.src = evt.target.src;
  popupBigTitle.textContent = evt.target.alt;
  openPopup(popupBig);
}

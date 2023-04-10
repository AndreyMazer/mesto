const buttonOpenEditProfilePopup = document.querySelector(".info__edit");
const popupInfo = document.querySelector(".popup_info");
const formEditProfile = document.querySelector(".form");
const careerUserForm = document.querySelector(".popup__input_type_career");
const nameUserForm = document.querySelector(".popup__input_type_name");
const careerElement = document.querySelector(".info__career");
const nameElement = document.querySelector(".info__name");
const buttonsClosePopup = document.querySelectorAll(".popup__close-button");
const popupBig = document.querySelector(".popup_big");
const popupPic = document.querySelector(".popup_pic");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");
const everyPopup = document.querySelectorAll(".popup");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const btnEsc = document.querySelector(".popup_opened");
    closePopup(btnEsc);
  }
}

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

buttonOpenEditProfilePopup.addEventListener("click", function () {
  openPopup(popupInfo);
  nameUserForm.value = nameElement.textContent;
  careerUserForm.value = careerElement.textContent;
});

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupPic);
  formAddCard.reset();
});

buttonsClosePopup.forEach(function (closeBbutton) {
  const popup = closeBbutton.closest(".popup");
  closeBbutton.addEventListener("click", function () {
    closePopup(popup);
  });
});

function submitFormEditProfile(evt) {
  evt.preventDefault();
  nameElement.textContent = nameUserForm.value;
  careerElement.textContent = careerUserForm.value;
  closePopup(popupInfo);
}

formEditProfile.addEventListener("submit", submitFormEditProfile);

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
const formAddCard = document.querySelector(".form_place");
const inputCardName = document.querySelector(".popup__input_pic_place-name");
const inputCardLink = document.querySelector(".popup__input_pic_place-link");

function deleteButtonClick(evt) {
  const btnDlt = evt.target;
  const picDlt = btnDlt.closest(".element");
  picDlt.remove();
}

function likeButtonClick(evt) {
  const btnLike = evt.target;
  btnLike.classList.toggle("element__like_active");
}

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
    name: inputCardName.value,
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

const popupBigPicture = popupBig.querySelector(".popup__picture_big");
const popupBigTitle = popupBig.querySelector(".popup__title-big");

function openBigPopup(evt) {
  popupBigPicture.src = evt.target.src;
  popupBigTitle.textContent = evt.target.alt;
  openPopup(popupBig);
}

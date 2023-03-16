const infoEdit = document.querySelector(".info__edit");
const popup = document.querySelector(".popup");
const careerUserForm = document.querySelector(".popup__input_type_career");
const nameUserForm = document.querySelector(".popup__input_type_name");
const careerElement = document.querySelector(".info__career");
const nameElement = document.querySelector(".info__name");
const closePopup = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".form");

infoEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameUserForm.value = nameElement.textContent;
  careerUserForm.value = careerElement.textContent;
});

function popupClose() {
  popup.classList.remove("popup_opened");
}

closePopup.addEventListener("click", function () {
  popupClose();
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameUserForm.value;
  careerElement.textContent = careerUserForm.value;
  popupClose();
}

formElement.addEventListener("submit", handleFormSubmit);

const picAdd = document.querySelector(".profile__add");
const closePopupPic = document.querySelector(".popup-pic__close-button");
const popupPic = document.querySelector(".popup-pic");

picAdd.addEventListener("click", function () {
  popupPic.classList.add("popup-pic_opened");
});

function popupPicClose() {
  popupPic.classList.remove("popup-pic_opened");
}

closePopupPic.addEventListener("click", function () {
  popupPicClose();
});

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
const formPic = document.querySelector(".form-place");
const popupPlace = formPic.querySelector(".popup-pic__input_type_place-name");
const popupPicInput = formPic.querySelector(
  ".popup-pic__input_type_place-link"
);

function deleteButtonClick(evt) {
  const btn = evt.target;
  const pic = btn.closest(".element");
  pic.remove();
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
  const popupBigOpen = newCard.querySelector(".element__gora")
 popupBigOpen.addEventListener("click", openBigPopup)
  return newCard;
}

function renderCard(card) {
  const newCard = createCard(card);
  elements.prepend(newCard);
}``

function handleFormPicSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: popupPlace.value,
    link: popupPicInput.value,
  };
  renderCard(card)
  popupPicClose(evt);
  formPic.reset();
}

formPic.addEventListener("submit", handleFormPicSubmit);
formPic.addEventListener("submit", deleteButtonClick)

initialCards.forEach((card) => {
  renderCard(card);
});



const popupBig = document.querySelector(".popup-big");
const popupBigClose = document.querySelector(".popup-big__close-button");

  function closeBigPopup() {
  popupBig.classList.remove("popup-big_opened");
}

popupBigClose.addEventListener("click", function () {
  closeBigPopup();
});

function openBigPopup (evt) { 
const popupBigPicture = document.querySelector(".popup-big__picture");
const popupBigTitle = document.querySelector(".popup-big__title")
popupBigPicture.src = evt.target.src
popupBigTitle.textContent = evt.target.alt
popupBig.classList.add("popup-big_opened");
}

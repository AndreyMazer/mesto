import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";

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

//валидация
const formConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  disableButtonClass: "popup__save_disabled",
  textErrorSelector: ".popup__input-error_type_",
  errorTemplateClass: "popup__input_error",
};

const formValidations = {};

const enableValidation = (validConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidations[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formConfig);

//размещение карточек на странице
const elements = document.querySelector(".elements");

function handleFormPicSubmit(evt) {
  evt.preventDefault();
  const card = {
    alt: inputCardName.value,
    link: inputCardLink.value,
    name: inputCardName.value,
  };
  const newCard = new Card(card, ".template");
  const cardElement = newCard.generateCard();
  elements.prepend(cardElement);
  formAddCard.reset();
  closePopup(popupPic);
}

formAddCard.addEventListener("submit", handleFormPicSubmit);

//создание новой карточки
initialCards.forEach((card) => {
  const newCard = new Card(card, ".template", handleOpenPopup);
  const cardElement = newCard.generateCard();
  elements.prepend(cardElement);
});

//большой попап
function handleOpenPopup(name, link) {
  const popupBigPicture = document.querySelector(".popup__picture_big");
  const popupBigTitle = document.querySelector(".popup__title-big");

  popupBigPicture.src = link;
  popupBigPicture.alt = name;
  popupBigTitle.textContent = name;

  openPopup(popupBig);
}

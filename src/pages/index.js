import "../pages/index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../components/InitialCards.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithAssent } from "../components/PopupWithAssent.js";
//import { Api } from "../components/Api.js";

/*const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization: 'cb145c34-9cd1-4faa-809f-c18fc30df2d7',
        'Content-Type': "applycation/json"
    }
})*/

//инпуты
const inputCareerUserForm = document.querySelector(".popup__input_type_career");
const inputNameUserForm = document.querySelector(".popup__input_type_name");
const inputCardName = document.querySelector(".popup__input_type_place-name");
const inputCardLink = document.querySelector(".popup__input_type_place-link");

//поля формы
const formName = document.querySelector(".info__name");
const formCareer = document.querySelector(".info__career");

//кнопки
const buttonOpenEditProfilePopup = document.querySelector(".info__edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");

//картинка
const cardTemplate = document.querySelector(".template");

// формы
const formEditProfile = document.querySelector("#formProfileEdit");
const formAddCard = document.querySelector("#formPlace-cardAdd");

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

//большой попап
const popupBig = new PopupWithImage("#popupBigCard");
popupBig.setEventListeners();

//размещение картинок
function createCard(card) {
  return new Card(card, cardTemplate, popupBig.open).createCard();
}

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);
section.renderElements();

function handleFormCardAddSubmit() {
  const card = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  section.addItem(card);
  formAddCard.reset(card);
}

//данные юзера
const userInfo = new UserInfo({
  userName: ".info__name",
  userCareer: ".info__career",
});

//формы редактирования профиля и добавления фото
const popupPic = new PopupWithForm(
  "#popupCard-PlaceADD",
  handleFormCardAddSubmit
);
popupPic.setEventListeners();

const popupInfo = new PopupWithForm("#popupProfileEdit", handleFormSubmit);
popupInfo.setEventListeners();

//сохранения профиля
function handleFormSubmit(info) {
  const inputValues = popupInfo._getInputValues();
  userInfo.setUserInfo(info, inputValues);
  formEditProfile.reset(info);
}

//открытие/закрытие попапов
buttonOpenEditProfilePopup.addEventListener("click", () => {
  popupInfo.open();
  userInfo.getUserInfo();
  inputNameUserForm.value = formName.textContent;
  inputCareerUserForm.value = formCareer.textContent;
  formValidations["popupFormProfile"].resetValidation();
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupPic.open();
  formValidations["popupFormCardAdd"].disableButton();
});

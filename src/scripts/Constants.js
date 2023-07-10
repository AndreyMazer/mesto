/*//инпуты
const inputCareerUserForm = document.querySelector(".popup__input_type_career");
const inputNameUserForm = document.querySelector(".popup__input_type_name");
const inputCardName = document.querySelector(".popup__input_type_place-name");
const inputCardLink = document.querySelector(".popup__input_type_place-link");

//поля формы
const formName = document.querySelector(".info__name");
const formCareer = document.querySelector(".info__career");*/

//кнопки
const buttonOpenEditProfilePopup = document.querySelector(".info__edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");
const buttonEditAvatar = document.querySelector(".profile__avatar_button");

//картинка
const cardTemplate = document.querySelector(".template");

// формы
const formEditProfile = document.querySelector("#formProfileEdit");
const formAddCard = document.querySelector("#formPlace-cardAdd");
const formEditAvatar = document.querySelector("#formProfileAvatar");

const formConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  disableButtonClass: "popup__save_disabled",
  textErrorSelector: ".popup__input-error_type_",
  errorTemplateClass: "popup__input_error",
};

export {
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  cardTemplate,
  formEditProfile,
  formAddCard,
  formConfig,
  formEditAvatar,
  buttonEditAvatar,
};

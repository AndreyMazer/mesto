//кнопки
const buttonOpenEditProfilePopup = document.querySelector(".info__edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add");
const buttonOpenEditAvatar = document.querySelector(".profile__avatar_button");

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
  buttonOpenEditAvatar,
};

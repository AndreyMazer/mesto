import "../pages/index.css";
import {
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  cardTemplate,
  formEditProfile,
  formAddCard,
  formConfig,
  formEditAvatar,
  buttonOpenEditAvatar,
} from "../scripts/Constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithAssent } from "../components/PopupWithAssent.js";
import { Api } from "../components/Api.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-70",
  headers: {
    authorization: "a28722e7-954c-4bb9-8b79-c4a8de175d4b",
    "Content-Type": "application/json",
  },
});

//данные юзера
const userInfo = new UserInfo({
  nameId: ".info__name",
  aboutId: ".info__career",
  avatarId: ".profile__avatar",
});

Promise.all([api.getProfile(), api.getInitialCards()])
  .then((res) => {
    const [data, cards] = res;
    userInfo.setUserInfo({ name: data.name, about: data.about });
    userInfo.setAvatar(data.avatar);
    section.renderElements(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//большой попап
const popupBig = new PopupWithImage("#popupBigCard");
popupBig.setEventListeners();

//создание карточки
function createCard(photoCard) {
  return new Card(
    photoCard,
    cardTemplate,
    popupBig.open,
    handleLike,
    popupCardDelete.open,
    userInfo.getUserId()
  ).createCard(photoCard);
}

//сетка
const section = new Section({ renderer: createCard }, ".elements");

//валидация
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

function handleFormSubmit(toDo, popupInstance, loadingText = "Сохраненяем...") {
  popupInstance.renderLoading(true, loadingText);
  toDo()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

//попап добавления карточки
const popupPic = new PopupWithForm(
  "#popupCard-PlaceADD",
  handlepopupPicFormSubmit
);
popupPic.setEventListeners();

function handlepopupPicFormSubmit(card) {
  const makeRequest = () => {
    return api
      .addCard(card)
      .then((res) => {
        section.addItem(res);
        popupPic.close();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  handleFormSubmit(makeRequest, popupPic);
}

//попап редактированияданных юзера
const popupInfo = new PopupWithForm(
  "#popupProfileEdit",
  handleProfileFormSubmit
);
popupInfo.setEventListeners();

function handleProfileFormSubmit(inputValues) {
  const makeRequest = () => {
    return api
      .editProfile(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupInfo.close();
      })
      .catch((err) => {
        console.log("Ошибка:", err);
      });
  };

  handleFormSubmit(makeRequest, popupInfo);
}

//попап редактирования аватара
const popupAvatarEdit = new PopupWithForm(
  "#popupAvatarEdit",
  handleAvatarFormSubmit
);
popupAvatarEdit.setEventListeners();

function handleAvatarFormSubmit(inputValues) {
  const makeRequest = () => {
    return api
      .editAvatar(inputValues.avatar)
      .then((data) => {
        userInfo.setAvatar(data.avatar);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  handleFormSubmit(makeRequest, popupAvatarEdit);
}

//вы уверены?
const popupCardDelete = new PopupWithAssent(
  "#popupDeleteCard",
  handleCardDelete
);
popupCardDelete.setEventListeners();

function handleCardDelete(cardId, deleteCard) {
  const makeRequest = () => {
    return api
      .deleteCard(cardId)
      .then(() => {
        deleteCard();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  handleFormSubmit(makeRequest, popupCardDelete, "Удаляем...");
}

function handleLike(cardId, changeLikesCounter, changeLikeStatus, cardLiked) {
  if (cardLiked) {
    api
      .deleteLike(cardId)
      .then((res) => {
        changeLikesCounter(res.likes);
        changeLikeStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        changeLikesCounter(res.likes);
        changeLikeStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Popup редактирования и сохранения профиля//
buttonOpenEditProfilePopup.addEventListener("click", function () {
  popupInfo.open();
  popupInfo.setInputValues(userInfo.getUserInfo());
  formValidations[formEditProfile.getAttribute("name")].resetValidation();
});

//Popup редактирования аватара//
buttonOpenEditAvatar.addEventListener("click", function () {
  popupAvatarEdit.open();
  formValidations[formEditAvatar.getAttribute("name")].resetValidation();
});

//Popup добавления карточки//
buttonOpenAddCardPopup.addEventListener("click", function () {
  popupPic.open();
  formValidations[formAddCard.getAttribute("name")].resetValidation();
});

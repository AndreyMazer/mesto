import "../pages/index.css";
import {
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  cardTemplate,
  formEditProfile,
  formAddCard,
  formConfig,
  formEditAvatar,
  buttonEditAvatar,
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
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
    headers: {
        authorization: "cb145c34-9cd1-4faa-809f-c18fc30df2d7",
        "Content-Type": "applycation/json"
    }
})

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


const popupBigPhoto = new PopupWithImage("#popupBigCard");
popupBigPhoto.setEventListeners();

const userInfo = new UserInfo({
    nameId: ".info__name", aboutId: ".info__career", avatarId: ".profile__avatar",
});

const section = new Section({renderer: createCard}, '.elements');

const popupCardAdd = new PopupWithForm('#popupCard-PlaceADD', handleCardAddFormSubmit);
const popupProfileEdit = new PopupWithForm('#popupProfileEdit', handleProfileFormSubmit);
const popupAvatarEdit = new PopupWithForm('#popupAvatarEdit', handleAvatarFormSubmit);
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();

const popupCardDelete = new PopupWithAssent('#popupDeleteCard', handleCardDelete);
popupCardDelete.setEventListeners();

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        section.renderElements(cards);
    })
    .catch((err) => {
        console.log(err);
    });

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
    popupInstance.renderLoading(true, loadingText);
    request()
        .then(() => {
            popupInstance.close()
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupInstance.renderLoading(false);
        });
}

function handleProfileFormSubmit(inputValues) {
    async function makeRequest() {
        const userData = await api.editProfile(inputValues);
        userInfo.setUserInfo(userData);
    }

    handleSubmit(makeRequest, popupProfileEdit);
}

function handleAvatarFormSubmit(inputValues) {
    async function makeRequest() {
        const result = await api.editAvatar(inputValues.avatar);
        userInfo.setAvatar(result.avatar);
    }

    handleSubmit(makeRequest, popupAvatarEdit);
}

function handleCardAddFormSubmit(inputValues) {
    async function makeRequest() {
        const result = await api.addCard(inputValues);
        section.addItem(result);
    }

    handleSubmit(makeRequest, popupCardAdd);
}
function handleCardDelete(cardId, deleteCard) {
    async function makeRequest() {
        await api.deleteCard(cardId);
        deleteCard();
    }

    handleSubmit(makeRequest, popupCardDelete, 'Удаление...');
}

function handleLike(cardId, changeLikesCounter, changeLikeStatus, isCardLiked) {
    if (isCardLiked) {
        api.deleteLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.addLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function createCard(photoCard) {
    return new Card(photoCard, cardTemplate, popupBigPhoto.open, handleLike, popupCardDelete.open, userInfo.getUserId()).createCard();
}

//Popup редактирования и сохранения профиля//
 buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupProfileEdit.open();
    popupProfileEdit.setInputValues(userInfo.getUserInfo());
    formValidations[formEditProfile.getAttribute('name')].resetValidation();
});

//Popup редактирования аватара//
buttonEditAvatar.addEventListener('click', () => {
    popupAvatarEdit.open();
    formValidations[formEditAvatar.getAttribute('name')].resetValidation();
});

//Popup добавления карточки//
buttonOpenAddCardPopup.addEventListener('click', () => {
    popupCardAdd.open();
    formValidations[formAddCard.getAttribute('name')].resetValidation();
});

////////////////////////////////////////////////////////////////////////////
/*
//большой попап
const popupBig = new PopupWithImage("#popupBigCard");
popupBig.setEventListeners();

//размещение картинок
function createCard(card) {
  return new Card(card, cardTemplate, popupBig.open).createCard();
}

const section = new Section(
  { renderer: createCard },
  ".elements"
);
section.renderElements();

//данные юзера
const userInfo = new UserInfo({
  userName: ".info__name",
  userCareer: ".info__career",
  avatar: ".profile__avatar",
});

//формы редактирования профиля и добавления фото
const popupPic = new PopupWithForm(
  "#popupCard-PlaceADD",
  handleFormCardAddSubmit
);
popupPic.setEventListeners();

const popupInfo = new PopupWithForm("#popupProfileEdit", handleFormSubmit);
popupInfo.setEventListeners();

const popupAvatar = new PopupWithForm("#popupAvatarEdit", handleFormAvatarSubmit);
popupAvatar.setEventListeners();

//смена аватара
function handleFormAvatarSubmit(inputValues) {
    function makeRequest() {
        return api.editAvatar(inputValues.avatar).then((result) => {
            userInfo.setAvatar(result.avatar);
        });
    }

    handleSubmit(makeRequest, popupAvatarEdit);
}

//добавления карточки
function handleFormCardAddSubmit() {
  const card = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  section.addItem(card);
  formAddCard.reset(card);
}

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

buttonEditAvatar.addEventListener('click', () => {
    popupAvatar.open();
    formValidations[formEditAvatar.getAttribute('name')].resetValidation();
});

const popupCardDelete = new PopupWithAssent('#cardDelete', handleCardDelete);
popupCardDelete.setEventListeners();

function handleCardDelete(cardId, deleteCard) {
    function makeRequest() {
        return api.deleteCard(cardId).then(() => {
            deleteCard();
        });
    }

    handleSubmit(makeRequest, popupCardDelete, 'Удаление...');
}
*/

//////////////////////////////////////////////////////////////



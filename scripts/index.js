const infoEdit = document.querySelector(".info__edit");
const popup = document.querySelector(".popup");
let nameUser = "Жак-ив Кусто";
let careerUser = "Исследователь океана";
const careerUserForm = document.querySelector(".form__career");
const nameUserForm = document.querySelector(".form__name");
const careerElement = document.querySelector(".info__career");
const nameElement = document.querySelector(".info__name");
const closePopup = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".form");

infoEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameUserForm.value = nameUser;
  careerUserForm.value = careerUser;
});

function popupClose() {
  popup.classList.remove("popup_opened");
}

closePopup.addEventListener("click", function(){
  popupClose();
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameUserForm.value;
  careerElement.textContent = careerUserForm.value;
  popupClose();
}

formElement.addEventListener("submit", handleFormSubmit);

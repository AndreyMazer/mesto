const infoEdit = document.querySelector(".info__edit");
const popupForm = document.querySelector(".popup");

infoEdit.addEventListener("click", function () {
  popupForm.classList.add("popup_opened");
});

const closePopup = document.querySelector(".popup__close-button");

closePopup.addEventListener("click", function () {
  popupForm.classList.remove("popup_opened");
});

let nameUser = "Жак-ив Кусто";
let careerUser = "Исследователь океана";

const nameElement = document.querySelector(".info__name");
nameElement.textContent = nameUser;

const careerElement = document.querySelector(".info__career");
careerElement.textContent = careerUser;

const nameUserForm = document.querySelector(".form__name");
nameUserForm.value = nameUser;

const careerUserForm = document.querySelector(".form__career");
careerUserForm.value = careerUser;


let formElement = document.querySelector(".form");
let submitForm = document.querySelector(".form__save");

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameUserForm.value;
  careerElement.textContent = careerUserForm.value;
}

 submitForm.addEventListener("click", function () {
  popupForm.classList.remove("popup_opened");});

formElement.addEventListener("submit", handleFormSubmit);

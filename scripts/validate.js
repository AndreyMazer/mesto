//отображение и скрытие ошибки
function showInputError(
  input,
  errorTextElement,
  validationMessage,
  errorTemplateClass
) {
  input.classList.add(errorTemplateClass);
  errorTextElement.textContent = validationMessage;
}

function hideInputError(input, errorTextElement, errorTemplateClass) {
  input.classList.remove(errorTemplateClass);
  errorTextElement.textContent = "";
}

//активная и неактивная кнопка
function disableButton(submitButton, disableButtonClass) {
  submitButton.classList.remove(disableButtonClass);
  submitButton.disabled = false;
}

function enableButton(submitButton, disableButtonClass) {
  submitButton.classList.add(disableButtonClass);
  submitButton.disabled = true;
}

//отображение и скрытие текста ошибки
function checkInputValidity(input, textErrorSelector, errorTemplateClass) {
  const errorTextElement = document.querySelector(
    `${textErrorSelector}${input.name}`
  );
  if (!input.validity.valid) {
    showInputError(
      input,
      errorTextElement,
      input.validationMessage,
      errorTemplateClass
    );
  } else {
    hideInputError(input, errorTextElement, errorTemplateClass);
  }
}

//активная и неактивная кнопка при валидности формы
function toggleButtonState(inputList, submitButton, disableButtonClass) {
  const inputArray = [...inputList];
  const hasInvalidInputs =
    inputArray.filter((input) => !input.validity.valid).length === 0;
  if (hasInvalidInputs) {
    disableButton(submitButton, disableButtonClass);
  } else {
    enableButton(submitButton, disableButtonClass);
  }
}

//слушатели событий валидации
function setEventListeners(
  inputList,
  textErrorSelector,
  errorTemplateClass,
  submitButton,
  disableButtonClass
) {
  inputList.forEach((input) => {
    input.addEventListener("input", function (evt) {
      checkInputValidity(input, textErrorSelector, errorTemplateClass);
      toggleButtonState(inputList, submitButton, disableButtonClass);
    });
  });
}

//включение валидации
function enableValidation(config) {
  const formValidation = document.querySelectorAll(config.formSelector);

  formValidation.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    setEventListeners(
      inputList,
      config.textErrorSelector,
      config.errorTemplateClass,
      submitButton,
      config.disableButtonClass
    );
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  disableButtonClass: "popup__save_disabled",
  textErrorSelector: ".popup__input-error_type_",
  errorTemplateClass: "popup__input_error",
});

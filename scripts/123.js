/*function cards(element) {
  const newElement = document
    .querySelector(".template")
    .content.cloneNode(true);
  const cardTitle = newElement.querySelector(".element__title");
  cardTitle.textContent = element.name;
  const cardImage = newElement.querySelector(".element__gora");
  cardImage.setAttribute("src", element.link);
  const deleteButton = newElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", deleteButtonClick);
  const likeButton = newElement.querySelector(".element__like");
  likeButton.addEventListener("click", likeButtonClick);
  elements.append(newElement);
}*/
initialCards.forEach(cards);

/*function handleFormPicSubmit(evt) {
  evt.preventDefault()
  const formPic = evt.target
   const newElement = document.querySelector(".template").cloneNode(true);
  const popupPlace = formPic.querySelector(".popup-pic__input_type_place-name").value
  const popupPicInput = formPic.querySelector(".popup-pic__input_type_place-link").value
  const element = { link: popupPicInput, name: popupPlace }
 cards(element)
  popupPicClose()
  formPic.reset()
}
formPic.addEventListener("submit", handleFormPicSubmit);

initialCards.forEach(function (evt) {
  const card = handleFormPicSubmit(evt)
  elements.prepend(newElement)
})



function addCardsPopup (evt) {
  const popupPlace = formPic.querySelector(".popup-pic__input_type_place-name").value
  const popupPicInput = formPic.querySelector(".popup-pic__input_type_place-link").value
  const element = { link: popupPicInput, name: popupPlace }
 const formPic = cards(element);
elements.prepend(newElement);

}*/
 /*renderCard(initialCards.unshift({ name: popupPlace.value, link: popupPicInput.value}))*/
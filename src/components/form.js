import { closeModal } from "./modal.js";
import { updateUserData, addCard } from "./api.js";

// Обработчик для формы редактирования профиля
export function handleFormSubmit(
  evt,
  nameInput,
  aboutInput,
  profileTitle,
  profileDescription,
  editPopup
) {
  evt.preventDefault();

  const updatedName = nameInput.value;
  const updatedAbout = aboutInput.value;

  updateUserData(updatedName, updatedAbout)
    .then((updatedUserData) => {
      // Обновляем данные на странице
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;

  // Закрытие попапа
  closeModal(editPopup);
})
.catch((error) => {
  console.error(error);
});
}

// Обработчик для формы добавления новой карточки
export function handleAddCardFormSubmit(
  evt,
  addCardForm,
  cardListContainer,
  createCard,
  deleteCard,
  handleImageClick,
  addCardPopup,
  likeCallback
) {
  evt.preventDefault();

  const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
  const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(newCardData)
  .then((newCard) => {
    const cardElement = createCard(newCard);

    cardListContainer.prepend(cardElement);

    addCardForm.reset();
    closeModal(addCardPopup);
  })
  .catch((error) => {
    console.error('Ошибка добавления карточки:', error);
  });
}

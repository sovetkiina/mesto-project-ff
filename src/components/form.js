import { closeModal } from "./modal.js";

// Обработчик для формы редактирования профиля
export function handleFormSubmit(
  evt,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  editPopup
) {
  evt.preventDefault();

  // Обновление данных профиля
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // Закрытие попапа
  closeModal(editPopup);
}

// Обработчик для формы добавления новой карточки
export function handleAddCardFormSubmit(
  evt,
  addCardForm,
  cardListContainer,
  createCard,
  deleteCard,
  imageClickCallback,
  addCardPopup
) {
  evt.preventDefault();

  const cardNameInput = addCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

  // Создание новой карточки
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const newCard = createCard(newCardData, deleteCard, imageClickCallback);

  cardListContainer.prepend(newCard);

  // Очистка формы и закрытие попапа
  addCardForm.reset();
  closeModal(addCardPopup);
}

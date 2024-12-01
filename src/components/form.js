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

  // Обновляем данные профиля
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // Закрываем попап
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

  // Создаем новую карточку
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const newCard = createCard(newCardData, deleteCard, imageClickCallback);

  cardListContainer.prepend(newCard);

  // Очищаем форму и закрываем попап
  addCardForm.reset();
  closeModal(addCardPopup);
}

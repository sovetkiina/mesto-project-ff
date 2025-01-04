import { closeModal } from "./modal.js";
import { updateUserData, addCard, updateAvatar } from "./api.js";

// Обработчик для формы редактирования аватара
export function handleAvatarFormSubmit(
  evt,
  avatarInput,
  profileAvatar,
  editPopupAvatar
) {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const saveButton = evt.target.querySelector(".popup__button");
  const originalButtonText = saveButton.textContent;

  // изменение текста кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключение кнопки

  // запрос на обновление аватара
  updateAvatar(avatarLink)
    .then((updatedUserData) => {
      profileAvatar.style.backgroundImage = `url(${updatedUserData.avatar})`;

      closeModal(editPopupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка обновления аватара:", error);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
    });
}

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
  const saveButton = evt.target.querySelector(".popup__button");
  const originalButtonText = saveButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

  updateUserData(updatedName, updatedAbout)
    .then((updatedUserData) => {
      // Обновляем данные на странице
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;

      // Закрытие попапа
      closeModal(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка редактирования профиля:", error);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
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
  toggleLike,
  currentUserId
) {
  evt.preventDefault();

  const cardNameInput = addCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const saveButton = addCardForm.querySelector(".popup__button");
  const originalButtonText = saveButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

  addCard(newCardData)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        toggleLike,
        (cardElement, cardId) => deleteCard(cardElement, cardId),
        handleImageClick,
        currentUserId
      );

      cardListContainer.prepend(cardElement);

      addCardForm.reset();

      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      // Восстанавливаем текст кнопки и активируем её после завершения операции
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
    });
}

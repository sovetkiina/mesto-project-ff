import "../pages/index.css";
import {
  createCard,
  toggleLike,
  deleteCard
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import {
  handleFormSubmit,
  handleAddCardFormSubmit,
} from "../components/form.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getUserData, getCards } from "../components/api.js";

// Инициализация элементов DOM
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardListContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector('.profile__image');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Открытие попапа добавления новой карточки
addButton.addEventListener("click", () => {
  openModal(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  clearValidation(editProfileForm, validationConfig);
});

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

// Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener("submit", (evt) => {
  handleFormSubmit(
    evt,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    editPopup
  );
  clearValidation(editProfileForm, validationConfig);
});


// Обработчик отправки формы добавления карточки
addCardForm.addEventListener("submit", (evt) => {
  handleAddCardFormSubmit(
    evt,
    addCardForm,
    cardListContainer,
    createCard,
    deleteCard,
    handleImageClick,
    addCardPopup,
    toggleLike
  );
  clearValidation(addCardForm, validationConfig);
});

// Функция для обработки клика по изображению карточки
export function handleImageClick(cardImage) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  // Установка изображения в попап
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  // Открытие попапа с изображением
  openModal(imagePopup);
}

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    // Обновление данных профиля
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    // Отображаение карточек
    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardListContainer.append(cardElement);
    });
  })
  .catch((error) => {
    console.error('Ошибка загрузки данных:', error);
  });

// включение валидации вызовом enableValidation
enableValidation(validationConfig);
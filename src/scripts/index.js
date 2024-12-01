import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  toggleLike,
  deleteCard,
  renderCards,
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import {
  handleFormSubmit,
  handleAddCardFormSubmit,
} from "../components/form.js";

// Инициализация элементов DOM
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardListContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');

// Открытие попапа добавления новой карточки
addButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

// Слушатели событий для попапа изображения
cardListContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;
    openModal(imagePopup);
  }
});

// Обработчик отправки формы редактирования профиля
formElement.addEventListener("submit", (evt) => {
  handleFormSubmit(
    evt,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    editPopup
  );
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
    addCardPopup
  );
});

// Рендеринг
renderCards(initialCards, toggleLike, deleteCard, handleImageClick);

// Функция для обработки клика по изображению карточки
function handleImageClick(cardImage) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  // Устанавливаем изображение в попап
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  // Открытие попапа с изображением
  openModal(imagePopup);
}

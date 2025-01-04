//модуль modal

// Функция для открытия попапа
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");

  document.addEventListener("keydown", handleEscClose);

  popup.addEventListener("click", handleOverlayClose);
}

// Функция для обработки клика по изображению карточки
function handleImageClick(cardImage) {
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

// Функция для закрытия попапа
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");

  document.removeEventListener("keydown", handleEscClose);

  popup.removeEventListener("click", handleOverlayClose);
}

// Обработчик закрытия попапа по нажатию клавиши Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// Обработчик закрытия попапа по клику на оверлей
function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, handleImageClick, closeModal };

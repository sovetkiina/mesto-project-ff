// Функция для открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");

  document.addEventListener("keydown", handleEscClose);

  popup.addEventListener("click", handleOverlayClose);
}

// Функция для закрытия попапа
export function closeModal(popup) {
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
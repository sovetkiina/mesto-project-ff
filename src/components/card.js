// Функция для создания карточки
export function createCard(
  cardData,
  likeCallback,
  deleteCallback,
  imageClickCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  // Заполнение карточки данными
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Обработчик лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCallback(likeButton));

  // Обработчик удаления карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCallback(cardElement));

  // Обработчик клика по картинке
  cardImage.addEventListener("click", () => imageClickCallback(cardImage));

  return cardElement;
}

// Функция для переключения состояния лайка
export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция для удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для рендеринга всех карточек
export function renderCards(
  cardArray,
  likeCallback,
  deleteCallback,
  imageClickCallback
) {
  const cardListContainer = document.querySelector(".places__list");
  cardArray.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      likeCallback,
      deleteCallback,
      imageClickCallback
    );
    cardListContainer.append(cardElement);
  });
}

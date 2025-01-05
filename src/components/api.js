const cohortId = "wff-cohort-29";
const token = "3644d081-7a40-44ea-9826-6f47b46cc342";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}/`;

//функция для проверки ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//запрос на получение информации о  пользователе
function getUserData() {
  return fetch(`${apiUrl}users/me`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

//зарос на получение карточек
function getCards() {
  return fetch(`${apiUrl}cards`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

//Запрос на обновление аватара пользователя
function updateAvatar(avatarLink) {
  return fetch(`${apiUrl}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
}

// Запрос на обновление данных пользователя
function updateUserData(name, about) {
  return fetch(`${apiUrl}users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

//запрос на добавление новой карточки
function addCard(cardData) {
  return fetch(`${apiUrl}cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then(checkResponse);
}

// Запрос на постановку лайка на карточке
function toggleCardLike(cardId) {
  return fetch(`${apiUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

// Запрос на удаление лайка
function removeLike(cardId) {
  return fetch(`${apiUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

// Функция для удаления карточки с сервера
function deleteCardFromServer(cardId) {
  return fetch(`${apiUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

export {
  getUserData,
  getCards,
  updateUserData,
  addCard,
  toggleCardLike,
  removeLike,
  updateAvatar,
  deleteCardFromServer,
};

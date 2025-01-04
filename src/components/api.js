// api.js
const cohortId = "wff-cohort-29";
const token = "3644d081-7a40-44ea-9826-6f47b46cc342";

const apiUrl = `https://nomoreparties.co/v1/${cohortId}/`;

//запрос на получение информации о  пользователе
function getUserData() {
  return fetch(`${apiUrl}users/me`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//зарос на получение карточек
function getCards() {
  return fetch(`${apiUrl}cards`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка при обновлении аватара");
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка при обновлении данных пользователя");
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Запрос на постановку лайка на карточке
function toggleCardLike(cardId) {
  return fetch(`${apiUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Запрос на удаление лайка
function removeLike(cardId) {
  return fetch(`${apiUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Функция для получения данных о текущем пользователе
function getCurrentUser() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`, // Передаем токен для авторизации
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось получить данные о пользователе");
      }
      return response.json(); // Получаем данные в формате JSON
    })
    .then((data) => {
      console.log("Данные о текущем пользователе:", data);
      return data; // Возвращаем данные о пользователе
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
}

// Функция для удаления карточки с сервера
function deleteCardFromServer(cardId) {
  return fetch(`${apiUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log("Статус ответа:", res.status); // Добавьте это для отладки
        return Promise.reject("Ошибка при удалении карточки");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      alert("Ошибка при удалении карточки с сервера");
    });
}

export {
  getUserData,
  getCards,
  updateUserData,
  addCard,
  toggleCardLike,
  removeLike,
  updateAvatar,
  getCurrentUser,
  deleteCardFromServer,
};

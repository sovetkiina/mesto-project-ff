// api.js
const cohortId = 'wff-cohort-29';
const token = '3644d081-7a40-44ea-9826-6f47b46cc342';

const apiUrl = `https://nomoreparties.co/v1/${cohortId}/`;

//запрос на получение информации о  пользователе
function getUserData() {
  return fetch(`${apiUrl}users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//зарос на получение карточек
function getCards() {
  return fetch(`${apiUrl}cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Запрос на обновление данных пользователя 
function updateUserData(name, about) {
  return fetch(`${apiUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка при обновлении данных пользователя');
    });
}

//запрос на добавление новой карточки 
function addCard(cardData) {
  return fetch(`${apiUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export { getUserData, getCards, updateUserData, addCard };


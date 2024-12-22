const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");
const formError = form.querySelector(`.${formInput.id}-error`);

// Функция для отображения ошибки валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

// Функция для скрытия ошибки валидации
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

const  checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    });
  };
  
// Функция для добавления слушателей событий на поля формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


// Добавление обработчиков всем формам
export const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


// Функция для очистки ошибок валидации 
export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");
  
    inputList.forEach((inputElement) => hideInputError(formElement, inputElement));
    toggleButtonState(inputList, buttonElement);
};


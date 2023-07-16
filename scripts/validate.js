// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция, которая скрывает ошибку в поле ввода
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция для отключения кнопки
function disableButton(buttonElement) {
  buttonElement.classList.add('popup__submit_inactive');
  buttonElement.disabled = true;
}

// Функция для включения кнопки
function enableButton(buttonElement) {
  buttonElement.classList.remove('popup__submit_inactive');
  buttonElement.disabled = false;
}

// Функция, которая переключает состояние кнопки сабмита
function toggleButtonState(formElement, inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton);
  } else {
    enableButton(submitButton);
  }
}
// вешаем событие input
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, submitButton, config);
    });
  });

  toggleButtonState(formElement, inputList, submitButton, config);
};

// проверяем наличие невалидных полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

//включает валидацию формы
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

// Конфигурация валидации формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Включение валидации форм
enableValidation(validationConfig);










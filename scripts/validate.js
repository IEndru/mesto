/*

class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }
  //Функция, которая добавляет класс с ошибкой
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  //Функция, которая скрывает ошибку в поле ввода
  _hideInputError(inputElement)  {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };
// Функция, которая проверяет валидность поля
  _checkInputValidity (inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };


  // Функция для отключения кнопки
  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // Функция для включения кнопки
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  // Функция, которая переключает состояние кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  // вешаем событие input
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity (inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState(this._inputList, this._submitButton);
  }

  //включает валидацию формы
  enableValidation () {
    const formList = Array.from(this._formElement);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  };
}



// Конфигурация валидации формы
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация валидации для попапа "Добавить карточку"
  const popupAddCardsForm = document.querySelector('.popup_type_card-add');
  const addCardFormElement = popupAddCardsForm.querySelector('.popup__form_type_card-add');
  const addCardForm = new FormValidator(validationConfig, addCardFormElement);
  addCardForm.enableValidation();

  // Инициализация валидации для попапа "Редактировать профиль"
  const popupEditCardsForm = document.querySelector('.popup_type_profile-edit');
  const editFormElement = popupEditCardsForm.querySelector('.popup__form_type_edit');
  const editCardForm = new FormValidator(validationConfig, editFormElement);
  editCardForm.enableValidation();
});





/*
//****************************дальше начальный код без ООП*************************************************************

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
  const formList = Array.from(document.querySelectorAll(config.formElement));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

// Конфигурация валидации формы
const validationConfig = {
  formElement: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Включение валидации форм
enableValidation(validationConfig);

 */












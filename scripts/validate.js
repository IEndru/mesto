// Функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

//вешаем событие input
const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__submit');
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('popup__submit_inactive');
  } else {
    submitButtonSelector.classList.remove('popup__submit_inactive');
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
      setEventListeners(formSelector);
  });
};


enableValidation();











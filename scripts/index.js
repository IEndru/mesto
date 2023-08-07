import { initialCards } from "./content.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Конфигурация валидации формы
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
let addCardForm;

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация валидации для попапа "Добавить карточку"
  const popupAddCardsForm = document.querySelector('.popup_type_card-add');
  const addCardFormElement = popupAddCardsForm.querySelector('.popup__form_type_card-add');
  addCardForm = new FormValidator(validationConfig, addCardFormElement);
  addCardForm.enableValidation();

  // Инициализация валидации для попапа "Редактировать профиль"
  const popupEditCardsForm = document.querySelector('.popup_type_profile-edit');
  const editFormElement = popupEditCardsForm.querySelector('.popup__form_type_edit');
  const editCardForm = new FormValidator(validationConfig, editFormElement);
  editCardForm.enableValidation();
});

const editButtonElement = document.querySelector('.profile__edit-button');
const closeButtonEditElement = document.querySelector('.popup__close-button_type_edit');
const popupElementEdit = document.querySelector('.popup_type_profile-edit');
const formEditElement = document.querySelector('.popup__form_type_edit');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_specialization');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

// Функция для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupUseEsc);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupUseEsc);
}

// Функция для закрытия попапа при нажатии на Esc
function closePopupUseEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//закрытие попапов кликом на оверлей
const popupElements = document.querySelectorAll('.popup');
popupElements.forEach(function (popup) {
  popup.addEventListener('mousedown', function (event) {
    if (event.target === popup) {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  });
});

// Функция для редактирования профиля
function editFormProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupElementEdit);
}

// Открытие попапа редактирования профиля
editButtonElement.addEventListener('click', function () {
  openPopup(popupElementEdit);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

// Закрытие попапа редактирования профиля
closeButtonEditElement.addEventListener('click', function () {
  closePopup(popupElementEdit);
});

// Обработка события отправки формы редактирования профиля
formEditElement.addEventListener('submit', editFormProfile);

const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_type_card-add');
const addFormElement = popupAddCards.querySelector('.popup__form_type_card-add');
const closeButtonAddCards = popupAddCards.querySelector('.popup__close-button_type_card-add');
const nameInputAddCard = popupAddCards.querySelector('.popup__input_type_name');
const linkInputAddCard = popupAddCards.querySelector('.popup__input_type_link');
const elementsContainer = document.querySelector('.elements');
//const cardTemplate = document.querySelector('#card-template');

// Функция для добавления новой карточки
function addCards(evt) {
  evt.preventDefault();
  const name = nameInputAddCard.value;
  const link = linkInputAddCard.value;
  const cardData = { name, link };
  const card = new Card(cardData, '#card-template');
  const cardElement = card.generateCard();
  addCardToContainer(cardElement);
  closePopupAddCards();
  addFormElement.reset();
}

// Функция для открытия попапа добавления карточки
function openPopupAddCards() {
    openPopup(popupAddCards);
  addCardForm.disableButton()
}

// Функция для закрытия попапа добавления карточки
function closePopupAddCards() {
  closePopup(popupAddCards);
}

// Функция для добавления карточки в контейнер
function addCardToContainer(cardElement) {
 elementsContainer.prepend(cardElement);
}

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', openPopupAddCards);

// Закрытие попапа добавления карточки
closeButtonAddCards.addEventListener('click', closePopupAddCards);

// Обработка события отправки формы добавления карточки
addFormElement.addEventListener('submit', addCards);

// Функция для вывода начальных карточек
function useInitialCards() {
  initialCards.forEach(function (img) {
    const cardData = { name: img.name, link: img.link };
    const card = new Card(cardData, '#card-template');
    const cardElement = card.generateCard();
    addCardToContainer(cardElement);
  });
}

useInitialCards();

// Получение элементов попапа с полноразмерным изображением
const popupImage = document.querySelector('.popup_type_image');
const popupContent = popupImage.querySelector('.popup__image-wrap');
const closeButtonFullImage = popupContent.querySelector('.popup__close-button_type_full-image');
const popupElementImage = popupContent.querySelector('.popup__image');
const popupElementContent = popupContent.querySelector('.popup__image-caption');

// Функция для открытия полноразмерного изображения
export function openFullScreenImage(name, link) {
  popupElementImage.src = link;
  popupElementImage.alt = name;
  popupElementContent.textContent = name;
  openPopup(popupImage);
}

// Функция для закрытия полноразмерного изображения
function closePopupImage() {
  closePopup(popupImage);
}

// Слушатель на кнопку закрытия полноразмерного изображения
closeButtonFullImage.addEventListener('click', closePopupImage);



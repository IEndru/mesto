import './index.css';
import { initialCards, validationConfig } from '../scripts/utils/constants.js';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from '../scripts/components/UserInfo.js';


import { popupAddCardsForm,addCardFormElement,popupEditCardsForm,editFormElement } from '../scripts/utils/constants.js';

import { editButtonElement,closeButtonEditElement,popupElementEdit,formEditElement,nameInput,jobInput,profileNameElement,profileJobElement} from '../scripts/utils/constants.js';

import {popupElements} from '../scripts/utils/constants.js';

import {profileAddButton,popupAddCards,addFormElement,closeButtonAddCards,nameInputAddCard,linkInputAddCard,cardsContainer} from '../scripts/utils/constants.js';

import {popupImage,popupContent,closeButtonFullImage,popupElementImage,popupElementContent} from '../scripts/utils/constants.js';

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, editFormElement);
profileFormValidator.enableValidation();

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElem = card.generateCard();
  return cardElem;
}

const handleCardFormSubmit = (cardData) => {
  //console.log(cardData);
  const cardElem = createCard(cardData);
  cardSection.addItem(cardElem);
  popupFormAddCard.close();
};

// Создаем экземпляр класса PopupWithForm для попапа добавления карточек
const popupFormAddCard = new PopupWithForm(popupAddCardsForm, handleCardFormSubmit);
popupFormAddCard.setEventListeners();

profileAddButton.addEventListener('click', () => {
  popupFormAddCard.open();
  addCardFormValidator.disableButton()
});

//редактирования профиля
const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorJob: '.profile__subtitle'
});

const handleProfileFormSubmit = (data) => {
  //console.log(data);
  userInfo.setUserInfo( data );
  popupFormEditProfile.close();
}

const popupFormEditProfile = new PopupWithForm(popupEditCardsForm, handleProfileFormSubmit);
popupFormEditProfile.setEventListeners();

editButtonElement.addEventListener('click', ()=> {
  const inputInfo = userInfo.getUserInfo();
  // Заполнение инпутов текущими данными
  nameInput.value = inputInfo.name;
  jobInput.value = inputInfo.job;
  popupFormEditProfile.open();
})

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElem = createCard(item);
    cardSection.addItem(cardElem);
  }
}, '.elements');

cardSection.renderItems()

const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.setEventListeners();

function handleCardClick(name, link){
  popupWithImage.open(name, link);
}



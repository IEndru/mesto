

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

import {profileAddButton,popupAddCards,addFormElement,closeButtonAddCards,nameInputAddCard,linkInputAddCard,elementsContainer} from '../scripts/utils/constants.js';

import {popupImage,popupContent,closeButtonFullImage,popupElementImage,popupElementContent} from '../scripts/utils/constants.js';

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

const popupEditCardFormValidator = new FormValidator(validationConfig, editFormElement);
popupEditCardFormValidator.enableValidation();

const handlerFormAddCard = () => {
  const name = nameInputAddCard.value;
  const link = linkInputAddCard.value;
  const cardData = { 'name': name, 'link': link };
  const card = new Card(cardData, '#card-template', handleCardClick);
  const cardElem = card.generateCard();
  cardSection.addItem(cardElem);
  popupFormAddCard.close();
};

// Создаем экземпляр класса PopupWithForm для попапа добавления карточек
const popupFormAddCard = new PopupWithForm(popupAddCardsForm, handlerFormAddCard);
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
const handlerFormEditProfile = () => {
  const name = nameInput.value;
  const job = jobInput.value;
  userInfo.setUserInfo({ name, job });
}

const popupFormEditProfile = new PopupWithForm(popupEditCardsForm, handlerFormEditProfile);
popupFormEditProfile.setEventListeners();

editButtonElement.addEventListener('click', ()=> {
  popupFormEditProfile.open();
})

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template',handleCardClick);
    const cardElem = card.generateCard();
    cardSection.addItem(cardElem);
  }
}, '.elements');

cardSection.renderItems()

const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.setEventListeners();

function handleCardClick(name, link){
  popupWithImage.open(name, link);
}




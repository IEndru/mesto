import './index.css';
import {initialCards, validationConfig} from '../scripts/utils/constants.js';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithVerification from '../scripts/components/PopupWithVerification.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api';

import { popupAddCardsForm,addCardFormElement,popupEditCardsForm,editFormElement,popupEditAvatarForm,editAvatarFormElement,deleteCardsPopup,photoAvatar} from '../scripts/utils/constants.js';

import {editAvatarButtonElement, editButtonElement,closeButtonEditElement,popupElementEdit,formEditElement,nameInput,jobInput,profileNameElement,profileJobElement} from '../scripts/utils/constants.js';

import {popupElements} from '../scripts/utils/constants.js';

import {profileAddButton,popupAddCards,addFormElement,closeButtonAddCards,nameInputAddCard,linkInputAddCard,cardsContainer} from '../scripts/utils/constants.js';

import {popupImage,popupContent,closeButtonFullImage,popupElementImage,popupElementContent} from '../scripts/utils/constants.js';

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, editFormElement);
profileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(validationConfig, editAvatarFormElement);
editAvatarFormValidator.enableValidation();

// попап всплывающий при удалении card
const verificationCardPopup = new PopupWithVerification(deleteCardsPopup);
verificationCardPopup.setEventListeners();



//редактирования профиля
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const cardSection = new Section({
  renderer: (item) => {
    const cardElem = createCard(item);
    cardSection.addItem(cardElem);
  }
}, '.elements');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859',
    'Content-Type': 'application/json'
  }
});

let userId;
//загрузка данных о пользователе и карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    //console.log(userData);
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardSection.renderItems(cards)
  })
  .catch(error => {
    console.log(error);
  });

// генерируем элемент карточки
function createCard(data) {
  //console.log(data);
  const card = new Card({
    cardData: data,
    templateSelector: '#card-template',
    handleCardClick:(name,link) => {
      popupWithImage.open(name, link);
    },
    userId: userId,
    handleAddLike: (cardId) => {
      api.addLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    },
    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    },
    handleDeleteButtonClick: (cardId) => {
      verificationCardPopup.open();
      verificationCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            setTimeout(() => {
            verificationCardPopup.close();
            card.deleteCard();},1000);
          })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          });
      });
    }
  });
  const cardElem = card.generateCard();
  return cardElem;
}

// Создаем экземпляр класса PopupWithForm для попапа добавления карточек
const popupFormAddCard = new PopupWithForm({
  popup:popupAddCardsForm,
  submitCallback:(formData) => {
    popupFormAddCard .toggleLoading(true);
    api.getNewCard(formData)
      .then((formData) => {
        cardSection.addItem(createCard(formData));
        popupFormAddCard.close();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setTimeout(() => {
          popupFormAddCard.toggleLoading(false);
        }, 1000);
      });
  }
});

popupFormAddCard.setEventListeners();

//попап редактирования профиля
const popupFormEditProfile = new PopupWithForm({
  popup:popupEditCardsForm,
  submitCallback:(data) => {
    popupFormEditProfile.toggleLoading(true);
    api.setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupFormEditProfile.close();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setTimeout(() => {
          popupFormEditProfile.toggleLoading(false);
        }, 1000);
      });
  }
});

//вешаем слушателя на кнопку
popupFormEditProfile.setEventListeners();

// Создание попапа редактирования аватара
const popupFormEditAvatar = new PopupWithForm({
  popup: popupEditAvatarForm,
  submitCallback: (data) => {
    popupFormEditAvatar.toggleLoading(true);
    api. setUserAvatar(data)
      .then((data) => {
        //console.log(data);
        photoAvatar.src = data.avatar;
        popupFormEditAvatar.close();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setTimeout(() => {
          popupFormEditAvatar.toggleLoading(false);
        }, 1000);
      });
  }
});

popupFormEditAvatar.setEventListeners();

editAvatarButtonElement.addEventListener('click', () => {
  popupFormEditAvatar.open();
});

profileAddButton.addEventListener('click', () => {
  popupFormAddCard.open();
  addCardFormValidator.disableButton()
});

editButtonElement.addEventListener('click', ()=> {
  const inputInfo = userInfo.getUserInfo();
  // Заполнение инпутов текущими данными
  nameInput.value = inputInfo.name;
  jobInput.value = inputInfo.about;
  popupFormEditProfile.open();
})













































/*


fetch('https://mesto.nomoreparties.co/v1/cohort-74/cards', {
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch('https://nomoreparties.co/v1/cohort-74/users/me', {
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch('https://mesto.nomoreparties.co/v1/cohort-74/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});

fetch('https://mesto.nomoreparties.co/v1/cohort-74/cards', {
  method: 'POST',
  headers: {
    authorization: '11813631-a6ff-4278-8ebe-34f9a02b5859',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  })
  });

 */




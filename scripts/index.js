const editButtonElement = document.querySelector('.profile__edit-button');
const closeButtonEditElement = document.querySelector('.popup__close-button_type_edit');
const popupElementEdit = document.querySelector('.popup_type_profile-edit');
const formEditElement = document.querySelector('.popup__form_type_edit');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_specialization');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupUseEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupUseEsc);
}

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
popupElements.forEach(function(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target === popup) {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  });
});

function editFormProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupElementEdit);
}

editButtonElement.addEventListener('click', function() {
  openPopup(popupElementEdit);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

closeButtonEditElement.addEventListener('click', function() {
  closePopup(popupElementEdit);
});

formEditElement.addEventListener('submit', editFormProfile);

// Открытие и закрытие popup с фото
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_type_card-add');
const addFormElement = popupAddCards.querySelector('.popup__form_type_card-add');
const closeButtonAddCards = popupAddCards.querySelector('.popup__close-button_type_card-add');
const nameInputAddCard = popupAddCards.querySelector('.popup__input_type_name');
const linkInputAddCard = popupAddCards.querySelector('.popup__input_type_link');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

function createCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__img');
  const cardTitle = cardElement.querySelector('.elements__title');
  const likeButton = cardElement.querySelector('.elements__heart');
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  cardImage.addEventListener('click', function() {
    openFullScreenImage(name, link);
  });

  return cardElement;
}

function addCards(evt) {
  evt.preventDefault();
  const name = nameInputAddCard.value;
  const link = linkInputAddCard.value;
  const cardElement = createCard(name, link);
  elementsContainer.prepend(cardElement);

  closePopup(popupAddCards);
  addFormElement.reset();
}

// Лайки
function handleLikeButtonClick(event) {
  const like = event.target;
  like.classList.toggle('elements__heart_active');
}

function handleDeleteButtonClick(event) {
  const deleteCard = event.target.closest('.elements__card');
  console.log(deleteCard);
  deleteCard.remove();
}

// Добавление карточек из массива
function useInitialCards() {
  initialCards.forEach(function(img) {
    const cardElement = createCard(img.name, img.link);
    elementsContainer.prepend(cardElement);
  });
}

profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCards);
});

closeButtonAddCards.addEventListener('click', function() {
  closePopup(popupAddCards);
});

addFormElement.addEventListener('submit', addCards);

useInitialCards();

const popupImage = document.querySelector('.popup_type_image');
const popupContent = popupImage.querySelector('.popup__image-wrap');
const closeButtonFullImage = popupContent.querySelector('.popup__close-button_type_full-image');
const popupElementImage = popupContent.querySelector('.popup__image');
const popupElementContent = popupContent.querySelector('.popup__image-caption');

function openFullScreenImage(name, link) {
  popupElementImage.src = link;
  popupElementImage.alt = name;
  popupElementContent.textContent = name;
  openPopup(popupImage);
}

closeButtonFullImage.addEventListener('click', function() {
  closePopup(popupImage);
});


const editButtonElement = document.querySelector('.profile__edit-button');
const closeButtonElement = document.querySelector('.popup__close-button');
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_specialization');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

editButtonElement.addEventListener('click', openPopup);
closeButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

// открытие и закрытие popap с фото
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_type_card-add');
const addFormElement = popupAddCards.querySelector('.popup__form')
const closeButtonAddCards = popupAddCards.querySelector('.popup__close-button');
const NameInputAddCard = popupAddCards.querySelector('.popup__input_type_name');
const LinkInputAddCard = popupAddCards.querySelector('.popup__input_type_link');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template')
const likeButton = cardTemplate.querySelector('.elements__heart');

function openPopupCards() {
  popupAddCards.classList.add('popup_opened');
}

function closePopupCards() {
  popupAddCards.classList.remove('popup_opened');
}

function addCards (evt){
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector ('.elements__img');
  const cardTitle = cardElement.querySelector ('.elements__title');
  const likeButton = cardElement.querySelector('.elements__heart');
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  const name = NameInputAddCard.value;
  const link = LinkInputAddCard.value;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  elementsContainer.prepend(cardElement);
  cardImage.addEventListener('click', openFullScreenImage);

  closePopupCards();
  addFormElement.reset();
}

//лайки
function handleLikeButtonClick(event) {
  const like = event.target;
  like.classList.toggle('elements__heart_active');
}

function handleDeleteButtonClick(event) {
  const deleteCard = event.target.closest('.elements__card');
  deleteCard.remove();
}

//добавление карточек из массива
function useInitialCards() {
  initialCards.forEach(function (img) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardTitle = cardElement.querySelector('.elements__title');
    const likeButton = cardElement.querySelector('.elements__heart');
    const deleteButton = cardElement.querySelector('.elements__delete-button');

    cardImage.src = img.link;
    cardImage.alt = img.name;
    cardTitle.textContent = img.name;

    likeButton.addEventListener('click', handleLikeButtonClick);
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    elementsContainer.prepend(cardElement);
  });
}

profileAddButton.addEventListener('click', openPopupCards);
closeButtonAddCards.addEventListener('click', closePopupCards);
addFormElement.addEventListener('submit', addCards);

useInitialCards()

const popupImage = document.querySelector('.popup_type_image');
const popupContent = popupImage.querySelector('.popup__image-wrap');
const closeButtonImage = popupContent.querySelector('.popup__close-button');
const cardImage = document.querySelectorAll('.elements__img');

//открытие картинки большой размер
function openFullScreenImage(event){
  console.log(event);
  const popupElementImage = popupContent.querySelector('.popup__image');
  const popupElementContent = popupContent.querySelector('.popup__image-caption');
  const cardTitle = event.target.nextElementSibling.textContent;

  popupElementImage.src= event.target.src;
  popupElementImage.name= event.target.alt;
  popupElementContent.textContent = cardTitle;
  popupImage.classList.add('popup_opened');
}

cardImage.forEach(function(fullScreen) {
  fullScreen.addEventListener('click', openFullScreenImage);
});

function closePopupFullImage() {
  popupImage.classList.remove('popup_opened');
}

closeButtonImage.addEventListener('click', closePopupFullImage)

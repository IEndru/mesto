const editButtonElement = document.querySelector('.profile__edit-button');
const closeButtonElement = document.querySelector('.popup__close-button');
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_specialization');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

function openPopup() {
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

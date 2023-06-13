const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка редактировать
const closeButtonElement = document.querySelector('.popup__close-button'); //close
const popupElement = document.querySelector('.popup');//выбрали попап

function openPopup() {
  popup.classList.add('popup_opened'); // Добавляем класс для открытия попапа
}

function closePopup() {
  popup.classList.remove('popup_opened'); // Удаляем класс для закрытия попапа
}

editButtonElement.addEventListener('click','openPopup')//имя события и функция которая будет исполнена
closeButtonElement.removeEventListener('click','closePopup')//имя события и функция которая будет исполнена

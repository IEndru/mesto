const editButtonElement = document.querySelector('.profile__edit-button'); //кнопка редактировать
const closeButtonElement = document.querySelector('.popup__close-button'); //close
const popupElement = document.querySelector('.popup');//выбрали попап
const saveButtonElement = document.querySelector('.popup__submit');

function handleClick() {
  popupElement.classList.toggle('popup_opened'); // Добавляем класс для открытия попапа и убираем
}
editButtonElement.addEventListener('click',handleClick);//имя события и функция которая будет исполнена
closeButtonElement.addEventListener('click',handleClick);//имя события и функция которая будет исполнена

// Находим форму в DOM
let formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input-user'); // Воспользуйтесь инструментом .querySelector(
let jobInput = formElement.querySelector('.popup__input-specialization');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileNameElement = document.querySelector('.profile__title')
  let profileJobElement = document.querySelector('.profile__subtitle')
  // Вставьте новые значения с помощью textContent
  profileNameElement.textContent = name;
  profileJobElement.textContent = job;

  saveButtonElement.addEventListener('click',handleClick);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

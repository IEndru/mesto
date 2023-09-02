export default class Card{
  constructor({cardData, templateSelector, handleCardClick, userId,  handleAddLike, handleDeleteLike, handleDeleteButtonClick}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._cardId = cardData._id;
    this._cardOwnerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);
    return cardElement;
  }

  _setData() {
    this._cardImage = this._element.querySelector('.elements__img');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardTitle.textContent = this._name;
    this._likeButton = this._element.querySelector('.elements__heart');
  }


  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setListeners() {
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this._cardId));

    this._likeButton .addEventListener('click', () => {
      if (this._likeButton .classList.contains('elements__heart_active')) {
        this._handleDeleteLike(this._cardId);
      }
      else {
        this._handleAddLike(this._cardId);
      }
    })

  const cardImage = this._element.querySelector('.elements__img');
  cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setData();
    this._setListeners();
    this._hasDeleteBtn();
    this._ifIsCardLiked();
    this._likesNumber = this._element.querySelector('.elements__likes-counter');
    this._likesNumber.textContent = this._likes.length;
    return this._element;
  }

  _ifIsCardLiked() {
    this._likes.forEach((user) => {
      if (this._userId === user._id) {
        this._likeButton.classList.add('elements__heart_active');
      }
    });
  }

  // удаление лайка и активация + count
  handleLikeCard(cardData) {
    this._likes = cardData.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('elements__heart_active');
  }

  // проверяем владельца card и убираем мусорку
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }
}



























































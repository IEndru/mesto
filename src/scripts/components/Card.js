export default class Card{
  constructor(cardData, templateSelector,handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('elements__heart_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
    
  }

  _setListeners() {
    const deleteButton = this._element.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
    this._likeButton = this._element.querySelector('.elements__heart');
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));//() => this._handleLikeButtonClick());
    const cardImage = this._element.querySelector('.elements__img');
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setData();
    this._setListeners();
    return this._element;
  }
}
































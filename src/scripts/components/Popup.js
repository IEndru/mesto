export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = selectorPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // метод для открытия попапа
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // метод для закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // метод для закрытия попапа при нажатии на Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  //закрытие попапов кликом на оверлей
  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}



import Popup from "./Popup.js";

export default class PopupWithVerification extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
  }

  //  Устанавливаем обработчик события отправки формы
  submitCallback(delCallback) {
    this._handleSubmit = delCallback;
  }

  // установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}

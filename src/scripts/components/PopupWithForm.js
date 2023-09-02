import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popup, submitCallback}) {
    super(popup);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._formElement.querySelector('.popup__submit')
    this._originalSubmitButtonText = this._popupSubmitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    //console.log(inputValues);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', e => {
      e.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  toggleLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...';
    }
    else {
      this._popupSubmitButton.textContent = this._originalSubmitButtonText;
    }
  }


}


import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupPictureCardImage = this._selectorPopup.querySelector('.popup__image');
    this._popupPictureCardTitle = this._selectorPopup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    super.open();
    this._popupPictureCardImage.alt = name;
    this._popupPictureCardTitle.textContent = name;
    this._popupPictureCardImage.src = link;
  }

  close() {
    super.close();
  }

}


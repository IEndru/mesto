import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupPictureCardImage = this._popup.querySelector('.popup__image');
    this._popupPictureCardTitle = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    super.open();
    this._popupPictureCardImage.alt = name;
    this._popupPictureCardTitle.textContent = name;
    this._popupPictureCardImage.src = link;
  }

}


export default class UserInfo {
  constructor(selectorName, selectorJob, selectorAvatar) {
    this._nameElement  = document.querySelector(selectorName);
    this._jobElement = document.querySelector(selectorJob);
    this._avatar =document.querySelector(selectorAvatar)
  }

  getUserInfo() {
   return  {
      name: this._nameElement .textContent,
      about: this._jobElement.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    this._nameElement .textContent = data.name;
   this._jobElement.textContent = data.about;
    this._avatar.src = data.avatar;
  }

}

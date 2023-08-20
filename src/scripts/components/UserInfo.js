export default class UserInfo {
  constructor({selectorName, selectorJob}) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorJob = document.querySelector(selectorJob);
  }

  getUserInfo(){
    return  {
      name: this._selectorName.textContent,
      job: this._selectorJob.textContent};
  }

  setUserInfo({name, job}){
    this._selectorName.textContent = name;
    this._selectorJob.textContent = job;
  }
}




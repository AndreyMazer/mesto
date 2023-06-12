export class UserInfo {
  constructor({ userName, userCareer }) {
    this._name = document.querySelector(userName);
    this._career = document.querySelector(userCareer);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      career: this._career.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, career }) {
    this._name.textContent = name;
    this._career.textContent = career;
  }
}

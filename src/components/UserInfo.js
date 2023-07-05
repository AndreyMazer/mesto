export class UserInfo {
  constructor({ userName, userCareer, avatar}) {
    this._name = document.querySelector(userName);
    this._career = document.querySelector(userCareer);
    this._avatar = document.querySelector(avatar);
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

  setProfileAvatar(link) {
        this._avatar.src = link;
    }
}

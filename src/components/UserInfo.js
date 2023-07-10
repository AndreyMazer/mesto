/*export class UserInfo {
  constructor({ userName, userCareer, avatar}) {
    this._name = document.querySelector(userName);
    this._career = document.querySelector(userCareer);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      career: this._career.textContent,
      userId: this._userId
    };
    return userInfo;
  }

    getUserId() {
    return this._userId;
  }

  setUserInfo({ name, career, avatar, _id}) {
    this._name.textContent = name;
    this._career.textContent = career;
    this.setAvatar(avatar);
    this._userId = _id;
  }

  setProfileAvatar(link) {
        this._avatar.src = link;
    }
}*/

//////////////////////////////////////////

export class UserInfo {
  constructor({nameId, aboutId, avatarId}) {
    this._name = document.querySelector(nameId);
    this._about = document.querySelector(aboutId);
    this._avatar = document.querySelector(avatarId);
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      userId: this._userId
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._name.textContent = name;
    this._about.textContent = about;
    this.setAvatar(avatar);
    this._userId = _id;
  }

  setAvatar = (avatar) => {
    this._avatar.src = avatar;
  }
}


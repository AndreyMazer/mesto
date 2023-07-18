export class UserInfo {
  constructor({nameId, aboutId, avatarId}) {
    this._name = document.querySelector(nameId);
    this._career = document.querySelector(aboutId);
    this._avatar = document.querySelector(avatarId);
    //this._userId = null;
  };

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      career: this._career.textContent,
      //userId: this._userId
    };
    return userInfo
  }

  getUserId() {
    return this._userId;
  }

  
  
  setUserInfo = ({name, about, avatar, _id}) => {
    this._name.textContent = name;
    this._career.textContent = about;
    this.setAvatar(avatar);
    //this._userId = _id;
  }

  setAvatar(avatar)  {
    this._avatar.src = avatar;
  }
}


export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _toDo(endpoint, options) {
    const url = `${this._url}/${endpoint}`;
    return fetch(url, options).then(this._checkRes);
  }

  getProfile() {
    return this._toDo("users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  editProfile(profile) {
    return this._toDo(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.career,
      }),
    });
  }

  editAvatar(avatar) {
    return this._toDo(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  getInitialCards() {
    return this._toDo(`cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard(card) {
    return this._toDo(`cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.place,
        link: card.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._toDo(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(cardId) {
    return this._toDo(`cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._toDo(`cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

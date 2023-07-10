/*export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  // проверяет есть ли ошибка
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }
  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // добавление карточек на страницу
  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // получение данных с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // изменение данных с сервера
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // изменение данных аватара
  patchAvatarInfo(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // добавление лайка
  getLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
}*/

//////////////////////////////////////////////////////////////////////

export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    async _request(endpoint, options) {
        const url = `${this._baseUrl}/${endpoint}`;
        const res = await fetch(url, options);
      return this._checkRes(res);
    }

    getProfile() {
        return this._request('users/me', {
            method: "GET",
            headers: this._headers
        });

    }

    editProfile(profile) {
        return this._request(`users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: profile.name,
                about: profile.about,
            })
        });
    }

    editAvatar(avatarLink) {
        return this._request(`users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
        });
    }

    getInitialCards() {
        return this._request(`cards`, {
            method: "GET",
            headers: this._headers
        });
    }

    addCard(card) {
        return this._request(`cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        });
    }

    deleteCard(cardId) {
        return this._request(`cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    addLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    deleteLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        });
    }
}


   
  

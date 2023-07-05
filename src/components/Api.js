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
}
*/



export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        //this._authorization = config.headers['authorization'];
    }
    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка')
        // return Promise.reject(new Error('Произошла ошибка.'))
    };
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._handleResponse)
    };
    getCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._handleResponse)
    };
    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
            .then(this._handleResponse)
    };
    addCards(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
            .then(this._handleResponse)
    };
    likeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({
                _id: `${id}`
            })
        })
            .then(this._handleResponse)
    };
    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
            body: JSON.stringify({
                _id: `${id}`
            })
        })
            .then(this._handleResponse)
    };
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._handleResponse)
    };
    editAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${url}`
            })
        })
            .then(this._handleResponse)
    }
}
/*export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleCloseEsc(evt)  {
    if (evt.key === "Escape") this.close();
  };

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleCloseEsc);
  }

  close() {
    document.removeEventListener("keydown", this._handleCloseEsc);
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      const hasTargetClass = (name) => {
        return evt.target.classList.contains(name);
      };
      if (
        hasTargetClass("popup_opened") ||
        hasTargetClass("popup__close-button")
      )
        this.close();
    });
  }
}*/
/////////////////////////////////////////////////////////////////////////

export class Popup {
  constructor(popupId) {
    this._popup = document.querySelector(popupId);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      const hasTargetClass = (id) => {
        return event.target.classList.contains(id);
      }
      if (hasTargetClass('popup_opened') || hasTargetClass('popup__close-button')) this.close();
    })
  }
}


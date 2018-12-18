'use strict';

(function () {

  var KEYCODE_ESC = 27;

  var onErrorSubmit = function (message) {
    errorButtonElement.addEventListener('click', closeErrorPopup);
    document.addEventListener('click', closeErrorPopup);
    document.addEventListener('keydown', function (evt) {
      if (evt.target === KEYCODE_ESC) {
        closeErrorPopup();
      }
    });

    errorMessageElement.textContent = message;
    mainElement.appendChild(errorMessageElement);
  };

  // eslint-disable-next-line no-unused-vars
  var onSuccessSubmit = function (message) {
  };

  var closeErrorPopup = function () {
    errorPopupElement.remove();
  };

  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var errorPopupElement = templateErrorElement.cloneNode(true);
  var errorButtonElement = errorPopupElement.querySelector('.error__button');
  var errorMessageElement = errorPopupElement.querySelector('.error__message');
  var mainElement = document.querySelector('.main');

  window.messages = {
    onErrorSubmit: onErrorSubmit,
    onSuccessSubmit: onSuccessSubmit
  };

})();

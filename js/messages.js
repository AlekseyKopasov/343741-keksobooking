'use strict';

(function () {
  var KEYCODE_ESC = 27;

  var createErrorMessage = function (message) {
    errorButtonElement.addEventListener('click', onButtonClick);
    errorMessageElement.textContent = message;

    mainElement.appendChild(errorMessageElement);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var createSuccessMessage = function () {
    // @TODO
  };

  var closeErrorMessage = function () {
    errorPopupElement.remove();

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    errorButtonElement.removeEventListener('click', onButtonClick);
  };

  var onButtonClick = function () {
    closeErrorMessage();
  };

  var onDocumentClick = function () {
    closeErrorMessage();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closeErrorMessage();
    }
  };

  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

  var errorPopupElement = templateErrorElement.cloneNode(true);
  var errorButtonElement = errorPopupElement.querySelector('.error__button');
  var errorMessageElement = errorPopupElement.querySelector('.error__message');

  var mainElement = document.querySelector('.main');

  window.messages = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();

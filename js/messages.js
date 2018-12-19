'use strict';

(function () {
  var KEYCODE_ESC = 27;

  var createErrorMessage = function () {
    errorButtonElement.addEventListener('click', onButtonClick);
    errorMessageElement.textContent = errorMessageElement;

    mainElement.insertAdjacentElement('afterbegin', errorMessageElement);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var createSuccessMessage = function () {
    successMessageElement.textContent = successMessageElement;

    mainElement.insertAdjacentElement('afterbegin', successMessageElement);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var closeErrorMessage = function () {
    errorPopupElement.remove();

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    errorButtonElement.removeEventListener('click', onButtonClick);
  };

  var closeSuccessMessage = function () {
    successPopupElement.remove();

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onButtonClick = function () {
    closeErrorMessage();
  };

  var onDocumentClick = function () {
    closeErrorMessage();
    closeSuccessMessage();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closeErrorMessage();
      closeSuccessMessage();
    }
  };
  var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
  var successPopupElement = templateSuccessElement.cloneNode(true);

  var successMessageElement = successPopupElement.querySelector('.success__message');

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

'use strict';

(function () {
  var KEYCODE_ESC = 27;

  var createMessageElements = function () {
    var mainElement = document.querySelector('main');
    var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
    var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

    templateSuccessElement.classList.add('hidden');
    templateErrorElement.classList.add('hidden');

    mainElement.appendChild(templateSuccessElement);
    mainElement.appendChild(templateErrorElement);
  };

  createMessageElements();

  var createPostMessage = function (message) {
    var messageElement = document.querySelector('.' + message);

    var onPostMessageClick = function () {
      window.pins.remove();
      formElement.reset();
      window.map.deactivate();
      window.mainPin.resetPosition();
      window.mainPin.activate();

      messageElement.classList.add('hidden');
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === KEYCODE_ESC) {
        onPostMessageClick();
      }
    };

    messageElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    messageElement.addEventListener('click', onPostMessageClick);
  };

  var createSuccessMessage = function () {
    createPostMessage('success');
  };

  var createErrorMessage = function () {
    createPostMessage('error');
  };

  var formElement = document.querySelector('.ad-form');

  window.messages = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();

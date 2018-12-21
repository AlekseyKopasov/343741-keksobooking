'use strict';

(function () {
  var KEYCODE_ESC = 27;

  var createPostMessage = function (messageTemplate) {
    mainElement.appendChild(messageTemplate);

    var onPostMessageClick = function () {
      messageTemplate.classList.add('hidden');
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === KEYCODE_ESC) {
        onPostMessageClick();
      }
    };

    messageTemplate.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    messageTemplate.addEventListener('click', onPostMessageClick);
  };

  var createSuccessMessage = function () {
    createPostMessage(templateSuccessElement);
    window.pins.remove();
    formElement.reset();
    window.mainPin.resetPosition();
  };

  var createErrorMessage = function () {
    createPostMessage(templateErrorElement);
  };


  var mainElement = document.querySelector('main');
  var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

  var formElement = document.querySelector('.ad-form');

  window.messages = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();

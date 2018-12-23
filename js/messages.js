'use strict';

(function () {
  var KEYCODE_ESC = 27;

  var createMessage = function (messageTemplateElement) {
    var element = messageTemplateElement.cloneNode(true);

    var closeMessage = function () {
      element.classList.add('hidden');

      mainElement.removeChild(element);

      element.removeEventListener('click', onPostMessageClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    var onPostMessageClick = function () {
      closeMessage();
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === KEYCODE_ESC) {
        closeMessage();
      }
    };

    element.classList.remove('hidden');

    mainElement.appendChild(element);

    element.addEventListener('click', onPostMessageClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var mainElement = document.querySelector('main');
  var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

  window.messages = {
    createErrorMessage: function () {
      createMessage(templateErrorElement);
    },
    createSuccessMessage: function () {
      createMessage(templateSuccessElement);
    }
  };

})();

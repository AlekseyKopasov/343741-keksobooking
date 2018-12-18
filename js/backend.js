'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var KEYCODE_ESC = 27;

  var closeErrorPopup = function () {
    errorPopupElement.remove();
  };

  // возможно надо будет вынести футкции создания попапов в другой модуль
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

  var createNewXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка. ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });
    xhr.addEventListener('timeout', function () {
      onError('Долгий ответ от сервера');
    });

    xhr.timeout = 15000;

    xhr.open(method, url);

    return xhr;
  };

  var uploadData = function (data, onLoad, onError) {
    createNewXhr('POST', URL.upload, onLoad, onError).send(data);
  };

  var loadData = function (onLoad, onError) {
    createNewXhr('GET', URL.load, onLoad, onError).send();
  };

  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var errorPopupElement = templateErrorElement.cloneNode(true);
  var errorButtonElement = errorPopupElement.querySelector('.error__button');
  var errorMessageElement = errorPopupElement.querySelector('.error__message');
  var mainElement = document.querySelector('.main');

  window.backend = {
    upload: uploadData,
    load: loadData,
    onErrorSubmit: onErrorSubmit
  };
})();

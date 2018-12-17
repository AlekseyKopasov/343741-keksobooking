'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  // eslint-disable-next-line no-unused-vars
  var onSubmitError = function (message) {
    // выводит сообщение об ошибке

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

  window.backend = {
    upload: uploadData,
    load: loadData,
    onSubmitError: onSubmitError
  };
})();

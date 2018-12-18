'use strict';

(function () {
  var STATUS_CODE_OK = 200;

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var RESPONSE_TYPE = 'json';
  var RESPONSE_TIMEOUT = 15000;

  var ERROR_REQUEST_TIMEOUT = 'Долгий ответ от сервера';
  var ERROR_CONNECTION = 'Ошибка соединения с сервером';

  var createRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка. ' + xhr.status + ' ' + xhr.statusText); // @TODO: extract error constant + шаблон реплейс
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_CONNECTION);
    });
    xhr.addEventListener('timeout', function () {
      onError(ERROR_REQUEST_TIMEOUT);
    });

    xhr.timeout = RESPONSE_TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    postOffer: function (data, onLoad, onError) {
      return createRequest(URL_UPLOAD, 'POST', onLoad, onError, data);
    },
    getOffers: function (onLoad, onError) {
      return createRequest(URL_LOAD, 'GET', onLoad, onError);
    }
  };
})();

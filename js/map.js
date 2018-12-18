'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var onLoadSuccess = function (offers) {
    window.pins.create(offers);
  };

  var onLoadError = function (error) {
    window.message.createErrorMessage(error);
  };

  window.form.deactivate();
  window.mainPin.activate();

  window.map = {
    activate: function () {
      mapElement.classList.remove('map--faded');
      window.backend.getOffers(onLoadSuccess, onLoadError);
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    }
  };
})();


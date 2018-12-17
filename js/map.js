'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var onLoadSuccess = function () {
    // eslint-disable-next-line no-console
    console.log('Load');
  };
  var onLoadError = function () {
    // eslint-disable-next-line no-console
    console.log('Error');
  };

  window.backend.load(onLoadSuccess, onLoadError);
  // window.offers.generateOffers();
  window.form.deactivate();
  window.mainPin.activate();
  window.pins.createPins();

  window.map = {
    activate: function () {
      mapElement.classList.remove('map--faded');
      mapPinsElement.appendChild(window.pins.createPins());
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    }
  };
})();

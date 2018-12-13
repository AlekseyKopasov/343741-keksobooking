'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  window.offers.generateOffers();
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

  var mapPinsElement = document.querySelector('.map__pins');

})();
/**
 * @TODO Ошибка в передаыи адреса в поле Input
 * @TODO Рефакторинг
 */

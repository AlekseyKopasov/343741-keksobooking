'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapWidth = mapElement.clientWidth;

  window.map = {
    getWidth: function () {
      return mapWidth;
    },
    activate: function () {
      mapElement.classList.remove('map--faded');
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    }
  };
})();

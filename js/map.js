'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  window.map = {
    activate: function () {
      mapElement.classList.remove('map--faded');
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    }
  };

})();

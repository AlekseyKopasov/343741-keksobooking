'use strict';

(function () {
  var MAIN_PIN_COORDS_DEFAULT = {
    x: 570,
    y: 375
  };

  var OFFER_POSITION_X_MIN = 0;
  var OFFER_POSITION_X_MAX = 1200;
  var OFFER_POSITION_Y_MIN = 130;
  var OFFER_POSITION_Y_MAX = 630;

  var onMainPinMouseUp = function () {

    window.map.activate();
    mapElement.classList.remove('map--faded');
    mapPinsElement.appendChild(window.pins.createPins());

    window.form.activate();
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var onMainPinMouseDown = function (mouseDownEvt) {
    mouseDownEvt.preventDefault();

    var startCoords = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY
    };

    var onDocumentMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shiftCoords = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var y = mainPinElement.offsetTop - shiftCoords.y;
      var x = mainPinElement.offsetLeft - shiftCoords.x;

      mainPinElement.style.top = Math.max(OFFER_POSITION_Y_MIN - pinHeigth / 2, Math.min(y, OFFER_POSITION_Y_MAX)) + 'px';
      mainPinElement.style.left = Math.max(OFFER_POSITION_X_MIN, Math.min(x, OFFER_POSITION_X_MAX - pinWidth)) + 'px';
    };

    var onDocumentMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      window.form.setAddressValue(startCoords.x + ',' + startCoords.y);

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  var mainPinElement = document.querySelector('.map__pin--main');
  var imageMainPinElement = mainPinElement.querySelector('img');
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');


  var pinWidth = imageMainPinElement.offsetWidth;
  var pinHeigth = imageMainPinElement.offsetWidth;

  window.mainPin = {
    activate: function () {
      mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
      mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    },
    getPositionX: function () {
      return mainPinElement.style.left;
    },
    getPositionY: function () {
      return mainPinElement.style.top;
    },
    resetPosition: function () {
      mainPinElement.style.top = MAIN_PIN_COORDS_DEFAULT.y + 'px';
      mainPinElement.style.left = MAIN_PIN_COORDS_DEFAULT.x + 'px';
    }
  };
})();

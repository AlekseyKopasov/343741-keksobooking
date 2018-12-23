'use strict';

(function () {
  var PIN_TAIL = 22;
  var FILTER_FIELD_HEIGHT = 44;

  var getMapSize = function () {
    var mapElement = document.querySelector('.map')
    .getBoundingClientRect();

    return {
      minX: mapElement.top,
      maxX: mapElement.width,
      minY: mapElement.left - (pinHeigth + PIN_TAIL),
      maxY: mapElement.height - (pinHeigth + PIN_TAIL + FILTER_FIELD_HEIGHT)
    };
  };

  var onMainPinMouseUp = function () {
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var createMainPinMouseDownHanlder = function (callbackMouseUp) {
    return function (mouseDownEvt) {
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

        mainPinElement.style.top = Math.max(getMapSize().minY - pinHeigth / 2, Math.min(y, getMapSize().maxY)) + 'px';
        mainPinElement.style.left = Math.max(getMapSize().minX, Math.min(x, getMapSize().maxX - pinWidth)) + 'px';
      };

      var onDocumentMouseUp = function (mouseUpEvt) {
        mouseUpEvt.preventDefault();

        callbackMouseUp(window.mainPin.getPosition());

        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
      };
      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    };
  };

  var onMainPinMouseDown;

  var mainPinElement = document.querySelector('.map__pin--main');
  var imageMainPinElement = mainPinElement.querySelector('img');

  var pinWidth = imageMainPinElement.offsetWidth;
  var pinHeigth = imageMainPinElement.offsetWidth;

  var defaultPositionX = parseInt(mainPinElement.offsetTop, 10);
  var defaultPositionY = parseInt(mainPinElement.offsetLeft, 10);

  window.mainPin = {
    activate: function (callbackMouseUp) {
      onMainPinMouseDown = createMainPinMouseDownHanlder(callbackMouseUp);
      mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
      mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    },
    deactivate: function () {
      mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
      mainPinElement.removeEventListener('mousedown', onMainPinMouseDown);
    },
    getDefaultPosition: function () {
      return defaultPositionX + ',' + defaultPositionY;
    },
    getPosition: function () {
      return parseInt(mainPinElement.style.left, 10) + ',' + parseInt(mainPinElement.style.top, 10);
    },
    resetPosition: function () {
      mainPinElement.style.top = defaultPositionX + 'px';
      mainPinElement.style.left = defaultPositionY + 'px';
    }
  };
})();

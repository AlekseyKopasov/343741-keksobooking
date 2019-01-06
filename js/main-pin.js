'use strict';

(function () {
  var onMainPinMouseUp = function () {
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var createMainPinMouseDownHandler = function (callbackMouseMove) {
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

        var PinDragLimit = {
          TOP: 130,
          BOTTOM: 630,
          LEFT: 0,
          RIGHT: 1200 - pinWidth
        };

        var y = mainPinElement.offsetTop - shiftCoords.y;
        var x = mainPinElement.offsetLeft - shiftCoords.x;

        mainPinElement.style.top = Math.max(PinDragLimit.TOP, Math.min(y, PinDragLimit.BOTTOM)) + 'px';
        mainPinElement.style.left = Math.max(PinDragLimit.LEFT, Math.min(x, PinDragLimit.RIGHT)) + 'px';
        callbackMouseMove(window.mainPin.getPosition());
      };

      var onDocumentMouseUp = function (mouseUpEvt) {
        mouseUpEvt.preventDefault();

        callbackMouseMove(window.mainPin.getPosition());

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

  var defaultPositionX = parseInt(mainPinElement.offsetTop, 10);
  var defaultPositionY = parseInt(mainPinElement.offsetLeft, 10);

  window.mainPin = {
    activate: function (callbackMouseMove) {
      onMainPinMouseDown = createMainPinMouseDownHandler(callbackMouseMove);
      mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    },
    deactivate: function () {
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

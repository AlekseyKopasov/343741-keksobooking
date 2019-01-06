'use strict';

(function () {
  var POSITION_LIMIT_TOP = 130;
  var POSITION_LIMIT_BOTTOM = 630;

  var onMainPinMouseUp = function () {
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var createMainPinMouseDownHandler = function (callbackMouseUp, callbackMouseMove) {
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

        mainPinElement.style.top = Math.max(pinCoodsLimit.top, Math.min(y, pinCoodsLimit.bottom)) + 'px';
        mainPinElement.style.left = Math.max(pinCoodsLimit.left, Math.min(x, pinCoodsLimit.right)) + 'px';

        callbackMouseMove(window.mainPin.getPosition());
      };

      var onDocumentMouseUp = function (mouseUpEvt) {
        mouseUpEvt.preventDefault();

        callbackMouseUp();

        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
      };
      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    };
  };

  var onMainPinMouseDown;

  var pinCoodsLimit;
  var mainPinElement = document.querySelector('.map__pin--main');
  var imageMainPinElement = mainPinElement.querySelector('img');
  var pinWidth = imageMainPinElement.offsetWidth;

  var defaultPositionX = parseInt(mainPinElement.offsetTop, 10);
  var defaultPositionY = parseInt(mainPinElement.offsetLeft, 10);

  window.mainPin = {
    activate: function (mapWidth, callbackMouseUp, callbackMouseMove) {
      pinCoodsLimit = {
        top: POSITION_LIMIT_TOP,
        bottom: POSITION_LIMIT_BOTTOM,
        left: 0,
        rigth: mapWidth - pinWidth
      };
      onMainPinMouseDown = createMainPinMouseDownHandler(callbackMouseUp, callbackMouseMove);
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

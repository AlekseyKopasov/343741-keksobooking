'use strict';

(function () {

  var getMapSize = function () {
    var mapElement = document.querySelector('.map')
    .getBoundingClientRect();
    var PIN_TAIL = 22;
    var FILTER_FIELD_HEIGHT = 44;

    return {
      minX: mapElement.top,
      maxX: mapElement.width,
      minY: mapElement.left - (pinHeigth + PIN_TAIL),
      maxY: mapElement.height - (pinHeigth + PIN_TAIL + FILTER_FIELD_HEIGHT)
    };
  };

  var onMainPinMouseUp = function () {
    window.map.activate();
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

      mainPinElement.style.top = Math.max(getMapSize().minY - pinHeigth / 2, Math.min(y, getMapSize().maxY)) + 'px';
      mainPinElement.style.left = Math.max(getMapSize().minX, Math.min(x, getMapSize().maxX - pinWidth)) + 'px';
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

  var pinWidth = imageMainPinElement.offsetWidth;
  var pinHeigth = imageMainPinElement.offsetWidth;

  var defaultPositionX = parseInt(mainPinElement.offsetTop, 10);
  var defaultPositionY = parseInt(mainPinElement.offsetLeft, 10);

  window.mainPin = {
    activate: function () {
      mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
      mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    },
    getDefaultPositionX: function () {
      return defaultPositionX;
    },
    getDefaultPositionY: function () {
      return defaultPositionY;
    },
    getPositionX: function () {
      return mainPinElement.style.left;
    },
    getPositionY: function () {
      return mainPinElement.style.top;
    },
    resetPosition: function () {
      mainPinElement.style.top = defaultPositionX + 'px';
      mainPinElement.style.left = defaultPositionY + 'px';
    }
  };
})();

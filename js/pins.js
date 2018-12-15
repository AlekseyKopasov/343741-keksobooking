'use strict';

(function () {
  var createPinElement = function (offer) {
    var element = templatePinElement.cloneNode(true);

    element.style.left = offer.location.x + 'px';
    element.style.top = offer.location.y + 'px';
    element.querySelector('img').src = offer.author.avatar;
    element.querySelector('img').alt = offer.title;

    return element;
  };

  var createPins = function () {
    var fragment = document.createDocumentFragment();

    window.offers.generateOffers().forEach(function (offer, index) {
      var element = createPinElement(offer);
      var clickHandler = createPinClickHandler(offer);

      mapPinsClickHandlers[index] = clickHandler;

      element.addEventListener('click', clickHandler);

      fragment.appendChild(element);
    });

    return fragment;
  };

  var removePins = function () {
    var pinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    Array.prototype.forEach.call(pinsElements, function (pinElement, index) {
      pinElement.removeEventListener('click', mapPinsClickHandlers[index]);
      pinElement.remove();
    });

    mapPinsClickHandlers = {};
  };

  var createPinClickHandler = function (offer) {
    return function () {
      window.popup.openPopup(offer);
    };
  };

  var mapPinsClickHandlers = {};
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    createPins: createPins,
    removePins: removePins
  };
})();

'use strict';

(function () {
  var OFFERS_SHOW_LIMIT = 5;

  var createPinElement = function (offer) {
    var element = templatePinElement.cloneNode(true);

    element.style.left = offer.location.x + 'px';
    element.style.top = offer.location.y + 'px';
    element.querySelector('img').src = offer.author.avatar;
    element.querySelector('img').alt = offer.title;

    return element;
  };

  var pinElements = [];

  var createPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers
      .slice(0, OFFERS_SHOW_LIMIT) // @ TODO копировать 5 рандомных объектов?
      .forEach(function (offer) {
        var element = createPinElement(offer);

        pinElements.push(element);

        element.addEventListener('click', function () {
          window.popup.create(offer);
        });
        fragment.appendChild(element);
      });

    mapPinsElement.appendChild(fragment);
  };

  var removePins = function () {
    pinElements.forEach(function (pinElement) {
      pinElement.remove();
    });
    pinElements = [];
  };

  var mapPinsElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    create: createPins,
    remove: removePins
  };
})();

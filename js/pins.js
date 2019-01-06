'use strict';

(function () {
  var OFFERS_SHOW_LIMIT = 5;

  var createElement = function (offer) {
    var element = templatePinElement.cloneNode(true);

    element.style.left = offer.location.x + 'px';
    element.style.top = offer.location.y + 'px';
    element.querySelector('img').src = offer.author.avatar;
    element.querySelector('img').alt = offer.title;

    return element;
  };

  var pinElements = [];
  var activePinElement;

  var create = function (offers) {
    var fragment = document.createDocumentFragment();

    offers
      .slice(0, OFFERS_SHOW_LIMIT)
      .forEach(function (offer) {
        var element = createElement(offer);

        pinElements.push(element);

        element.addEventListener('click', function () {
          if (activePinElement) {
            activePinElement.classList.remove('.map__pin--active');
          }
          element.classList.add('.map__pin--active');
          activePinElement = element;
          window.popup.open(offer);
        });
        fragment.appendChild(element);
      });

    mapPinsElement.appendChild(fragment);
  };

  var remove = function () {
    activePinElement = null;
    pinElements.forEach(function (pinElement) {
      pinElement.remove();
    });
    pinElements = [];
  };

  var mapPinsElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    create: create,
    remove: remove
  };
})();

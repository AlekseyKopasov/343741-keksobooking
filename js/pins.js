'use strict';

(function () {

  var TEMPLATE_PRICE = '{price} ₽/ночь';
  var TEMPLATE_TIME = 'Заезд после {checkin}, выезд до {checkout}';
  var TEPMLATE_CAPACITY = '{rooms} {translationRooms} для {guests} {translationGuests}';

  var translateRooms = function (rooms) {
    if (rooms === 1) {
      return 'комната';
    }

    if (rooms === 5) {
      return 'комнат';
    }

    return 'комнаты';
  };

  var translateGuests = function (guestsNumber) {
    return guestsNumber === 1 ? 'гостя' : 'гостей';
  };

  var createPriceTranslation = function (price) {
    return TEMPLATE_PRICE.replace('{price}', price);
  };

  var createCapacityTranslation = function (rooms, guests) {
    return TEPMLATE_CAPACITY
      .replace('{rooms}', rooms)
      .replace('{translationRooms}', translateRooms(rooms))
      .replace('{guests}', guests)
      .replace('{translationGuests}', translateGuests(guests));
  };

  var createTimeTranslation = function (checkin, checkout) {
    return TEMPLATE_TIME
      .replace('{checkin}', checkin)
      .replace('{checkout}', checkout);
  };

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

    window.offers.generateOffers().forEach(function (offer, index) { // @TODO
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
      var currentPopupElement = document.querySelector('.map__card');

      if (currentPopupElement) {
        currentPopupElement.remove();
      }

      var popupElement = window.popup.createPopupElement(offer);
      var popupCloseElement = popupElement.querySelector('.popup__close');

      popupCloseElement.setAttribute('tabIndex', '0');
      popupCloseElement.addEventListener('click', window.popup.onPopupCloseClick);

      mapElement.insertBefore(popupElement, mapFiltersElement);

      document.addEventListener('keydown', window.popup.onDocumentEscKeydown);
    };
  };

  var mapPinsClickHandlers = {};
  var mapFiltersElement = document.querySelector('.map__filters-container');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');

  window.pins = {
    createPins: createPins,
    createPriceTranslation: createPriceTranslation,
    createCapacityTranslation: createCapacityTranslation,
    createTimeTranslation: createTimeTranslation,
    removePins: removePins
  };
})();

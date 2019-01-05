'use strict';

(function () {
  var TypesTranslationMap = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var TranslateLimitCase = {
    NOMINATIVE: 1,
    GENITIVE: 5
  };

  var RoomsTranslateMap = {
    NOMINATIVE: 'комната',
    GENITIVE: 'комнат',
    PLURAL: 'комнаты'
  };

  var GuestsTranslateMap = {
    GENITIVE: 'гостя',
    PLURAL: 'гостей'
  };

  var POPUP_PHOTO_WIDTH = 45;
  var POPUP_PHOTO_HEIGHT = 40;

  var KEYCODE_ESC = 27;
  var TEMPLATE_PRICE = '{price} ₽/ночь';
  var TEMPLATE_TIME = 'Заезд после {checkin}, выезд до {checkout}';
  var TEPMLATE_CAPACITY = '{rooms} {translationRooms} для {guests} {translationGuests}';

  var translateRooms = function (rooms) {
    if (rooms === TranslateLimitCase.NOMINATIVE) {
      return RoomsTranslateMap.NOMINATIVE;
    }
    if (rooms === TranslateLimitCase.GENITIVE) {
      return RoomsTranslateMap.GENITIVE;
    }
    return RoomsTranslateMap.PLURAL;
  };

  var translateGuests = function (guestsNumber) {
    return guestsNumber === TranslateLimitCase.NOMINATIVE ? GuestsTranslateMap.GENITIVE : GuestsTranslateMap.PLURAL;
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

  var createOfferCapacity = function (rooms, guests) {
    if (rooms > 0 || guests > 0) {
      return createCapacityTranslation(rooms, guests);
    }
    return '';
  };

  var createTimeTranslation = function (checkin, checkout) {
    return TEMPLATE_TIME
      .replace('{checkin}', checkin)
      .replace('{checkout}', checkout);
  };

  var createFeaturesFragment = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(element);
    });

    return fragment;
  };

  var createPhotosFragment = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      var element = document.createElement('img');

      element.className = 'popup__photo';
      element.src = photo;
      element.width = POPUP_PHOTO_WIDTH;
      element.height = POPUP_PHOTO_HEIGHT;

      fragment.appendChild(element);
    });

    return fragment;
  };

  var createElement = function (data) {
    var offer = data.offer;
    var popupElement = templatePopupElement.cloneNode(true);
    var popupPhotosElement = popupElement.querySelector('.popup__photos');
    var popupFeaturesElement = popupElement.querySelector('.popup__features');

    popupElement.querySelector('.popup__title').textContent = offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.address;
    popupElement.querySelector('.popup__avatar').src = data.author.avatar;
    popupElement.querySelector('.popup__description').textContent = offer.description;
    popupElement.querySelector('.popup__text--price').textContent = createPriceTranslation(offer.price);
    popupElement.querySelector('.popup__text--time').textContent = createTimeTranslation(offer.checkin, offer.checkout);
    popupElement.querySelector('.popup__text--capacity').textContent = createOfferCapacity(offer.rooms, offer.guests);
    popupElement.querySelector('.popup__type').textContent = TypesTranslationMap[offer.type];

    popupPhotosElement.innerHTML = '';
    popupFeaturesElement.innerHTML = '';

    popupPhotosElement.appendChild(createPhotosFragment(offer.photos));
    popupFeaturesElement.appendChild(createFeaturesFragment(offer.features));

    return popupElement;
  };

  var close = function () {
    var currentPopupElement = document.querySelector('.map__card');
    if (currentPopupElement) {
      currentPopupElement.removeEventListener('click', onPopupCloseClick);
      currentPopupElement.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  var open = function (offer) {
    var currentPopupElement = document.querySelector('.map__card');

    if (currentPopupElement) {
      currentPopupElement.remove();
    }

    var popupElement = createElement(offer);
    var popupCloseElement = popupElement.querySelector('.popup__close');

    popupCloseElement.setAttribute('tabIndex', '0');
    popupCloseElement.addEventListener('click', onPopupCloseClick);

    mapElement.insertBefore(popupElement, mapFiltersElement);

    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  var onPopupCloseClick = function () {
    close();
  };

  var onDocumentEscKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      close();
    }
  };

  var templatePopupElement = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersElement = document.querySelector('.map__filters-container');
  var mapElement = document.querySelector('.map');

  window.popup = {
    open: open,
    close: close
  };
})();

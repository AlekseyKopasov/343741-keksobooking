'use strict';
(function () {
  var TYPES_TRANSLATION_MAP = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var POPUP_PHOTO_WIDTH = 45;
  var POPUP_PHOTO_HEIGHT = 40;

  var KEYCODE_ESC = 27;

  var createPopupFeaturesFragment = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(element);
    });

    return fragment;
  };

  var createPopupPhotosFragment = function (photos) {
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

  var createPopupElement = function (data) {
    var offer = data.offer;
    var popupElement = templatePopupElement.cloneNode(true);
    var popupPhotosElement = popupElement.querySelector('.popup__photos');
    var popupFeaturesElement = popupElement.querySelector('.popup__features');

    popupElement.querySelector('.popup__title').textContent = offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.address;
    popupElement.querySelector('.popup__avatar').src = data.author.avatar;
    popupElement.querySelector('.popup__description').textContent = offer.description;
    popupElement.querySelector('.popup__text--price').textContent = window.pins.createPriceTranslation(offer.price);
    popupElement.querySelector('.popup__text--time').textContent = window.pins.createTimeTranslation(offer.checkin, offer.checkout);
    popupElement.querySelector('.popup__text--capacity').textContent = window.pins.createCapacityTranslation(offer.rooms, offer.guests);
    popupElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION_MAP[offer.type];

    popupPhotosElement.innerHTML = '';
    popupFeaturesElement.innerHTML = '';

    popupPhotosElement.appendChild(createPopupPhotosFragment(offer.photos));
    popupFeaturesElement.appendChild(createPopupFeaturesFragment(offer.features));

    return popupElement;
  };

  var closePopup = function () {
    var currentPopupElement = document.querySelector('.map__card');
    if (currentPopupElement) {
      currentPopupElement.removeEventListener('click', onPopupCloseClick);
      currentPopupElement.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  var onPopupCloseClick = function () {
    closePopup();
  };

  var onDocumentEscKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closePopup();
    }
  };

  var templatePopupElement = document.querySelector('#card').content.querySelector('.map__card');

  window.popup = {
    closePopup: closePopup,
    createPopupElement: createPopupElement,
    onPopupCloseClick: onPopupCloseClick,
    onDocumentEscKeydown: onDocumentEscKeydown
  };
})();

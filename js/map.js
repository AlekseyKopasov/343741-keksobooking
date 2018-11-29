'use strict';

var OFFER_TITLE = [
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
  'Большая уютная квартира'
];

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OFFER_QUANTITY = 8;

var TYPES_TRANSLATION_MAP = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TEMPLATE_AVATAR_URL = 'img/avatars/user0{index}.png';
var TEMPLATE_PRICE = '{price} ₽/ночь';
var TEMPLATE_TIME = 'Заезд после {checkin}, выезд до {checkout}';
var TEPMLATE_CAPACITY = '{rooms} {translationRooms} для {guests} {translationGuests}';

var LIMIT_PRICE_MIN = 1000;
var LIMIT_PRICE_MAX = 1000000;
var LIMIT_GUESTS_MIN = 1;
var LIMIT_GUESTS_MAX = 5;
var LIMIT_ROOMS_MIN = 1;
var LIMIT_ROOMS_MAX = 5;

var OFFER_POSITION_X_MIN = 0;
var OFFER_POSITION_X_MAX = 1200;
var OFFER_POSITION_Y_MIN = 130;
var OFFER_POSITION_Y_MAX = 630;

var POPUP_PHOTO_WIDTH = 45;
var POPUP_PHOTO_HEIGHT = 40;

var shuffleArray = function (originalArray) {
  var j;
  var temp;
  var resultArray = originalArray.slice();

  for (var i = resultArray.length - 1; i > 0; i--) {
    j = generateRandomNumber(0, resultArray.length - 1);
    temp = resultArray[i];
    resultArray[i] = resultArray[j];
    resultArray[j] = temp;
  }

  return resultArray;
};

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var generateRandomItem = function (array) {
  return array[generateRandomNumber(0, array.length - 1)];
};

var generateRandomFeatures = function () {
  var copiedFeatures = OFFER_FEATURES.slice();
  var resultFeatures = [];
  var randomFeaturesIndex;
  var featuresLimit = generateRandomNumber(0, copiedFeatures.length - 1);

  for (var i = 0; i < featuresLimit; i++) {
    randomFeaturesIndex = generateRandomNumber(0, copiedFeatures.length - 1);
    resultFeatures.push(copiedFeatures[randomFeaturesIndex]);
    copiedFeatures.splice(randomFeaturesIndex, 1);
  }

  return resultFeatures;
};

var generateRandomPhotos = function () {
  var photos = [];

  OFFER_PHOTOS.forEach(function (photo) {
    photos.push(photo);
  });

  return shuffleArray(photos);
};

var generateOffers = function () {
  var offers = [];
  var x;
  var y;

  for (var i = 0; i < OFFER_QUANTITY; i++) {
    x = generateRandomNumber(OFFER_POSITION_X_MIN, OFFER_POSITION_X_MAX);
    y = generateRandomNumber(OFFER_POSITION_Y_MIN, OFFER_POSITION_Y_MAX);
    offers.push({
      author: {
        avatar: TEMPLATE_AVATAR_URL.replace('{index}', i + 1),
      },
      offer: {
        title: generateRandomItem(OFFER_TITLE),
        address: x + ', ' + y,
        price: generateRandomNumber(LIMIT_PRICE_MIN, LIMIT_PRICE_MAX),
        type: generateRandomItem(OFFER_TYPE),
        rooms: generateRandomNumber(LIMIT_ROOMS_MIN, LIMIT_ROOMS_MAX),
        guests: generateRandomNumber(LIMIT_GUESTS_MIN, LIMIT_GUESTS_MAX),
        checkin: generateRandomItem(OFFER_CHECK),
        checkout: generateRandomItem(OFFER_CHECK),
        features: generateRandomFeatures(OFFER_FEATURES),
        description: '',
        photos: generateRandomPhotos(OFFER_PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    });
  }

  return offers;
};


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

var renderPin = function (templateElement, offer) {
  var element = templateElement.cloneNode(true);

  element.style.left = offer.location.x + 'px';
  element.style.top = offer.location.y + 'px';
  element.querySelector('img').src = offer.author.avatar;
  element.querySelector('img').alt = offer.title;

  return element;
};

var renderPins = function (templateElement, offers) {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    fragment.appendChild(renderPin(templateElement, offer));
  });

  return fragment;
};

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

var renderPopup = function (templateElement, data) {
  var offer = data.offer;
  var popupElement = templateElement.cloneNode(true);
  var popupPhotosElement = popupElement.querySelector('.popup__photos');
  var popupFeaturesElement = popupElement.querySelector('.popup__features');

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__avatar').src = data.author.avatar;
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__text--price').textContent = createPriceTranslation(offer.price);
  popupElement.querySelector('.popup__text--time').textContent = createTimeTranslation(offer.checkin, offer.checkout);
  popupElement.querySelector('.popup__text--capacity').textContent = createCapacityTranslation(offer.rooms, offer.guests);
  popupElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION_MAP[offer.type];

  popupPhotosElement.innerHTML = '';
  popupFeaturesElement.innerHTML = '';

  popupPhotosElement.appendChild(createPopupPhotosFragment(offer.photos));
  popupFeaturesElement.appendChild(createPopupFeaturesFragment(offer.features));

  return popupElement;
};

var mapElement = document.querySelector('.map');
var pinListElement = document.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mapFiltersElement = document.querySelector('.map__filters-container');
var mapCardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var offers = generateOffers();
var pinsFragment = renderPins(pinTemplateElement, offers);
var popupElement = renderPopup(mapCardTemplateElement, offers[0]);

mapElement.classList.remove('map--faded');

pinListElement.appendChild(pinsFragment);
mapElement.insertBefore(popupElement, mapFiltersElement);

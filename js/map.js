
'use strict';

var AD_TITLE = [
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
  'Большая уютная квартира'
];
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK = ['12:00', '13:00', '14:00'];
var AD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var AD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var AD_QUANTITY = 8;
var AD_OFFER = [];

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var pinListElement = document.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mapFiltersElement = document.querySelector('.map__filters-container');
var mapCardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');


// генератор случайных чисел
var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);

  return randomNumber;
};

// генератор случайных значений
var generateRandomIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// генератор для перемешивания массива
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// генератор предложений
var generateRandomFeatures = function () {
  var copyFeaturesArray = AD_FEATURES.slice();
  var result = [];
  var randomFeaturesIndex;

  for (var i = 0; i < copyFeaturesArray.length; i++) {
    randomFeaturesIndex = generateRandomNumber(0, copyFeaturesArray.length - 1);
    result.push(copyFeaturesArray[randomFeaturesIndex]);
    copyFeaturesArray = copyFeaturesArray.splice(randomFeaturesIndex, 1);
  }
  return result;
};

// генератор изображений в случайном порядке
var generateRandomPhotos = function () {
  var adPhotos = [];
  for (var i = 0; i < AD_PHOTOS.length; i++) {
    adPhotos.push(AD_PHOTOS[i]);
  }
  shuffle(adPhotos);
  return adPhotos;
};

// правильное склонение
var getRooms = function (roomsNumber) {
  var roomsText = '';
  // функция для комнат от 1 до 5
  if (roomsNumber === 1) {
    roomsText = 'комната';
  } else if (roomsNumber === 5) {
    roomsText = 'комнат';
  } else {
    roomsText = 'комнаты';
  }

  return roomsText;
};

var getGuests = function (guestsNumber) {
  var guestsText = '';

  if (guestsNumber === 1) {
    guestsText = 'гостя';
  } else {
    guestsText = 'гостей';
  }

  return guestsText;
};

var getType = function (typeOfHousing) {
  var type = '';

  if (typeOfHousing === 'flat') {
    type = 'Квартира';
  } else if (type === 'palace') {
    type = 'Дворец';
  } else if (type === 'house') {
    type = 'Дом';
  } else if (type === 'bungalo') {
    type = 'Бунгало';
  }
  return type;
};

var generateOffer = function () {
  for (var i = 0; i < AD_QUANTITY; i++) {
    AD_OFFER.push({
      'author': {
        'avatar': 'img/avatars/user0' + [i + 1] + '.png'
      },
      'offer': {
        'title': generateRandomIndex(AD_TITLE),
        'address': '',
        'price': generateRandomNumber(1000, 1000000),
        'type': generateRandomIndex(AD_TYPE),
        'rooms': generateRandomNumber(1, 5),
        'guests': generateRandomNumber(1, 5),
        'checkin': generateRandomIndex(AD_CHECK),
        'checkout': generateRandomIndex(AD_CHECK),
        'features': generateRandomFeatures(AD_FEATURES),
        'description': '',
        'photos': generateRandomPhotos(AD_PHOTOS)
      },
      'location': {
        'x': generateRandomNumber(750, 1200), // добавить смещение по х для метки
        'y': generateRandomNumber(130, 630),
      }
    });
  }
};

var getLocatiion = function (pin) {
  var location = pin.location.x.toString() + ', ' + pin.location.y.toString();
  pin.offer.address = location;
};

var renderPin = function (pin) {
  var pinItem = pinTemplateElement.cloneNode(true);

  getLocatiion(pin);
  pinItem.style.left = pin.location.x + 'px';
  pinItem.style.top = pin.location.y + 'px';
  pinItem.querySelector('img').src = pin.author.avatar;
  pinItem.querySelector('img').src = pin.offer.title;

  return pinItem;
};

var renderOffer = function (offerObj) {
  var offerData = mapCardTemplateElement.cloneNode(true);

  offerData.querySelector('.popup__title').textContent = offerObj.offer.title;
  offerData.querySelector('.popup__text--address').textContent = offerObj.offer.address;
  offerData.querySelector('.popup__text--price').textContent = offerObj.offer.price + '₽/ночь';
  offerData.querySelector('.popup__type').textContent = getType(offerObj.offer.type);
  offerData.querySelector('.popup__text--capacity').textContent = offerObj.offer.rooms + ' ' + getRooms(offerObj.offer.rooms) + ' для ' + offerObj.offer.guests + ' ' + getGuests(offerObj.offer.guests);
  offerData.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObj.offer.checkin + ', выезд до ' + offerObj.offer.checkout;
  offerData.querySelector('.popup__features').textContent = offerObj.offer.features;
  offerData.querySelector('.popup__description').textContent = offerObj.offer.description;
  offerData.querySelector('.popup__photos').textContent = offerObj.offer.photos;
  offerData.querySelector('.popup__avatar').src = offerObj.author.avatar;
};


generateOffer();

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AD_QUANTITY; i++) {
    fragment.appendChild(renderPin(AD_OFFER[i]));
    pinListElement.appendChild(fragment);
  }
};
renderPins();

var renderOfferPopup = function () {
  var offerPopup = document.createDocumentFragment();

  offerPopup.appendChild(renderOffer(AD_OFFER));
  mapElement.insertBefore(offerPopup, mapFiltersElement);
};

renderOfferPopup();

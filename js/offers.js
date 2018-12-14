'use strict';

(function () {

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

  var TEMPLATE_AVATAR_URL = 'img/avatars/user0{index}.png';

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

  window.offers = {
    generateOffers: generateOffers
  };
})();

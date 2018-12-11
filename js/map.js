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

var KEYCODE_ESC = 27;

var GUESTS_IN_ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var TYPE_MIN_PRICE = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var ERROR_FORM_MESSAGE = 'Количество гостей больше допустимого';

var MAIN_PIN_COORDS_DEFAULT = {
  x: 570,
  y: 375
};

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

  offers.forEach(function (offer) {
    var element = createPinElement(offer);
    var clickHandler = createPinClickHandler(offer);

    element.addEventListener('click', clickHandler);

    fragment.appendChild(element);
  });

  return fragment;
};

var removePins = function () {
  var allSimplePinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  Array.prototype.forEach.call(allSimplePinsElements, function (pin) {
    pin.remove();
  });
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

var createPopupElement = function (data) {
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
  popupElement.querySelector('.popup__text--capacity').textContent = createCapacityTranslation(offer.rooms, offer.guests);
  popupElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION_MAP[offer.type];

  popupPhotosElement.innerHTML = '';
  popupFeaturesElement.innerHTML = '';

  popupPhotosElement.appendChild(createPopupPhotosFragment(offer.photos));
  popupFeaturesElement.appendChild(createPopupFeaturesFragment(offer.features));

  return popupElement;
};

var disableElements = function (elements) {
  Array.prototype.forEach.call(elements, function (element) {
    element.setAttribute('disabled', '');
  });
};

var enableElements = function (elements) {
  Array.prototype.forEach.call(elements, function (element) {
    element.removeAttribute('disabled');
  });
};

var closePopup = function () {
  var currentPopupElement = document.querySelector('.map__card');
  if (currentPopupElement) {
    currentPopupElement.removeEventListener('click', onPopupCloseClick);
    currentPopupElement.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

var createPinClickHandler = function (offer) {
  return function () {
    var currentPopupElement = document.querySelector('.map__card');

    if (currentPopupElement) {
      currentPopupElement.remove();
    }

    var popupElement = createPopupElement(offer);
    var popupCloseElement = popupElement.querySelector('.popup__close');

    popupCloseElement.setAttribute('tabIndex', '0');
    popupCloseElement.addEventListener('click', onPopupCloseClick);

    mapElement.insertBefore(popupElement, mapFiltersElement);

    document.addEventListener('keydown', onDocumentEscKeydown);
  };
};

var setOptionsCapacity = function (rooms, selectElement) {
  var selectOptionElements = selectElement.querySelectorAll('option');
  disableElements(selectOptionElements);

  GUESTS_IN_ROOMS[rooms].forEach(function (room) {
    selectElement.querySelector('option' + '[value="' + room + '"]').removeAttribute('disabled');
    selectElement.value = room;
  });
};

var checkGuestsInRooms = function () {
  var currentNumberRooms = GUESTS_IN_ROOMS[selectRoomElement.value];
  var capacityValue = parseInt(selectCapacityElement.value, 10);
  var warningMessage = currentNumberRooms.indexOf(capacityValue === -1) ? '' : ERROR_FORM_MESSAGE;

  selectCapacityElement.setCustomValidity(warningMessage);
};

var onPopupCloseClick = function () {
  closePopup();
};

var onDocumentEscKeydown = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closePopup();
  }
};

var onRoomSelectChange = function (evt) {
  evt.target.setCustomValidity('');
  setOptionsCapacity(selectRoomElement.value, selectCapacityElement);
};

var onCapacitySelectChange = function (evt) {
  evt.target.setCustomValidity('');
};

var onFormSubmitClick = function () {
  checkGuestsInRooms();
  Array.prototype.forEach.call(formInputElements, function (element) {
    element.style.boxShadow = !element.checkValidity() ? '0 0 3px 3px red' : '';
  });
  deactivateForm();
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

    var pinWidth = imageMainPinElement.offsetWidth;
    var pinHeigth = imageMainPinElement.offsetWidth;

    var y = buttonMainPinElement.offsetTop - shiftCoords.y;
    var x = buttonMainPinElement.offsetLeft - shiftCoords.x;

    buttonMainPinElement.style.top = Math.max((OFFER_POSITION_Y_MIN - pinHeigth / 2), Math.min(y, OFFER_POSITION_Y_MAX)) + 'px';
    buttonMainPinElement.style.left = Math.max(OFFER_POSITION_X_MIN, Math.min(x, OFFER_POSITION_X_MAX - pinWidth)) + 'px';
  };

  var onMainPinMouseUp = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();
    inputAddressElement.setAttribute('value', startCoords.x + ',' + startCoords.y);
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('mouseup', onMainPinMouseUp);
};

var onMainPinMouseUp = function () {
  buttonMainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');

  mapPinsElement.appendChild(createPins());

  enableElements(formFieldsetElements);
  enableElements(formSelectElements);
};

var onChekinChange = function (evt) {
  inputCheckoutElement.value = evt.target.value;
};

var onCheckoutChange = function (evt) {
  inputCheckinElement.value = evt.target.value;
};

var onTypeMatchesPriceChange = function (evt) {
  var minPrice = TYPE_MIN_PRICE[evt.target.value];
  inputPriceElement.min = minPrice;
  inputPriceElement.placeholder = minPrice.toString();
};

var onResetFormClick = function (evt) {
  evt.preventDefault();
  formElement.reset();
  closePopup();
  removePins();

  buttonMainPinElement.style.top = MAIN_PIN_COORDS_DEFAULT.y + 'px';
  buttonMainPinElement.style.left = MAIN_PIN_COORDS_DEFAULT.x + 'px';

  inputAddressElement.setAttribute('value', buttonMainPinElement.offsetTop + ',' + buttonMainPinElement.offsetLeft);
};

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var mapFiltersElement = document.querySelector('.map__filters-container');

var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var templatePopupElement = document.querySelector('#card').content.querySelector('.map__card');

var formElement = document.querySelector('.ad-form');
var formFieldsetElements = formElement.querySelectorAll('fieldset');
var formSelectElements = mapFiltersElement.querySelectorAll('select');
var formInputElements = formElement.querySelectorAll('input');

var inputBuildingElement = formElement.querySelector('#type');
var inputPriceElement = formElement.querySelector('#price');
var inputCheckinElement = formElement.querySelector('#timein');
var inputCheckoutElement = formElement.querySelector('#timeout');
var inputAddressElement = formElement.querySelector('#address');
var selectCapacityElement = formElement.querySelector('#capacity');
var selectRoomElement = formElement.querySelector('#room_number');

var buttonSubmitElement = formElement.querySelector('.ad-form__submit');
var buttonResetElement = formElement.querySelector('.ad-form__reset');
var buttonMainPinElement = document.querySelector('.map__pin--main');

var imageMainPinElement = buttonMainPinElement.querySelector('img');

var offers = generateOffers();

disableElements(formFieldsetElements);
disableElements(formSelectElements);

var deactivateForm = function () {
  buttonMainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  buttonMainPinElement.removeEventListener('mousedown', onMainPinMouseDown);

  inputCheckinElement.removeEventListener('change', onChekinChange);
  inputCheckoutElement.removeEventListener('change', onCheckoutChange);
  inputBuildingElement.removeEventListener('change', onTypeMatchesPriceChange);
  selectRoomElement.removeEventListener('change', onRoomSelectChange);
  selectCapacityElement.removeEventListener('change', onCapacitySelectChange);
  buttonSubmitElement.removeEventListener('click', onFormSubmitClick);

  buttonResetElement.removeEventListener('click', onResetFormClick);
};

var activateForm = function () {
  buttonMainPinElement.addEventListener('mouseup', onMainPinMouseUp);
  buttonMainPinElement.addEventListener('mousedown', onMainPinMouseDown);

  inputCheckinElement.addEventListener('change', onChekinChange);
  inputCheckoutElement.addEventListener('change', onCheckoutChange);
  inputBuildingElement.addEventListener('change', onTypeMatchesPriceChange);
  selectRoomElement.addEventListener('change', onRoomSelectChange);
  selectCapacityElement.addEventListener('change', onCapacitySelectChange);
  buttonSubmitElement.addEventListener('click', onFormSubmitClick);

  buttonResetElement.addEventListener('click', onResetFormClick);
};

activateForm();

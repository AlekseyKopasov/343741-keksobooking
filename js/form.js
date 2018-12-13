'use strict';


(function () {
  var ERROR_FORM_MESSAGE = 'Количество гостей больше допустимого';

  var TYPE_MIN_PRICE = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var VALIDATION_CAPACITY = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var formInputElements = formElement.querySelectorAll('input');

  var inputTitleElement = formElement.querySelector('#title');
  var inputBuildingElement = formElement.querySelector('#type');
  var inputPriceElement = formElement.querySelector('#price');
  var inputCheckinElement = formElement.querySelector('#timein');
  var inputCheckoutElement = formElement.querySelector('#timeout');
  var inputAddressElement = formElement.querySelector('#address');
  var selectCapacityElement = formElement.querySelector('#capacity');
  var selectRoomElement = formElement.querySelector('#room_number');

  var buttonSubmitElement = formElement.querySelector('.ad-form__submit');
  var buttonResetElement = formElement.querySelector('.ad-form__reset');


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

  var onTextFieldInvalid = function () {
    if (inputTitleElement.validity.tooShort) {
      inputTitleElement.setCustomValidity('');
    } else if (inputTitleElement.validity.valueMissing) {
      inputTitleElement.setCustomValidity('');
    }
  };

  var onResetFormClick = function (evt) {
    evt.preventDefault();
    formElement.reset();

    window.popup.closePopup();
    window.pins.removePins();

    window.mainPin.resetPosition();
    inputAddressElement.setAttribute('value', window.mainPin.getPositionX() + ',' + window.mainPin.getPositionY());
  };

  var onRoomSelectChange = function (evt) {
    var roomsValue = evt.target.value;
    var optionElements = selectCapacityElement.querySelectorAll('option');

    evt.target.setCustomValidity('');

    Array.prototype.forEach.call(optionElements, function (optionElement) {
      if (VALIDATION_CAPACITY[roomsValue].indexOf(optionElement.value) === -1) {
        optionElement.setAttribute('disabled', 'disabled');
      } else {
        optionElement.removeAttribute('disabled');
      }
    });
  };

  var checkGuestsInRooms = function () {
    var currentNumberRooms = VALIDATION_CAPACITY[selectRoomElement.value];
    var capacityValue = parseInt(selectCapacityElement.value, 10);
    var warningMessage = currentNumberRooms.indexOf(capacityValue === -1) ? '' : ERROR_FORM_MESSAGE;

    selectCapacityElement.setCustomValidity(warningMessage);
  };

  var onCapacitySelectChange = function (evt) {
    evt.target.setCustomValidity('');
  };

  var onFormSubmitClick = function () {
    checkGuestsInRooms();
    Array.prototype.forEach.call(formInputElements, function (element) {
      element.style.boxShadow = !element.checkValidity() ? '0 0 3px 3px red' : '';
    });
  };

  disableElements(formFieldsetElements);

  window.form = {
    activate: function () {
      formElement.classList.remove('ad-form--disabled');

      enableElements(formFieldsetElements);

      inputCheckinElement.addEventListener('change', onChekinChange);
      inputCheckoutElement.addEventListener('change', onCheckoutChange);
      inputBuildingElement.addEventListener('change', onTypeMatchesPriceChange);
      inputTitleElement.addEventListener('invalid', onTextFieldInvalid);
      selectRoomElement.addEventListener('change', onRoomSelectChange);
      selectCapacityElement.addEventListener('change', onCapacitySelectChange);
      buttonSubmitElement.addEventListener('click', onFormSubmitClick);
      buttonResetElement.addEventListener('click', onResetFormClick);
    },
    deactivate: function () {
      disableElements(formFieldsetElements);

      inputCheckinElement.removeEventListener('change', onChekinChange);
      inputCheckoutElement.removeEventListener('change', onCheckoutChange);
      inputBuildingElement.removeEventListener('change', onTypeMatchesPriceChange);
      inputTitleElement.addEventListener('invalid', onTextFieldInvalid);
      selectRoomElement.removeEventListener('change', onRoomSelectChange);
      selectCapacityElement.removeEventListener('change', onCapacitySelectChange);
      buttonSubmitElement.removeEventListener('click', onFormSubmitClick);
      buttonResetElement.removeEventListener('click', onResetFormClick);
    },
    setAddressValue: function (x, y) {
      inputAddressElement.setAttribute('value', x + ',' + y);
    }
  };
})();

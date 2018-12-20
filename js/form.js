'use strict';

(function () {
  var ERROR_FORM_MESSAGE = 'Количество гостей больше допустимого';
  var ERROR_FORM_STYLE = '0 0 3px 3px red';

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

  var fieldTitleElement = formElement.querySelector('#title');
  var fieldBuildingElement = formElement.querySelector('#type');
  var fieldPriceElement = formElement.querySelector('#price');
  var fieldCheckinElement = formElement.querySelector('#timein');
  var fieldCheckoutElement = formElement.querySelector('#timeout');
  var fieldAddressElement = formElement.querySelector('#address');
  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldRoomElement = formElement.querySelector('#room_number');

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
    fieldCheckoutElement.value = evt.target.value;
  };

  var onCheckoutChange = function (evt) {
    fieldCheckinElement.value = evt.target.value;
  };

  var onTypeMatchesPriceChange = function (evt) {
    var minPrice = TYPE_MIN_PRICE[evt.target.value];
    fieldPriceElement.min = minPrice;
    fieldPriceElement.placeholder = minPrice.toString();
  };

  var onTextFieldInvalid = function () {
    if (fieldTitleElement.validity.tooShort || fieldTitleElement.validity.valueMissing) {
      fieldTitleElement.setCustomValidity('');
    }
  };

  var onResetFormClick = function (evt) {
    evt.preventDefault();
    formElement.reset();

    window.popup.remove();
    window.pins.remove();
    window.mainPin.resetPosition();

    fieldAddressElement.setAttribute('value', window.mainPin.getDefaultPositionX() + ',' + window.mainPin.getDefaultPositionY());
  };

  var onRoomSelectChange = function (evt) {
    var roomsValue = evt.target.value;
    var optionElements = fieldCapacityElement.querySelectorAll('option');

    evt.target.setCustomValidity('');

    Array.prototype.forEach.call(optionElements, function (optionElement) {
      if (VALIDATION_CAPACITY[roomsValue].indexOf(optionElement.value) === -1) {
        optionElement.setAttribute('disabled', 'disabled');
      } else {
        optionElement.removeAttribute('disabled');
      }
    });
  };

  var onCapacitySelectChange = function (evt) {
    evt.target.setCustomValidity('');
  };

  var onFormSubmitClick = function () {
    var currentNumberRooms = VALIDATION_CAPACITY[fieldRoomElement.value];
    var warningMessage = currentNumberRooms >= (parseInt(fieldCapacityElement.value, 10)) ? ERROR_FORM_MESSAGE : '';
    fieldCapacityElement.setCustomValidity(warningMessage);

    Array.prototype.forEach.call(formInputElements, function (element) {
      element.style.boxShadow = !element.checkValidity() ? ERROR_FORM_STYLE : '';
    });

    formElement.addEventListener('submit', function (evt) {
      window.backend.postOffer(new FormData(formElement), window.messages.createErrorMessage, window.messages.createErrorMessage);
      evt.preventDefault();
    });
  };


  disableElements(formFieldsetElements);

  window.form = {
    activate: function () {
      formElement.classList.remove('ad-form--disabled');

      enableElements(formFieldsetElements);

      fieldCheckinElement.addEventListener('change', onChekinChange);
      fieldCheckoutElement.addEventListener('change', onCheckoutChange);
      fieldBuildingElement.addEventListener('change', onTypeMatchesPriceChange);
      fieldTitleElement.addEventListener('invalid', onTextFieldInvalid);
      fieldRoomElement.addEventListener('change', onRoomSelectChange);
      fieldCapacityElement.addEventListener('change', onCapacitySelectChange);
      buttonSubmitElement.addEventListener('click', onFormSubmitClick);
      buttonResetElement.addEventListener('click', onResetFormClick);
    },
    deactivate: function () {
      disableElements(formFieldsetElements);

      fieldCheckinElement.removeEventListener('change', onChekinChange);
      fieldCheckoutElement.removeEventListener('change', onCheckoutChange);
      fieldBuildingElement.removeEventListener('change', onTypeMatchesPriceChange);
      fieldTitleElement.removeEventListener('invalid', onTextFieldInvalid);
      fieldRoomElement.removeEventListener('change', onRoomSelectChange);
      fieldCapacityElement.removeEventListener('change', onCapacitySelectChange);
      buttonSubmitElement.removeEventListener('click', onFormSubmitClick);
      buttonResetElement.removeEventListener('click', onResetFormClick);

    },
    setAddressValue: function (coords) {
      fieldAddressElement.setAttribute('value', coords);
    }
  };
})();

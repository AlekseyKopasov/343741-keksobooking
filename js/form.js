'use strict';

(function () {
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

  var fieldTitleElement = formElement.querySelector('#title');
  var fieldBuildingElement = formElement.querySelector('#type');
  var fieldPriceElement = formElement.querySelector('#price');
  var fieldCheckinElement = formElement.querySelector('#timein');
  var fieldCheckoutElement = formElement.querySelector('#timeout');
  var fieldAddressElement = formElement.querySelector('#address');
  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldRoomElement = formElement.querySelector('#room_number');

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

  var onFormChange = function (evt) {
    evt.target.style.boxShadow = !(evt.target.checkValidity()) ? ERROR_FORM_STYLE : '';
  };

  var createFormSubmitHandler = function (callbackSubmit) {
    return function (evt) {
      callbackSubmit(new FormData(formElement));
      evt.preventDefault();
    };
  };

  var createFormResetHandler = function (callbackReset) {
    return function () {
      callbackReset();
    };
  };

  var onFormSubmit;
  var onFormReset;

  disableElements(formFieldsetElements);

  window.form = {
    activate: function (callbackFormSubmit, callbackFormReset) {
      formElement.classList.remove('ad-form--disabled');

      enableElements(formFieldsetElements);

      fieldCheckinElement.addEventListener('change', onChekinChange);
      fieldCheckoutElement.addEventListener('change', onCheckoutChange);
      fieldBuildingElement.addEventListener('change', onTypeMatchesPriceChange);
      fieldTitleElement.addEventListener('invalid', onTextFieldInvalid);
      fieldRoomElement.addEventListener('change', onRoomSelectChange);
      fieldCapacityElement.addEventListener('change', onCapacitySelectChange);

      onFormSubmit = createFormSubmitHandler(callbackFormSubmit);
      onFormReset = createFormResetHandler(callbackFormReset);

      formElement.addEventListener('change', onFormChange);
      formElement.addEventListener('submit', onFormSubmit);
      formElement.addEventListener('reset', onFormReset);
    },
    deactivate: function () {
      disableElements(formFieldsetElements);
      formElement.classList.add('ad-form--disabled');

      formElement.reset();

      fieldCheckinElement.removeEventListener('change', onChekinChange);
      fieldCheckoutElement.removeEventListener('change', onCheckoutChange);
      fieldBuildingElement.removeEventListener('change', onTypeMatchesPriceChange);
      fieldTitleElement.removeEventListener('invalid', onTextFieldInvalid);
      fieldRoomElement.removeEventListener('change', onRoomSelectChange);
      fieldCapacityElement.removeEventListener('change', onCapacitySelectChange);

      formElement.removeEventListener('change', onFormChange);
      formElement.removeEventListener('submit', onFormSubmit);
      formElement.addEventListener('reset', onFormReset);
    },
    setAddressValue: function (coords) {
      fieldAddressElement.setAttribute('value', coords);
    }
  };
})();

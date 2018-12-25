'use strict';

(function () {
  var PriceRange = {
    LOW: {
      min: 0,
      max: 10000
    },
    MIDDLE: {
      min: 10000,
      max: 50000
    },
    HIGH: {
      min: 50000,
      max: Infinity
    }
  };
  var filterFormElement = document.querySelector('.map__filters');
  var filterInputElements = filterFormElement.querySelectorAll('input');
  var filterSelectElements = filterFormElement.querySelectorAll('select');
  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');

  var getTypeValue = function (offer, index) {
    return filterTypeElement.value === 'any' ? true : filterTypeElement.value === offer[index].toString();
  };

  var getPriceValue = function (offer) {
    return PriceRange ? filterPriceElement.offer.price >= PriceRange.min && offer.offer.price <= PriceRange.max : true;
  };

  var getRoomsValue = function (offer, index) {
    return filterRoomElement.value === 'any' ? true : filterRoomElement.value === offer[index].toString();
  };

  var getGuestsValue = function (offer, index) {
    return filterGuestsElement.value === 'any' ? true : filterGuestsElement.value === offer[index].toString();
  };

  var getFeaturesValue = function (offer, index) {
    return filterFeaturesElement.value === 'any' ? true : filterFeaturesElement.value === offer[index].toString();
  };

  var onFiltersChanged = function () {
    var filteredOffers = filteredOffers
    .filter(getTypeValue)
    .filter(getPriceValue)
    .filter(getRoomsValue)
    .filter(getGuestsValue)
    .filter(getFeaturesValue);
  };

  var createFilterIsActiveHandler = function (callbackFilterIsActive) {
    return function () {
      callbackFilterIsActive();
    };
  };

  var onFilterIsActive;

  window.filter = {
    activate: function (callbackFilterData) {
      Array.prototype.forEach.call(filterInputElements, function (element) {
        element.removeAttribute('disabled');
      });
      Array.prototype.forEach.call(filterSelectElements, function (element) {
        element.removeAttribute('disabled');
      });

      onFilterIsActive = createFilterIsActiveHandler(callbackFilterData);

      filterFormElement.addEventListener('change', onFiltersChanged);
      filterFormElement.addEventListener('load', onFilterIsActive);
    },

    deactivate: function () {
      Array.prototype.forEach.call(filterInputElements, function (element) {
        element.setAttribute('disabled', '');
      });
      Array.prototype.forEach.call(filterSelectElements, function (element) {
        element.setAttribute('disabled', '');
      });

      filterFormElement.removeEventListener('change', onFiltersChanged);
      filterFormElement.removeEventListener('load', onFilterIsActive);
    }
  };
})();

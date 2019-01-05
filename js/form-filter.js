'use strict';

(function () {
  var FilterPrice = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var DEBOUNCE_INTERVAL = 600;

  var FILTER_FIELD_DEFAULT_VALUE = 'any';

  var filterFormElement = document.querySelector('.map__filters');
  var formInputElements = filterFormElement.querySelectorAll('input[type="checkbox"]');
  var formSelectElements = filterFormElement.querySelectorAll('select');

  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');

  var filterPriceElement = filterFormElement.querySelector('#housing-price');

  var enableElements = function (elements) {
    elements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var disableElements = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  };

  var filterOfferBySelect = function (filterElement, offer, fieldName) {
    return filterElement.value === FILTER_FIELD_DEFAULT_VALUE || filterElement.value === offer.offer[fieldName].toString();
  };

  var filterOfferByPrice = function (offer) {
    var priceLimit = FilterPrice[filterPriceElement.value];
    return filterPriceElement.value === FILTER_FIELD_DEFAULT_VALUE || offer.offer.price >= priceLimit.min && offer.offer.price <= priceLimit.max;
  };

  var filterOfferByFeatures = function (offer) {
    return Array
    .from(filterFormElement.querySelectorAll('input[type="checkbox"]'))
    .filter(function (featureElement) {
      return featureElement.checked;
    })
    .every(function (feature) {
      return offer.offer.features.indexOf(feature.value) !== -1;
    });
  };

  var filter = function (offers) {
    return offers.filter(function (offer) {
      return filterOfferBySelect(filterTypeElement, offer, 'type') &&
      filterOfferBySelect(filterRoomElement, offer, 'rooms') &&
      filterOfferBySelect(filterGuestsElement, offer, 'guests') &&
      filterOfferByPrice(offer) &&
      filterOfferByFeatures(offer);
    });
  };

  var createFilterFormHandler = function (onFilter, offers) {
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        onFilter(filter(offers));
      }, DEBOUNCE_INTERVAL);
    };
  };

  var lastTimeout;
  var onFilterFormChange;

  window.filter = {
    activate: function (offers, onFilter) {
      enableElements(formInputElements);
      enableElements(formSelectElements);

      onFilterFormChange = createFilterFormHandler(onFilter, offers);

      filterFormElement.addEventListener('change', onFilterFormChange);
    },

    deactivate: function () {
      disableElements(formInputElements);
      disableElements(formSelectElements);

      filterFormElement.removeEventListener('change', onFilterFormChange);
    }
  };
})();

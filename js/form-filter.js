'use strict';

(function () {
  var FILTER_PRICE = {
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

  var DEBOUNCE_INTERVAL = 1500;

  var filterFormElement = document.querySelector('.map__filters');
  var formInputElements = filterFormElement.querySelectorAll('input[type="checkbox"]');
  var formSelectElements = filterFormElement.querySelectorAll('select');

  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');

  var filterPriceElement = filterFormElement.querySelector('#housing-price');

  var enableElements = function (elements) {
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute('disabled');
    });
  };

  var disableElements = function (elements) {
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute('disabled');
    });
  };

  var filterOfferBySelect = function (filterElement, offer, fieldName) {
    return filterElement.value === 'any' || filterElement.value === offer.offer[fieldName].toString();
  };

  var filterOfferByPrice = function (offer) {
    var priceLimit = FILTER_PRICE[filterPriceElement.value];
    return filterPriceElement.value === 'any' || offer.offer.price >= priceLimit.min && offer.offer.price <= priceLimit.max;
  };

  var filterOfferByFeatures = function (offer) {
    var checkboxFeaturesElements = Array.from(filterFormElement.querySelectorAll('input[type="checkbox"]'));
    var features = Array
    .from(checkboxFeaturesElements)
    .filter(function (checkedFeature) {
      return checkedFeature.checked;
    })
    .reduce(function (accumulator, featureElement) {
      accumulator.push(featureElement);
      return accumulator;
    }, []);

    return features.every(function (feature) {
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
    return function (_evt) {
      onFilter(filter(offers));
    };
  };

  var onFilterFormChange;
  var lastTimeout;

  var debounceFilter = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  window.filter = {
    activate: function (offers, onFilter) {
      enableElements(formInputElements);
      enableElements(formSelectElements);

      onFilterFormChange = createFilterFormHandler(onFilter, offers);

      filterFormElement.addEventListener('change', debounceFilter(onFilterFormChange));
    },

    deactivate: function () {
      disableElements(formInputElements);
      disableElements(formSelectElements);

      filterFormElement.removeEventListener('change', onFilterFormChange);
    }
  };
})();

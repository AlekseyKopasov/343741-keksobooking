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

  var filterFormElement = document.querySelector('.map__filters');
  var formInputElements = filterFormElement.querySelectorAll('input[type="checkbox"]');
  var formSelectElements = filterFormElement.querySelectorAll('select');

  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');

  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');

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
    var features = Array
      .from(filterFeaturesElement)
      .filter(function (checkedFeature) {
        return checkedFeature.checked;
      })
      .reduce(function (accumulator, featureElement) {
        accumulator.push(featureElement);
        return accumulator;
      }, []);

    return offer.offer.features.every(function (feature) {
      // debugger;
      return features.indexOf(feature) !== -1;
    });
  };

  var filter = function (offers) {

    return offers.filter(function (offer) {

      // console.log(filterOfferByFeatures(offer));

      return filterOfferBySelect(filterTypeElement, offer, 'type') && // работает
             filterOfferBySelect(filterRoomElement, offer, 'rooms') && // работает
             filterOfferBySelect(filterGuestsElement, offer, 'guests') && // работает
             filterOfferByPrice(offer) && // работает
             filterOfferByFeatures(offer);
    });

  };

  var createFilterFormHandler = function (onFilter, offers) {
    return function (_evt) {
      onFilter(filter(offers));
    };
  };

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

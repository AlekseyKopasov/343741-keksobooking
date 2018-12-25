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
  // var filterTypeElement = filterFormElement.querySelector('#housing-type');
  // var filterPriceElement = filterFormElement.querySelector('#housing-price');
  // var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  // var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');

  var getTypeValue = function (offerType, filterType) {
    return offerType === 'any' || filterType === offerType.toString();
  };

  var getPriceValue = function (offerPrice, filterPrice) {
    var getOfferPrice = function () {
      if (offerPrice < PriceRange.LOW) {
        return PriceRange.LOW;
      } else if (offerPrice > PriceRange.HIGH) {
        return PriceRange.HIGH;
      } else {
        return PriceRange.MIDDLE;
      }
    };
    return filterPrice === 'any' || getOfferPrice(offerPrice);
  };

  var getFeaturesValue = function (offerFeatures, filterFeatures) {
    return filterFeatures.every(function (feature) {
      return offerFeatures.indexOf(feature) > -1;
    });
  };

  var filterData = Array.from(filterSelectElements).reduce(function (result, selectedOption) {
    var optionName = selectedOption.feature;
    result[optionName] = filterSelectElements.options[filterSelectElements.selectedIndex].value;

    return result;
  }, {});

  filterData.features = Array.from(filterFeaturesElement)
        .filter(function (checkedFeature) {
          return checkedFeature.checked;
        })
        .map(function (checkedFeature) {
          return checkedFeature.value;
        });

  var onFiltersChanged = function () {
    var filteredOffers = filteredOffers.filter(function (loadOffer) {
      return getTypeValue(loadOffer.offer.type, filterData.type) &&
      getTypeValue(loadOffer.offer.rooms, filterData.rooms) &&
      getTypeValue(loadOffer.offer.guests, filterData.guests) &&
      getPriceValue(loadOffer.offer.price, filterData.price) &&
      getFeaturesValue(loadOffer.offer.features, filterData.features);
    });
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

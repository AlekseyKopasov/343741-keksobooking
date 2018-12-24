'use strict';

(function () {
  var filterFormElement = document.querySelector('.map__filters');
  var filterInputElements = filterFormElement.querySelectorAll('input');
  var filterSelectElements = filterFormElement.querySelectorAll('select');
  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');

  var filtrationOffers = function (offers) {
    var selectedTypeElement = filterTypeElement.options[filterTypeElement.selectedIndex];
    var selectedPriceElement = filterPriceElement.options[filterPriceElement.selectedIndex];
    var selectedRoomsElement = filterRoomElement.options[filterRoomElement.selectedIndex];
    var selectedGuestsElement = filterGuestsElement.options[filterGuestsElement.selectedIndex];
    var selectedFeaturesElements = filterFeaturesElement.querySelectorAll('input:checked');

    var filteredOffers = offers
    .filter(selectedTypeElement)
    .filter(selectedPriceElement)
    .filter(selectedRoomsElement)
    .filter(selectedGuestsElement)
    .filter(selectedFeaturesElements);

    return filteredOffers;
  };

  var onFiltersChanged = function (offers) {
    filtrationOffers(offers);
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

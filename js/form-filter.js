'use strict';

(function () {

  var filterFormElement = document.querySelector('.map__filters');

  var filtrationOffers = function (offers, selectedElement) {
    return offers.filter(offers.indexOf(selectedElement) !== -1);
  };

  var getSelectedItem = function (filterElemens, filterField) {
    filterElemens = filterFormElement.querySelectorAll('#housing-' + filterField);
    Array.prototype.forEach.call(filterElemens, function (element) {
      filtrationOffers(element.selectedIndex);
    });
  };

  var onFiltersChanged = function (evt) {
    getSelectedItem(evt.target);
  };

  window.formFilter = {
    activate: function () {
      filterFormElement.addEventListener('change', onFiltersChanged);
    },
    deactivate: function () {
      filterFormElement.removeEventListener('change', onFiltersChanged);
    }
  };
})();

'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var onFiltersChanged = function (filteredOffers) {
    window.pins.remove();
    window.pins.create(filteredOffers);
  };

  var onGetOffersSuccess = function (offers) {
    window.pins.create(offers);

    window.formFilter.activate(offers, onFiltersChanged);
  };

  var onGetOffersError = function () {
    window.message.createErrorMessage();
  };

  var onPostOfferSuccess = function () {
    window.messages.createSuccessMessage();

    window.pins.remove();
    window.mainPin.resetPosition();
    window.form.deactivate(window.mainPin.getDefaultPosition());

    isMapActive = false;
    mapElement.classList.add('map--faded');
  };

  var onPostOfferError = function () {
    window.messages.createErrorMessage();
  };

  var onFormSubmit = function (data) {
    window.backend.postOffer(data, onPostOfferSuccess, onPostOfferError);
  };

  var onFormReset = function () {
    window.popup.remove();
    window.pins.remove();
    window.mainPin.resetPosition();
  };

  var isMapActive = false;

  var callbackMainPinMouseUp = function (mainPinPosition) {
    if (!isMapActive) {
      mapElement.classList.remove('map--faded');
      window.backend.getOffers(onGetOffersSuccess, onGetOffersError);
      window.form.activate(onFormSubmit, onFormReset);
    }

    isMapActive = true;

    window.form.setAddressValue(mainPinPosition);
  };

  window.mainPin.activate(callbackMainPinMouseUp);
})();

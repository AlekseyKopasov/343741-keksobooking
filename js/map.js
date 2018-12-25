'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var onFilter = function (filteredOffers) {
    // debugger;
    window.popup.remove();
    window.pins.remove();
    window.pins.create(filteredOffers);
  };

  var onGetOffersSuccess = function (offers) {
    window.filter.activate(offers, onFilter);
    window.pins.create(offers);
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
    window.filter.deactivate();
  };

  var onPostOfferError = function () {
    window.messages.createErrorMessage();
  };

  var callbackFormSubmit = function (data) {
    window.backend.postOffer(data, onPostOfferSuccess, onPostOfferError);
  };

  var callbackFormReset = function () {
    window.popup.remove();
    window.pins.remove();
    window.mainPin.resetPosition();
  };

  var isMapActive = false;

  var callbackMainPinMouseUp = function (mainPinPosition) {
    if (!isMapActive) {
      mapElement.classList.remove('map--faded');
      window.backend.getOffers(onGetOffersSuccess, onGetOffersError);
      window.form.activate(callbackFormSubmit, callbackFormReset);
    }

    isMapActive = true;
    window.form.setAddressValue(mainPinPosition);
  };

  window.mainPin.activate(callbackMainPinMouseUp);
  window.filter.deactivate();
})();


'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var deactivatePage = function () {
    window.popup.remove();
    window.pins.remove();
    window.mainPin.resetPosition();
    window.form.setAddressValue(window.mainPin.getDefaultPosition());
    window.form.deactivate();
    window.formPhoto.deactivate();
    isMapActive = false;
    mapElement.classList.add('map--faded');
  };

  var onFilter = function (filteredOffers) {
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
    deactivatePage();
  };

  var callbackFormReset = function () {
    deactivatePage();
  };

  var isMapActive = false;

  var callbackMainPinMouseUp = function (mainPinPosition) {
    if (!isMapActive) {
      mapElement.classList.remove('map--faded');
      window.backend.getOffers(onGetOffersSuccess, onGetOffersError);
      window.form.activate(callbackFormSubmit, callbackFormReset);
      window.formPhoto.activate();
    }

    isMapActive = true;
    window.form.setAddressValue(mainPinPosition);
  };

  window.mainPin.activate(callbackMainPinMouseUp);
  deactivatePage();
})();

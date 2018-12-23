'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var onLoadSuccess = function (offers) {
    window.pins.create(offers);
  };

  var onLoadError = function () {
    window.message.createErrorMessage();
  };

  var onPostOfferSuccess = function () {
    window.form.deactivate(window.mainPin.getDefaultPosition());
    window.messages.createSuccessMessage();
    window.pins.remove();
    window.mainPin.resetPosition();
  };

  var onPostOfferError = function () {
    window.messages.createErrorMessage();
  };

  var callbackFormSubmit = function (data) {
    window.backend.postOffer(
        data,
        onPostOfferSuccess,
        onPostOfferError
    );
  };

  var callbackFormReset = function () {
    window.popup.remove();
    window.pins.remove();
    window.mainPin.resetPosition();
  };

  var callbackMapActivate = function () {
    window.map.activate();
  };

  window.mainPin.activate(callbackMapActivate);

  window.map = {
    activate: function () {
      window.form.activate(callbackFormSubmit, callbackFormReset);
      mapElement.classList.remove('map--faded');
      window.backend.getOffers(onLoadSuccess, onLoadError);
    },
    deactivate: function () {
      mapElement.classList.add('map--faded');
    }
  };
})();


'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooseUserAvater = function (fileImage) {
    var fileImageName = fileImage.name.toLowerCase();
    var matches = FILE_TYPES.some(function (imageFormat) {
      return fileImageName.endsWith(imageFormat);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var imageAvatarElement = imagePreviewElement.querySelector('img');
        imageAvatarElement.src = reader.result;
      });
      reader.readAsDataURL(fileImage);
    }
  };

  var chooseOfferImage = function (fileImage) {
    var fileOfferImageName = fileImage.name.toLowerCase();
    var matches = FILE_TYPES.some(function (imageFormat) {
      return fileOfferImageName.endsWith(imageFormat);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var previewImage = photoPreviewElement.cloneNode(false);
        var imgElement = document.createElement('img');
        imgElement.setAttribute('style', 'display: block; margin: 0 auto; max-height: 70px; max-width: 70px;');
        imgElement.src = reader.result;
        previewImage.appendChild(imgElement);
        imagePhotoContainerElement.insertBefore(previewImage, photoPreviewElement);
      });

      reader.readAsDataURL(fileImage);
    }
  };

  var onUserAvatarChange = function () {
    var fileImage = inputAvatarElement.files[0];
    chooseUserAvater(fileImage);
  };

  var onOfferPreviewChange = function () {
    var previewImage = inputPreviewElement.files[0];
    chooseOfferImage(previewImage);
  };

  var inputAvatarElement = document.querySelector('#avatar');
  var imagePreviewElement = document.querySelector('.ad-form-header__preview');
  var photoPreviewElement = document.querySelector('.ad-form__photo');
  var imagePhotoContainerElement = document.querySelector('.ad-form__photo-container');
  var inputPreviewElement = document.querySelector('.ad-form__upload input[type=file]');

  window.avatar = {
    activate: function () {
      inputAvatarElement.addEventListener('change', onUserAvatarChange);
      inputPreviewElement.addEventListener('change', onOfferPreviewChange);
    },
    deactivate: function () {
      inputAvatarElement.removeEventListener('change', onUserAvatarChange);
      inputPreviewElement.addEventListener('change', onOfferPreviewChange);
    }
  };
})();

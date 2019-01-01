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
        // var imageAvatarElement = fieldPreviewElement.querySelector('img');
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

      reader.addEventListener('load', function (evt) {
        if (!photoPreviewElement.hasChildNodes()) {
          photoPreviewElement.remove();
        }

        var photoElement = document.createElement('div');
        photoElement.classList.add('ad-form__photo');

        var imageElement = document.createElement('img');
        imageElement.src = evt.target.result;
        imageElement.alt = 'Фото жилья';
        imageElement.style.maxWidth = '70px';
        imageElement.style.maxHeight = '70px';

        photoElement.appendChild(imageElement);
        containerPhotoElement.appendChild(photoElement);
      });

      reader.readAsDataURL(fileImage);
    }
  };

  var removeAvatar = function () {
    imageAvatarElement.src = 'img/muffin-grey.svg';
  };

  var removePreviews = function () {
    var previewImagesElements = document.querySelectorAll('.ad-form__photo');
    Array.prototype.forEach.call(previewImagesElements, function (preview) {
      preview.remove();
    });

    var emptyElement = document.createElement('div');
    emptyElement.classList.add('ad-form__photo');
    containerPhotoElement.appendChild(emptyElement);
  };

  var onUserAvatarChange = function () {
    var fileImage = inputAvatarElement.files[0];
    chooseUserAvater(fileImage);
  };

  var onOfferPreviewChange = function () {
    var previewImage = inputPreviewElement.files[0];
    chooseOfferImage(previewImage);
  };

  var containerPhotoElement = document.querySelector('.ad-form__photo-container');

  var inputAvatarElement = document.querySelector('#avatar');
  var inputPreviewElement = document.querySelector('.ad-form__upload input[type=file]');

  var fieldPreviewElement = document.querySelector('.ad-form-header__preview');
  var imageAvatarElement = fieldPreviewElement.querySelector('img');
  var photoPreviewElement = containerPhotoElement.querySelector('.ad-form__photo');

  window.avatar = {
    activate: function () {
      inputAvatarElement.addEventListener('change', onUserAvatarChange);
      inputPreviewElement.addEventListener('change', onOfferPreviewChange);
    },
    deactivate: function () {
      inputAvatarElement.removeEventListener('change', onUserAvatarChange);
      inputPreviewElement.addEventListener('change', onOfferPreviewChange);
    },
    remove: function () {
      removeAvatar();
      removePreviews();
    }
  };
  // TODO Реализовать D&D для превью
})();

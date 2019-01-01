'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChangeHandler = function (fileImage) {
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

  var onUserAvatarChange = function () {
    var fileImage = inputAvatarElement.files[0];
    avatarChangeHandler(fileImage);
  };

  var inputAvatarElement = document.querySelector('#avatar');
  var imagePreviewElement = document.querySelector('.ad-form-header__preview');

  window.avatar = {
    activate: function () {
      inputAvatarElement.addEventListener('change', onUserAvatarChange);
    },
    deactivate: function () {
      inputAvatarElement.removeEventListener('change', onUserAvatarChange);
    }
  };
})();

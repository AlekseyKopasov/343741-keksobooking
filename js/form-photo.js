'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var AVATAR_IMAGE_ALT = 'Аватар пользователя';

  var AvatarStyles = {
    width: '40px',
    height: '44px',
    borderRadius: '5px'
  };

  var PHOTO_IMAGE_ALT = 'Фото жилья';

  var PhotoStyles = {
    width: '70px',
    height: '70px',
    borderRadius: '5px'
  };

  var DropZoneStyles = {
    color: '#ff5635',
    border: '1px solid #c7c7c7'
  };

  var setElementStyles = function (element, styles) {
    Object.keys(styles).forEach(function (styleName) {
      element.style[styleName] = styles[styleName];
    });
  };

  var createImageChangeHandler = function (onLoad) {
    return function (evt) {
      var file = evt.target.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (fileType) {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          onLoad(reader.result);
        });
        reader.readAsDataURL(file);
      }
    };
  };

  var onAvatarLoad = function (fileSource) {
    avatarImageElement.src = fileSource;
    avatarImageElement.alt = AVATAR_IMAGE_ALT;
    setElementStyles(avatarImageElement, AvatarStyles);
  };

  var onPhotoLoad = function (fileSource) {
    var photoWrapperElement = photoContainerElement.querySelector('.ad-form__photo');
    if (!photoWrapperElement.hasChildNodes()) {
      photoWrapperElement.remove();
    }

    var wrapperElement = document.createElement('div');
    var imageElement = document.createElement('img');

    wrapperElement.classList.add('ad-form__photo');

    imageElement.src = fileSource;
    imageElement.alt = PHOTO_IMAGE_ALT;

    setElementStyles(imageElement, PhotoStyles);

    wrapperElement.appendChild(imageElement);
    photoContainerElement.appendChild(wrapperElement);
  };

  var onUserAvatarChange = createImageChangeHandler(onAvatarLoad);
  var onPhotoPreviewChange = createImageChangeHandler(onPhotoLoad);

  var resetAvatar = function () {
    avatarImageElement.src = DEFAULT_AVATAR;
  };

  var resetPhotos = function () {
    var photoElements = document.querySelectorAll('.ad-form__photo');
    var emptyElement = document.createElement('div');

    photoElements.forEach(function (photoElement) {
      photoElement.remove();
    });

    emptyElement.classList.add('ad-form__photo');

    photoContainerElement.appendChild(emptyElement);
  };

  var onDropZoneDragleave = function (evt) {
    evt.preventDefault();
    evt.target.removeAttribute('style');
  };

  var onDropZoneDragover = function (evt) {
    evt.preventDefault();
    setElementStyles(evt.target, DropZoneStyles);
  };

  var createDropHandler = function (onLoad) {
    return function (evt) {
      evt.preventDefault();
      evt.target.removeAttribute('style');

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });
      reader.readAsDataURL((evt.dataTransfer.files[0]));
    };
  };

  var onAvatarDropZoneDrop = createDropHandler(onAvatarLoad);
  var onPhotoDropZoneDrop = createDropHandler(onPhotoLoad);

  var onAvatarDropZoneDragover = onDropZoneDragover;
  var onAvatarDropZoneDragleave = onDropZoneDragleave;
  var onPhotoDropZoneDragover = onDropZoneDragover;
  var onPhotoDropZoneDragleave = onDropZoneDragleave;

  var avatarInputElement = document.querySelector('#avatar');
  var avatarWrapperElement = document.querySelector('.ad-form-header__preview');
  var avatarImageElement = avatarWrapperElement.querySelector('img');
  var avatarDropZoneElement = document.querySelector('.ad-form-header__drop-zone');


  var photoInputElement = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoDropZoneElement = document.querySelector('.ad-form__drop-zone');

  window.formPhoto = {
    activate: function () {
      avatarDropZoneElement.addEventListener('drop', onAvatarDropZoneDrop);
      avatarDropZoneElement.addEventListener('dragover', onAvatarDropZoneDragover);
      avatarDropZoneElement.addEventListener('dragleave', onAvatarDropZoneDragleave);

      photoDropZoneElement.addEventListener('drop', onPhotoDropZoneDrop);
      photoDropZoneElement.addEventListener('dragover', onPhotoDropZoneDragover);
      photoDropZoneElement.addEventListener('dragleave', onPhotoDropZoneDragleave);

      avatarInputElement.addEventListener('change', onUserAvatarChange);
      photoInputElement.addEventListener('change', onPhotoPreviewChange);
    },
    deactivate: function () {
      avatarDropZoneElement.removeEventListener('drop', onAvatarDropZoneDrop);
      avatarDropZoneElement.removeEventListener('dragover', onAvatarDropZoneDragover);
      avatarDropZoneElement.removeEventListener('dragleave', onAvatarDropZoneDragleave);

      photoDropZoneElement.removeEventListener('drop', onPhotoDropZoneDrop);
      photoDropZoneElement.removeEventListener('dragover', onPhotoDropZoneDragover);
      photoDropZoneElement.removeEventListener('dragleave', onPhotoDropZoneDragleave);

      resetAvatar();
      resetPhotos();

      avatarInputElement.removeEventListener('change', onUserAvatarChange);
      photoInputElement.removeEventListener('change', onPhotoPreviewChange);
    }
  };
})();

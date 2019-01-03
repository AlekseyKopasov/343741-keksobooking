'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  // var DROP_EFFECT = 'move';

  var AvatarImageStyle = {
    WIDTH: '40px',
    HEIGHT: '44px',
    ALT: 'Аватар пользователя'
  };

  var PhotoImageStyle = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px',
    ALT: 'Фото жилья'
  };

  var DropZoneStyle = {
    COLOR: '#ff5635',
    BORDER: '1px solid #c7c7c7'
  };

  var addImageStyle = function (imageDropElement, ImageStyle) {
    imageDropElement.alt = ImageStyle.ALT;
    imageDropElement.style.width = ImageStyle.WIDTH;
    imageDropElement.style.height = ImageStyle.HEIGHT;
    imageDropElement.style.maxWidth = ImageStyle.WIDTH;
    imageDropElement.style.maxHeight = ImageStyle.HEIGHT;
  };

  var chooseUserAvatar = function (fileImage) {
    var fileImageName = fileImage.name.toLowerCase();
    var matches = FILE_TYPES.some(function (imageFormat) {
      return fileImageName.endsWith(imageFormat);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarImageElement.src = reader.result;
        addImageStyle(avatarImageElement, AvatarImageStyle);
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
        if (!photoWrapperElement.hasChildNodes()) {
          photoWrapperElement.remove();
        }

        var photoWrapElement = document.createElement('div');
        photoWrapElement.classList.add('ad-form__photo');

        var imageElement = document.createElement('img');
        imageElement.src = evt.target.result;
        addImageStyle(imageElement, PhotoImageStyle);

        photoWrapElement.appendChild(imageElement);
        photoContainerElement.appendChild(photoWrapElement);
      });

      reader.readAsDataURL(fileImage);
    }
  };

  var resetAvatar = function () {
    avatarImageElement.src = DEFAULT_AVATAR;
  };

  var resetPreviewsPhoto = function () {
    var photoWrappersElements = document.querySelectorAll('.ad-form__photo');
    Array.prototype.forEach.call(photoWrappersElements, function (preview) {
      preview.remove();
    });

    var emptyElement = document.createElement('div');
    emptyElement.classList.add('ad-form__photo');
    photoContainerElement.appendChild(emptyElement);
  };

  var testDragSorting = function () {
    var dragging = null;

    var photoWrappersElements = document.querySelectorAll('.ad-form__photo');

    Array.prototype.forEach.call(photoWrappersElements, function (element) {
      element.setAttribute('draggable', true);
      element.addEventListener('dragstart', function (event) {
        dragging = event.target;
        event.dataTransfer.setData('text/html', dragging);
      });

      element.addEventListener('dragover', function (event) {
        event.preventDefault();
      });

      element.addEventListener('drop', function (event) {
        event.preventDefault();
        if (event.target.style['border-bottom'] !== '') {
          event.target.style['border-bottom'] = '';
          event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
        } else {
          event.target.style['border-top'] = '';
          event.target.parentNode.insertBefore(dragging, event.target);
        }
      });
    });
  };

  testDragSorting();

  var onUserAvatarChange = function () {
    var fileImage = avatarInputElement.files[0];
    chooseUserAvatar(fileImage);
  };

  var onOfferPreviewChange = function () {
    var previewImage = photoInputElement.files[0];
    chooseOfferImage(previewImage);
  };

  var onDropZoneDrag = function (evt, dropZone) {
    evt.preventDefault();
    dropZone.removeAttribute('style');
  };

  var onDropZoneDragover = function (evt, dropZone) {
    evt.preventDefault();
    dropZone.style.color = DropZoneStyle.COLOR;
    dropZone.style.border = DropZoneStyle.BORDER;
  };

  var onDropZoneDrop = function (evt, dropZone, onDrop) {
    evt.preventDefault();
    dropZone.removeAttribute('style');
    var fileImage = evt.dataTransfer.files[0];
    onDrop(fileImage);
  };

  var avatarInputElement = document.querySelector('#avatar');
  var avatarWrapperElement = document.querySelector('.ad-form-header__preview');
  var avatarImageElement = avatarWrapperElement.querySelector('img');
  var avatarDropZoneElement = document.querySelector('.ad-form-header__drop-zone');

  var photoDropZoneElement = document.querySelector('.ad-form__drop-zone');
  var photoInputElement = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoWrapperElement = photoContainerElement.querySelector('.ad-form__photo');


  window.formPhoto = {
    activate: function () {

      avatarDropZoneElement.addEventListener('dragover', onDropZoneDragover);
      avatarDropZoneElement.addEventListener('dragleave', onDropZoneDrag);
      avatarDropZoneElement.addEventListener('drop', onDropZoneDrop);
      photoDropZoneElement.addEventListener('dragover', onDropZoneDragover);
      photoDropZoneElement.addEventListener('dragleave', onDropZoneDrag);
      photoDropZoneElement.addEventListener('drop', onDropZoneDrop);

      avatarInputElement.addEventListener('change', onUserAvatarChange);
      photoInputElement.addEventListener('change', onOfferPreviewChange);
    },
    deactivate: function () {

      avatarDropZoneElement.removeEventListener('dragover', onDropZoneDragover);
      avatarDropZoneElement.removeEventListener('dragleave', onDropZoneDrag);
      avatarDropZoneElement.removeEventListener('drop', onDropZoneDrop);
      photoDropZoneElement.removeEventListener('dragover', onDropZoneDragover);
      photoDropZoneElement.removeEventListener('dragleave', onDropZoneDrag);
      photoDropZoneElement.removeEventListener('drop', onDropZoneDrop);

      avatarInputElement.removeEventListener('change', onUserAvatarChange);
      photoInputElement.removeEventListener('change', onOfferPreviewChange);
    },
    reset: function () {
      resetAvatar();
      resetPreviewsPhoto();
    }
  };
})();

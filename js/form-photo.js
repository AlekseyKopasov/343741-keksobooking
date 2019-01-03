'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var AVATAR_IMAGE_ALT = 'Аватар пользователя';

  var avatarStyles = {
    width: '40px',
    height: '44px',
    borderRadius: '5px'
  };

  var PHOTO_IMAGE_ALT = 'Фото жилья';

  var photoStyles = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  // var DropZoneStyle = {
  //   COLOR: '#ff5635',
  //   BORDER: '1px solid #c7c7c7'
  // };

  var setElementStyles = function (element, styles) {
    Object.keys(styles).forEach(function (styleName) {
      element.style[styleName] = styles[styleName];
    });
  };

  var createImageChangeHandler = function (onLoad, fileImage) {
    return function () {
      fileImage = fileImage.files[0];
      var fileImageName = fileImage.name.toLowerCase();
      var matches = FILE_TYPES.some(function (imageFormat) {
        return fileImageName.endsWith(imageFormat);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          onLoad(reader.result);
        });
        reader.readAsDataURL(fileImage);
      }
    };
  };

  var onAvatarLoad = function (result) {
    avatarImageElement.src = result;
    avatarImageElement.alt = AVATAR_IMAGE_ALT;
    setElementStyles(avatarImageElement, avatarStyles);
  };

  var onPhotoLoad = function (result) {
    if (!photoWrapperElement.hasChildNodes()) {
      photoWrapperElement.remove();
    }

    var photoWrapElement = document.createElement('div');
    var photoImageElement = document.createElement('img');

    photoImageElement.src = result;
    photoWrapElement.classList.add('ad-form__photo');
    photoImageElement.alt = PHOTO_IMAGE_ALT;
    setElementStyles(photoImageElement, photoStyles);

    photoWrapElement.appendChild(photoImageElement);
    photoContainerElement.appendChild(photoWrapElement);
  };

  var onUserAvatarChange = createImageChangeHandler(onAvatarLoad, avatarInputElement);
  var onOfferPreviewChange = createImageChangeHandler(onPhotoLoad, photoInputElement);


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

  /*
  // TODO функция не закончена
  var testDragSorting = function () {
    var dragging = null;

    var photoWrappersElements = document.querySelectorAll('.ad-form__photo');

    Array.prototype.forEach.call(photoWrappersElements, function (element) {
      element.setAttribute('draggable', true);
      element.addEventListener('dragstart', function (evt) {
        dragging = event.target;
        evt.dataTransfer.setData('text/html', dragging);
      });

      element.addEventListener('dragover', function (evt) {
        evt.preventDefault();
      });

      element.addEventListener('drop', function (evt) {
        evt.preventDefault();
        if (evt.target.style['border-bottom'] !== '') {
          evt.target.style['border-bottom'] = '';
          evt.target.parentNode.insertBefore(dragging, evt.target.nextSibling);
        } else {
          evt.target.style['border-top'] = '';
          evt.target.parentNode.insertBefore(dragging, evt.target);
        }
      });
    });
  };

  testDragSorting();


  var onDropZoneDrag = function (evt, dropZone) {
    evt.preventDefault();
    dropZone.removeAttribute('style');
  };

  var onDropZoneDragover = function (evt, dropZone) { // dropZone
    // evt.target ?
    evt.preventDefault();
    // setElementStyles()
    dropZone.style.color = DropZoneStyle.COLOR;
    dropZone.style.border = DropZoneStyle.BORDER;
  };

  var onDropZoneDrop = function (evt, dropZone, onDrop) {
    evt.preventDefault();
    dropZone.removeAttribute('style');
    var fileImage = evt.dataTransfer.files[0];
    onDrop(fileImage);
  };
*/
  var avatarInputElement = document.querySelector('#avatar');
  var avatarWrapperElement = document.querySelector('.ad-form-header__preview');
  var avatarImageElement = avatarWrapperElement.querySelector('img');
  // var avatarDropZoneElement = document.querySelector('.ad-form-header__drop-zone');

  // var photoDropZoneElement = document.querySelector('.ad-form__drop-zone');
  var photoInputElement = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoWrapperElement = photoContainerElement.querySelector('.ad-form__photo');


  window.formPhoto = {
    activate: function () {
      /*
      avatarDropZoneElement.addEventListener('dragover', onDropZoneDragover);
      avatarDropZoneElement.addEventListener('dragleave', onDropZoneDrag);
      avatarDropZoneElement.addEventListener('drop', onDropZoneDrop);
      photoDropZoneElement.addEventListener('dragover', onDropZoneDragover);
      photoDropZoneElement.addEventListener('dragleave', onDropZoneDrag);
      photoDropZoneElement.addEventListener('drop', onDropZoneDrop);
*/
      avatarInputElement.addEventListener('change', onUserAvatarChange);
      photoInputElement.addEventListener('change', onOfferPreviewChange);
    },
    deactivate: function () {
      /*
      avatarDropZoneElement.removeEventListener('dragover', onDropZoneDragover);
      avatarDropZoneElement.removeEventListener('dragleave', onDropZoneDrag);
      avatarDropZoneElement.removeEventListener('drop', onDropZoneDrop);
      photoDropZoneElement.removeEventListener('dragover', onDropZoneDragover);
      photoDropZoneElement.removeEventListener('dragleave', onDropZoneDrag);
      photoDropZoneElement.removeEventListener('drop', onDropZoneDrop);
*/
      avatarInputElement.removeEventListener('change', onUserAvatarChange);
      photoInputElement.removeEventListener('change', onOfferPreviewChange);
    },
    reset: function () {
      resetAvatar();
      resetPreviewsPhoto();
    }
  };
})();

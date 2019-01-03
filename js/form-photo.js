'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var DROP_EFFECT = 'move';

  var ImageStyle = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px',
    ALT: 'Фото жилья'
  };

  var DropZoneStyle = {
    COLOR: '#ff5635',
    BORDER: '1px solid #c7c7c7'
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
        imageElement.alt = ImageStyle.ALT;
        imageElement.style.maxWidth = ImageStyle.WIDTH;
        imageElement.style.maxHeight = ImageStyle.HEIGHT;
        imageElement.style.borderRadius = ImageStyle.BORDER_RADIUS;

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

  var activateDropZone = function (dropZone, onDrop) {
    dropZone.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      dropZone.style.color = DropZoneStyle.COLOR;
      dropZone.style.border = DropZoneStyle.BORDER;
    });

    dropZone.addEventListener('dragleave', function (evt) {
      evt.preventDefault();
      dropZone.removeAttribute('style');
    });

    dropZone.addEventListener('drop', function (evt) {
      evt.preventDefault();
      dropZone.removeAttribute('style');

      var fileImage = evt.dataTransfer.files[0];
      onDrop(fileImage);
    });
  };

  var deactivateDropZone = function (dropZone) {
    dropZone.removeEventListener('dragover', function (evt) {
      evt.preventDefault();
      dropZone.removeAttribute('style');
    });
    dropZone.removeEventListener('dragleave', function (evt) {
      evt.preventDefault();
      dropZone.removeAttribute('style');
    });
    dropZone.removeEventListener('drop', function (evt) {
      evt.preventDefault();
      dropZone.removeAttribute('style');
    });
  };

  // ==========================================================

  function sortablePreview(rootElement, onUpdate) {
    var dragElement;
    var nextElement;

    // Делаем всех детей перетаскиваемыми
    [].slice.call(rootElement.children).forEach(function (itemElement) {
      itemElement.setAttribute('draggable', 'true');
      // itemElement.draggable = true;
    });

    // Фнукция отвечающая за сортировку
    function dragOver(evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = DROP_EFFECT;

      var target = evt.target;
      if (target && target !== dragElement && target.nodeName === 'DIV') {
        // Сортируем
        rootElement.insertBefore(dragElement, rootElement.children[0] !== target && target.nextSibling || target);
      }
    }

    // Окончание сортировки
    function dragEnd(evt) {
      evt.preventDefault();

      dragElement.classList.remove('hidden');
      rootElement.removeEventListener('dragover', dragOver, false);
      rootElement.removeEventListener('dragend', dragEnd, false);

      if (nextElement !== dragElement.nextSibling) {
        // Сообщаем об окончании сортировки
        onUpdate(dragElement);
      }
    }

    // Начало сортировки
    rootElement.addEventListener('dragstart', function (evt) {
      dragElement = evt.target; // Запоминаем элемент который будет перемещать
      nextElement = dragElement.nextSibling;

      // Ограничиваем тип перетаскивания
      evt.dataTransfer.effectAllowed = DROP_EFFECT;
      evt.dataTransfer.setData('text/plain', dragElement.textContent);

      // Пописываемся на события при dnd
      rootElement.addEventListener('dragover', dragOver, false);
      rootElement.addEventListener('dragend', dragEnd, false);

      setTimeout(function () {
        // Если выполнить данное действие без setTimeout, то
        // перетаскиваемый объект, будет иметь этот класс.
        dragElement.classList.add('hidden');
      }, 0);
    }, false);
  }

  // Используем
  sortablePreview(document.querySelector('.ad-form__photo-container'), function (item) {
    // eslint-disable-next-line no-console
    console.log(item);
  });

  // ==============================================


  var onUserAvatarChange = function () {
    var fileImage = avatarInputElement.files[0];
    chooseUserAvatar(fileImage);
  };

  var onOfferPreviewChange = function () {
    var previewImage = photoInputElement.files[0];
    chooseOfferImage(previewImage);
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
      activateDropZone(avatarDropZoneElement, chooseUserAvatar);
      activateDropZone(photoDropZoneElement, chooseOfferImage);

      avatarInputElement.addEventListener('change', onUserAvatarChange);
      photoInputElement.addEventListener('change', onOfferPreviewChange);
    },
    deactivate: function () {
      deactivateDropZone(avatarDropZoneElement);
      deactivateDropZone(photoDropZoneElement);
      avatarInputElement.removeEventListener('change', onUserAvatarChange);
      photoInputElement.removeEventListener('change', onOfferPreviewChange);
    },
    reset: function () {
      resetAvatar();
      resetPreviewsPhoto();
    }
  };
})();

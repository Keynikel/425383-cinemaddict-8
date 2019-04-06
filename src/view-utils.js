import {shake} from './utils';

// Обратная связь при указании рейтинга
export const blockRaitingInput = (element) => {
  const scoreButtons = element._element.querySelectorAll(`.film-details__user-rating-input`);
  scoreButtons.forEach(
      (button) => {
        const label = button.nextElementSibling;
        button.disabled = true;
        label.style.background = `#979797`;
      }
  );
};

export const unblockRaitingInput = (element) => {
  const scoreButtons = element._element.querySelectorAll(`.film-details__user-rating-input`);
  scoreButtons.forEach(
      (button) => {
        const label = button.nextSibling.nextSibling;
        button.disabled = false;
        if (button.checked) {
          label.style.background = `#ffe800`;
        } else {
          label.style.background = `#d8d8d8`;
        }

      }
  );
};

export const errorRaitingInput = (element) => {
  const scoreButtons = element._element.querySelectorAll(`.film-details__user-rating-input`);
  scoreButtons.forEach(
      (button) => {
        const label = button.nextSibling.nextSibling;
        button.disabled = false;
        if (button.checked) {
          label.style.background = `red`;
          shake(label);
        } else {
          label.style.background = `#d8d8d8`;
        }

      }
  );
};

// Обратная связь при комментировании
export const blockComment = (element) => {
  const inputField = element._element.querySelector(`.film-details__comment-input`);
  inputField.disabled = true;
  inputField.style.border = `1px solid #979797`;
  inputField.style.background = `#979797`;
};

export const unblockComment = (element) => {
  const inputField = element._element.querySelector(`.film-details__comment-input`);
  inputField.disabled = false;
  inputField.style.background = `#f6f6f6`;
  inputField.value = ``;
};

export const errorCOmment = (element) => {
  const inputField = element._element.querySelector(`.film-details__comment-input`);
  shake(inputField);
  inputField.disabled = false;
  inputField.style.background = `#f6f6f6`;
  inputField.style.border = `1px solid red`;
};

// Обртная связь при удалении комментария
export const blockRemoveButton = (element) => {
  const removeButton = element._element.querySelector(`.film-details__watched-reset`);
  removeButton.disabled = true;
  removeButton.style.color = `#979797`;
};

export const unblockRemoveButton = (element) => {
  const removeButton = element._element.querySelector(`.film-details__watched-reset`);
  removeButton.disabled = false;
  removeButton.style.color = `#9da4aa`;
};

export const errorRemoveButton = (element) => {
  const removeButton = element._element.querySelector(`.film-details__watched-reset`);
  shake(removeButton);
  removeButton.disabled = false;
  removeButton.style.color = `red`;
};

// Обратная связь при изменении состояния фильма с карточки
export const blockControls = (element) => {
  const userButtons = element._element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = `0.5`;
  });
};

export const unblockControls = (element) => {
  const userButtons = element._element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = `1`;
  });
};

export const errorControls = (element) => {
  shake(element._element);
  const userButtons = element._element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = `1`;
  });
};

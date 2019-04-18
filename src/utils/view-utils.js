import {shake, createElement} from './common-utils';

// Обратная связь при указании рейтинга
export const blockRaitingInput = (block) => {
  const scoreButtons = block.element.querySelectorAll(`.film-details__user-rating-input`);
  const scoreLabels = block.element.querySelectorAll(`.film-details__user-rating-label`);
  scoreButtons.forEach(
      (button, i) => {
        const label = scoreLabels[i];
        button.disabled = true;
        label.style.background = `#979797`;
      }
  );
};

export const unblockRaitingInput = (block) => {
  const scoreButtons = block.element.querySelectorAll(`.film-details__user-rating-input`);
  const scoreLabels = block.element.querySelectorAll(`.film-details__user-rating-label`);
  scoreButtons.forEach(
      (button, i) => {
        const label = scoreLabels[i];
        button.disabled = false;
        if (button.checked) {
          label.style.background = `#ffe800`;
        } else {
          label.style.background = `#d8d8d8`;
        }

      }
  );
};

export const errorRaitingInput = (block) => {
  const scoreButtons = block.element.querySelectorAll(`.film-details__user-rating-input`);
  const scoreLabels = block.element.querySelectorAll(`.film-details__user-rating-label`);
  scoreButtons.forEach(
      (button, i) => {
        const label = scoreLabels[i];
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
export const blockComment = (block) => {
  const inputField = block.element.querySelector(`.film-details__comment-input`);
  inputField.disabled = true;
  inputField.style.border = `1px solid #979797`;
  inputField.style.background = `#979797`;
};

export const unblockComment = (block) => {
  const inputField = block.element.querySelector(`.film-details__comment-input`);
  inputField.disabled = false;
  inputField.style.background = `#f6f6f6`;
  inputField.value = ``;
};

export const errorComment = (block) => {
  const inputField = block.element.querySelector(`.film-details__comment-input`);
  shake(inputField);
  inputField.disabled = false;
  inputField.style.background = `#f6f6f6`;
  inputField.style.border = `1px solid red`;
};

// Обртная связь при удалении комментария
export const blockRemoveButton = (block) => {
  const removeButton = block.element.querySelector(`.film-details__watched-reset`);
  removeButton.disabled = true;
  removeButton.style.color = `#979797`;
};

export const unblockRemoveButton = (block) => {
  const removeButton = block.element.querySelector(`.film-details__watched-reset`);
  removeButton.disabled = false;
  removeButton.style.color = `#9da4aa`;
};

export const errorRemoveButton = (block) => {
  const removeButton = block.element.querySelector(`.film-details__watched-reset`);
  shake(removeButton);
  removeButton.disabled = false;
  removeButton.style.color = `red`;
};

// Обратная связь при изменении состояния фильма с карточки
export const blockControls = (block) => {
  const userButtons = block.element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = `0.5`;
  });
};

export const unblockControls = (block) => {
  const userButtons = block.element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = `1`;
  });
};

export const errorControls = (block) => {
  shake(block.element);
  const userButtons = block.element.querySelectorAll(`.film-card__controls button`);
  userButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = `1`;
  });
};


export const renderElement = (container, element) => {
  container.innerHTML = ``;
  container.appendChild(element);
};

export const getUserStatus = (films) => {
  const watchedFilms = films.filter((film) => film.user_details.already_watched);
  if (watchedFilms.length <= 10) {
    return createElement(`novice`);
  } else {
    if (watchedFilms.length > 10 && watchedFilms.length <= 20) {
      return createElement(`fan`);
    } else {
      return createElement(`movie buff`);
    }
  }
};

export const getConnectionStatus = (status) => {
  return createElement(status);
};

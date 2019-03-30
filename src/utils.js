export const clearField = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

export const getRandomNumber = (min, max) => min - 0.5 + Math.random() * (max - min + 1);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const toggleVisuallity = (classToShow) => {
  const films = document.querySelector(`.films`);
  const stats = document.querySelector(`.statistic`);
  switch (classToShow) {
    case `films`:
      if (films.classList.contains(`visually-hidden`)) {
        films.classList.remove(`visually-hidden`);
        stats.classList.add(`visually-hidden`);
      }
      break;
    case `statistic`:
      if (stats.classList.contains(`visually-hidden`)) {
        stats.classList.remove(`visually-hidden`);
        films.classList.add(`visually-hidden`);
      }
      break;
  }
};

export const shake = (element) => {
  const ANIMATION_TIMEOUT = 600;
  element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, ANIMATION_TIMEOUT);
};

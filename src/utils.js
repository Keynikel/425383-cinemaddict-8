export const clearField = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

// случайное десятичное значение
export const getRandomNumber = (min, max) => min - 0.5 + Math.random() * (max - min + 1);

export const createElement = (template) => {
  const newElement = createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

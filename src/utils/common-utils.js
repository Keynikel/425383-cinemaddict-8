export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const shake = (element) => {
  element.style.animation = `shake 0.6s`;
  setTimeout(() => {
    element.style.animation = ``;
  }, 600);
};

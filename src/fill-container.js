import {getFilm} from './film';
import {getFilmsMarkup} from './make-card';
import * as utils from './utils';

/* Функция для заполнения контейнера карточками по клику на фильтр. v2.0 для функции, которая работает с массивом карточек */
export const generateCards = function (min, max, container, controls) {
  const cardsAmount = Math.round(utils.getRandomNumber(min, max));
  const cards = [];
  for (let i = 0; i < cardsAmount; i++) {
    cards.push(getFilm());
  }
  utils.clearField(container);
  container.insertAdjacentHTML(`beforeEnd`, getFilmsMarkup(cards, controls));
};

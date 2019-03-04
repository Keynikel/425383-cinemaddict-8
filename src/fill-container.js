import {getFilm} from './film.js';
import {getFilmsMarkup} from './make-card';
import * as additionl from './additional-functions';

/* Функция для заполнения контейнера карточками по клику на фильтр. v2.0 для функции, которая работает с массивом карточек */
export const generateCards = function (min, max, container, controls) {
  const cardsAmount = Math.round(additionl.getRandomNumber(min, max));
  const cards = [];
  for (let i = 0; i < cardsAmount; i++) {
    cards.push(getFilm());
  }
  additionl.clearField(container);
  container.insertAdjacentHTML(`beforeEnd`, getFilmsMarkup(cards, controls));
};

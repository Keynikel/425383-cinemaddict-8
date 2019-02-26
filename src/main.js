/* Импорты */
import {getFilter as makeFilter} from './make-filter';
import {getCard as makeFilmCard, getCardNoControls as makeFilmCardWithoutControls} from './make-card';
import * as additionl from './additional-functions';
import {film} from './film.js';

/* Переменные */
const MIN_CARDS = 1;
const MAX_CARDS = 10;
const filtersContainer = document.querySelector(`.main-navigation`);
const cardContainer = document.querySelector(`.films-list .films-list__container `);
const topRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const filtersList = [
  {
    'anchor': `all`,
    'state': `active`,
    'label': `All movies`
  },
  {
    'anchor': `whatchlist`,
    'label': `Whatchlist`,
    'count': 13
  },
  {
    'anchor': `history`,
    'label': `History`,
    'count': 4
  },
  {
    'anchor': `favorites`,
    'label': `Favorites`,
    'count': 8
  },
  {
    'anchor': `stats`,
    'state': `additional`,
    'label': `Stats`
  }
];
// const film = {
//   'title': `The Assassination Of Jessie James By The Coward Robert Ford`,
//   'rating': `9.8`,
//   'year': `2018`,
//   'duration': `1h&nbsp;13m`,
//   'genre': `Comedy`,
//   'poster': `./images/posters/three-friends.jpg`,
//   'description': `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
//   'comments': `13 comments`
// };


console.log(film);

/* Функция для заполнения контейнера карточками по клику на фильтр */
export const generateCards = function (min, max, container) {
  const cardsAmount = Math.floor(additionl.getRandomNumber(min, max));
  additionl.clearField(container);
  for (let i = 0; i < cardsAmount; i++) {
    container.insertAdjacentHTML(`beforeEnd`, makeFilmCard(film));
  }
};

/* Очищаем блоки на странице*/
additionl.clearField(filtersContainer);
//additionl.clearField(cardContainer);
topRatedContainer.forEach(function (extraContainer) {
  additionl.clearField(extraContainer);
});

/* Заполняем блоки сгенерированными данными*/
filtersList.forEach(function (filter) {
  filtersContainer.insertAdjacentHTML(`beforeEnd`, makeFilter(filter));
});

// for (let i = 0; i < 7; i++) {
//   cardContainer.insertAdjacentHTML(`beforeEnd`, makeFilmCard(film));
// }

// topRatedContainer.forEach(function (extraContainer) {
//   for (let i = 0; i < 2; i++) {
//     extraContainer.insertAdjacentHTML(`beforeEnd`, makeFilmCardWithoutControls(film));
//   }
// });

/* Добавляем обработчики событий в фильтры */
const filters = document.querySelectorAll(`.main-navigation__item `);
filters.forEach(function (filter) {
  filter.addEventListener(`click`, function () {
    generateCards(MIN_CARDS, MAX_CARDS, cardContainer);
  });
});

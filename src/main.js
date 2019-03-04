/* Импорты */
import {filtersList} from './filters';
import {getFilter as makeFilter} from './make-filter';
import {getFilm} from './film.js';
import {generateCards} from './fill-container';
import * as additionl from './additional-functions';


/* Переменные */
const MIN_CARDS = 1;
const MAX_CARDS = 10;
const filtersContainer = document.querySelector(`.main-navigation`);
const cardContainer = document.querySelector(`.films-list .films-list__container `);
const topRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const cardsList = []; // структура, которая описывает все карточки. Мы будем использовать для этого обычный массив.
const topRatedCardsList = [];


/* Очищаем блоки на странице*/
additionl.clearField(filtersContainer);
additionl.clearField(cardContainer);
topRatedContainer.forEach(function (extraContainer) {
  additionl.clearField(extraContainer);
});

/* Заполняем блоки сгенерированными данными*/
filtersList.forEach(function (filter) {
  filtersContainer.insertAdjacentHTML(`beforeEnd`, makeFilter(filter));
});

/* Наполняем массив карточками фильмов */
for (let i = 0; i < 7; i++) {
  cardsList.push(getFilm());
}

/* Генерируем карточки популярных фильмов*/
for (let i = 0; i < 2; i++) {
  topRatedCardsList.push(getFilm());
}

/* Наполняем карточками контейнер */
generateCards(7, 7, cardContainer, true);
topRatedContainer.forEach(function (extraContainer) {
  generateCards(2, 2, extraContainer, false);
});

/* Добавляем обработчики событий в фильтры */
const filters = document.querySelectorAll(`.main-navigation__item `);
filters.forEach(function (filter) {
  filter.addEventListener(`click`, function () {
    generateCards(MIN_CARDS, MAX_CARDS, cardContainer, true);
  });
});

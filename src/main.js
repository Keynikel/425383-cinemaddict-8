/* Импорты */
import {filtersList} from './filters';
import {getFilter as makeFilter} from './make-filter';
import {getFilm} from './film.js';
import {generateCards} from './fill-container';
import * as utils from './utils';
import {Film} from './film.js';


/* Переменные */

const cardContainer = document.querySelector(`.films-list .films-list__container `);


const firstCard = new Film(getFilm());
console.log(firstCard);

/* Импорты */
import {getFilm} from './get-film.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import {clearField} from './utils';


/* Переменные */

const cardContainer = document.querySelector(`.films-list .films-list__container `);
const bodyContainer = document.querySelector(`body`);
const film = getFilm();
const filmCard = new Film(film);
const filmPopup = new Popup(film);

clearField(cardContainer);
cardContainer.appendChild(filmCard.render());

filmCard.onClick = () => {

};

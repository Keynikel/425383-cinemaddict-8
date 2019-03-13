/* Импорты */
import {getFilm} from './get-film.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import {clearField} from './utils';


/* Переменные */

const cardContainer = document.querySelector(`.films-list .films-list__container `);
const bodyContainer = document.querySelector(`body`);
const filmArray = [];
const popupArray = [];

for (let i = 0; i < 7; i++) {
  const film = getFilm();
  filmArray[i] = new Film(film);
  popupArray[i] = new Popup(film);
}

clearField(cardContainer);
filmArray.forEach(function (film, index) {
  cardContainer.appendChild(film.render());

  film.onClick = () => {
    bodyContainer.appendChild(popupArray[index].render());
  };
});

popupArray.forEach(function (popup) {
  popup.onClick = () => {
    popup.unrender();
  };
});

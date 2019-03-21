/* Импорты */
import {getFilm} from './get-film.js';
import {Film} from './film.js';
import {FilmPopup} from './film-popup.js';
import {clearField} from './utils';


/* Переменные */

const cardContainer = document.querySelector(`.films-list .films-list__container `);
const bodyContainer = document.querySelector(`body`);
// const filmArray = [];
// const popupArray = [];

// for (let i = 0; i < 7; i++) {
//   const film = getFilm();
//   filmArray.push(new Film(film));
//   popupArray.push(new FilmPopup(film));
// }
//
// clearField(cardContainer);
// filmArray.forEach(function (film, index) {
//   cardContainer.appendChild(film.render());
//
//   film.onClick = () => {
//     bodyContainer.appendChild(popupArray[index].render());
//   };
// });
//
// popupArray.forEach(function (popup) {
//   popup.onClick = () => {
//     popup.unrender();
//   };
//
//   popup.onChange = (newObject) => {
//     popup.
//   }
// });


const film = getFilm();
const card = new Film(film);
const popup = new FilmPopup(film);

clearField(cardContainer);

cardContainer.appendChild(card.render());
card.onClick = () => {
  bodyContainer.appendChild(popup.render());
};

popup.onClick = () => {
  popup.unrender();
};

popup.onChange = (newObject) => {
  film.yourScore = newObject;
  popup.update(film);
  popup.unrender();
  bodyContainer.appendChild(popup.render());
};

popup.onEnter = (newComments) => {
  film.comments.push(newComments);
  popup.update(film);
  card.update(film);
  card.unrender();
  cardContainer.appendChild(card.render());
  popup.unrender();
  bodyContainer.appendChild(popup.render());
};

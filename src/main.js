import {API} from './api.js';

import * as consts from './const.js';
import {renderElement, getConnectionStatus, getUserStatus} from './view-utils.js';
import {renderInterface} from './renders.js';

const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const filmsCountContainer = document.querySelector(`.footer__statistics p`);
const userStatusContainer = document.querySelector(`.profile__rating`);

const api = new API({endPoint: consts.END_POINT, authorization: consts.AUTHORIZATION});


let cardsCount = 0;


renderElement(cardsContainer, getConnectionStatus(consts.START_STRING));
api.getFilmsCount()
  .then((response) => {
    const ALL_FILMS_COUNT = response.length; // общее количество фильмов в системе

    renderElement(userStatusContainer, getUserStatus(response));

    filmsCountContainer.innerHTML = `${ALL_FILMS_COUNT} movies inside`;
  })
  .then(() => {
    api.getFilms()
      .then((films) => {
        renderInterface(films, cardsCount + consts.FILMS_LOADING_STEP);
      });
  })
  .catch((err) => {
    renderElement(cardsContainer, getConnectionStatus(consts.ERROR_STRING));
    console.log(err);
  });

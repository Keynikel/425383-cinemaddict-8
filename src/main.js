import API from './api';

import {FILMS_LOADING_STEP} from './data/data';
import {Authorize, LoadingInfo} from './data/enum';
import {renderElement, getConnectionStatus, getUserStatus} from './utils/view-utils';
import {renderInterface} from './controllers/renders';

const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const filmsCountContainer = document.querySelector(`.footer__statistics p`);
const userStatusContainer = document.querySelector(`.profile__rating`);
const api = new API({endPoint: Authorize.END_POINT, authorization: Authorize.KEY});


let cardsCount = 0;


renderElement(cardsContainer, getConnectionStatus(LoadingInfo.START_STRING));
api.getFilmsCount()
  .then((response) => {
    const ALL_FILMS_COUNT = response.length; // общее количество фильмов в системе

    renderElement(userStatusContainer, getUserStatus(response));

    filmsCountContainer.innerHTML = `${ALL_FILMS_COUNT} movies inside`;
  })
  .then(() => {
    api.getFilms()
      .then((films) => {
        renderInterface(films, cardsCount + FILMS_LOADING_STEP);
      });
  })
  .catch(() => {
    renderElement(cardsContainer, getConnectionStatus(LoadingInfo.ERROR_STRING));
  });

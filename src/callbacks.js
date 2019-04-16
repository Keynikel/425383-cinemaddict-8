import {API} from './api.js';
const api = new API({endPoint: consts.END_POINT, authorization: consts.AUTHORIZATION});

import * as consts from './const.js';
import * as view from './view-utils.js';
import * as renders from './renders.js';
import * as moment from 'moment';

const bodyContainer = document.querySelector(`body`);
const userStatusContainer = document.querySelector(`.profile__rating`);

export const createCommonCallbacks = (card, popup, film, allFilms) => {
  card.onClick = () => {
    bodyContainer.appendChild(popup.render());
  };

  popup.onClick = () => {
    popup.unrender();
  };

  popup.onChange = (newScore) => {
    film.yourScore = newScore;

    view.blockRaitingInput(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateUserScore();
      view.unblockRaitingInput(popup);
    })
   .catch(() => {
     view.errorRaitingInput(popup);
   });
  };

  popup.onEnter = (newComments) => {
    film.comments.push(newComments);

    view.blockComment(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      card.update(newFilm);
      popup.updateComments();
      view.unblockComment(popup);
    })
    .catch(() => {
      view.errorCOmment(popup);
    });
  };

  popup.onAddToWatchList = (evt) => {
    evt.preventDefault();
    film.state.isListed = !film.state.isListed;

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateFilmDetails(`listed`);
    });
    renders.renderFilters(consts.FILTERS_DATA, allFilms);
  };

  popup.onAddToWatched = (evt) => {
    evt.preventDefault();
    film.state.isWatched = !film.state.isWatched;
    if (film.state.isWatched) {
      film._watchingDate = null;
    } else {
      film._watchingDate = moment().valueOf();
    }
    if (film.state.isWatched && film.state.isListed) {
      film.state.isListed = !film.state.isListed;
    }

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateFilmDetails(`watched`);
      api.getFilmsCount()
        .then((response) => {
          view.renderElement(userStatusContainer, view.getUserStatus(response));
        });
      renders.renderFilters(consts.FILTERS_DATA, allFilms);
    });
  };

  popup.onAddToFavorite = (evt) => {
    evt.preventDefault();
    film.state.isFavorite = !film.state.isFavorite;

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateFilmDetails(`favorite`);
    });
    renders.renderFilters(consts.FILTERS_DATA, allFilms);
  };

  popup.onDelete = () => {
    film.comments.pop();

    view.blockRemoveButton(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      card.update(newFilm);
      popup.updateComments();
      popup.updateCommentsControls();
      view.unblockRemoveButton(popup);
    })
    .catch(() => {
      view.errorRemoveButton(popup);
    });
  };
};

export const createSpetialCallbacks = (card, popup, film, allFilms) => {
  card.onAddToWatchList = (evt) => {
    evt.preventDefault();
    film.state.isListed = !film.state.isListed;

    view.blockControls(card);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      view.unblockControls(card);
      renders.renderFilters(consts.FILTERS_DATA, allFilms);
    })
    .catch(() => {
      view.errorControls(card);
    });
  };

  card.onAddToWatched = (evt) => {
    evt.preventDefault();
    film.state.isWatched = !film.state.isWatched;
    if (film.state.isWatched) {
      film._watchingDate = moment().valueOf();
    } else {
      film._watchingDate = null;
    }
    if (film.state.isWatched && film.state.isListed) {
      film.state.isListed = !film.state.isListed;
    }

    view.blockControls(card);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      view.unblockControls(card);
      renders.renderFilters(consts.FILTERS_DATA, allFilms);
      api.getFilmsCount()
        .then((response) => {
          view.renderElement(userStatusContainer, view.getUserStatus(response));
        });

      renders.renderFilters(consts.FILTERS_DATA, allFilms);
    })
    .catch(() => {
      view.errorControls(card);
    });
  };

  card.onAddToFavorite = (evt) => {
    evt.preventDefault();
    film.state.isFavorite = !film.state.isFavorite;

    view.blockControls(card);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      view.unblockControls(card);
      renders.renderFilters(consts.FILTERS_DATA, allFilms);
    })
    .catch(() => {
      view.errorControls(card);
    });
  };
};
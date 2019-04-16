import ModelFilm from './models/model-film';
import {METHOD} from './data/enum';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilmsCount() {
    return this._load({url: `movies`})
    .then(toJSON);
  }

  getFilms() {
    return this._load({url: `movies`})
    .then(toJSON)
    .then((response) => ModelFilm.parseFilms(response));
  }

  updateFilm({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // console.error(`fetch error: ${err}`);
        throw err;
      });
  }
};

export default API;

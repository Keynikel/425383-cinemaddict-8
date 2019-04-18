class ModelFilm {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info.title;
    this.alternative = data.film_info.alternative_title;
    this.rating = data.film_info.total_rating;
    this.age = data.film_info.age_rating;
    this.yourScore = data.user_details.personal_rating;
    this.year = data.film_info.release.date;
    this.country = data.film_info.release.release_country;
    this.director = data.film_info.director;
    this.actors = data.film_info.actors;
    this.writers = data.film_info.writers;
    this.duration = data.film_info.runtime;
    this.genre = data.film_info.genre;
    this.poster = data.film_info.poster;
    this.description = data.film_info.description;
    this.comments = data.comments;
    this.state = {
      isListed: data.user_details.watchlist,
      isWatched: data.user_details.already_watched,
      isFavorite: data.user_details.favorite
    };
    this.watchingDate = data.user_details.watching_date;
  }

  toRAW() {
    return {
      'id': this.id,
      'user_details': {
        'already_watched': this.state.isWatched,
        'favorite': this.state.isFavorite,
        'personal_rating': this.yourScore,
        'watchlist': this.state.isListed
      },
      'comments': this.comments
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }

  static parseCountedFilms(data, count) {
    return data.map(ModelFilm.parseFilm).slice(0, count);
  }
}

export default ModelFilm;

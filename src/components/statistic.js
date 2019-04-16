import Component from './component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import {createElement} from '../utils/common-utils';
import {CHART_FILTERS} from '../data/data';


class Statistic extends Component {
  constructor(data) {
    super();
    this._films = data;
    this._filteredFilms = data;
    this._duration = this._countTotalDuration(this._filteredFilms);
    this._watches = this._filteredFilms.length;
    this._genres = this._formGenresArray(this._filteredFilms);

    this._element = null;
    this._chart = null;

    this._onFilter = this._onFilter.bind(this);
  }

  get template() {
    return `
      <section class="statistic">

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${CHART_FILTERS.map((filter) => `<input type="radio" class="statistic__filters-input visually-hidden"
        name="statistic-filter" id="${filter.id}" value="${filter.value}" ${filter.checked ? `checked` : ``}>
        <label for="${filter.id}" class="statistic__filters-label">${filter.label}</label>`).join(``)}
      </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._watches} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._duration.hours} <span class="statistic__item-description">h</span> ${this._duration.minutes}  <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${Object.keys(this._genres).length ? this._sortGenresByPopular(this._genres)[0] : `Nothing`}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`
      .trim();
  }

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    this._generateCharts();
    return this._element;
  }

  update() {
    this._genres = this._formGenresArray(this._filteredFilms);
    this._watches = this._filteredFilms.length;
    this._duration = this._countTotalDuration(this._filteredFilms);
    this._chart.destroy();
    this._updateStatisticMarkup();
    this._generateCharts();
  }

  _countTotalDuration(data) {
    let duration = 0;
    const result = {};
    Object.values(data).forEach((it) => {
      duration += it.duration;
    });
    result.hours = (moment.duration(duration, `minutes`).days() * 24) + moment.duration(duration, `minutes`).hours();
    result.minutes = moment.duration(duration, `minutes`).minutes();
    return result;
  }

  _findTopGenre(genres) {
    return genres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
  }

  _formGenresArray(data) {
    let genres = [];
    Object.values(data).forEach((it) => {
      genres.push(it.genre);
    });
    if (genres.length) {
      return genres.reduce((acc, item) => {
        let buffer = this._findTopGenre(item);
        Object.keys(buffer).forEach((key) => {
          if (acc[key]) {
            acc[key] += buffer[key];
          } else {
            acc[key] = buffer[key];
          }
        });
        return acc;
      }, {});
    } else {
      return genres;
    }
  }

  _sortGenresByPopular(genres) {
    let keysSorted = Object.keys(genres).sort(function (a, b) {
      return genres[b] - genres[a];
    });
    return keysSorted;
  }

  _generateCharts() {
    const BAR_HEIGHT = 50;
    const statisticWrapper = this._element.querySelector(`.statistic__chart`);
    const labels = this._sortGenresByPopular(this._genres);
    const data = [];

    statisticWrapper.height = BAR_HEIGHT * labels.length;
    labels.forEach((it) => {
      data.push(this._genres[it]);
    });
    this._chart = new Chart(statisticWrapper, Statistic._getChart());

    this._chart.data = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
        },
      ],
    };
    this._chart.update();
  }

  _updateStatisticMarkup() {
    const container = this._element.querySelector(`.statistic__text-list`);
    const statMarkup = `
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watches} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${this._duration.hours} <span class="statistic__item-description">h</span> ${this._duration.minutes}  <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${Object.keys(this._genres).length ? this._sortGenresByPopular(this._genres)[0] : `Nothing`}</p>
      </li>`.trim();
    container.innerHTML = statMarkup;
  }

  _onFilter() {
    const filter = this._element.querySelector(`.statistic__filters-input:checked`).value;
    switch (filter) {
      case `all-time`:
        this._filteredFilms = this._films;
        break;
      case `today`:
        this._filteredFilms = this._films.filter((film) => moment(film.watchingDate).isSame(moment(), `day`));
        break;
      case `week`:
        this._filteredFilms = this._films.filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`week`), moment().endOf(`week`)));
        break;
      case `month`:
        this._filteredFilms = this._films.filter((film) => moment(film.watchingDate).isSame(moment(), `month`));
        break;
      case `year`:
        this._filteredFilms = this._films.filter((film) => moment(film.watchingDate).isSame(moment(), `year`));
        break;
    }
    this.update();
  }

  createListeners() {
    this._element.querySelectorAll(`.statistic__filters-input`)
      .forEach((filter) => filter.addEventListener(`change`, this._onFilter));
  }

  removeListeners() {
    this._element.querySelectorAll(`.statistic__filters-input`)
      .forEach((filter) => filter.removeEventListener(`change`, this._onFilter));
  }

  static _getChart() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      options: {
        plugins: {
          datalabels: {
            font: {size: 20},
            color: `#fff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#fff`,
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {display: false},
        tooltips: {enabled: false},
      },
    };
  }
}

export default Statistic;

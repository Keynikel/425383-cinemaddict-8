import {Component} from './component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';


export class Statistic extends Component {
  constructor(data) {
    super();
    this._genres = this._formGenresArray(data);
    this._watches = this._countWatchedFilms(data);
    this._duration = this._countTotalDuration(data);
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
      if (it.state.isWatched) {
        genres.push(it.genre);
      }
    });
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
  }

  _sortGenresByPopular(genres) {
    let keysSorted = Object.keys(genres).sort(function (a, b) {
      return genres[b] - genres[a];
    });
    return keysSorted;
  }

  _countWatchedFilms(data) {
    let allTime = 0;
    Object.values(data).forEach((it) => {
      if (it.state.isWatched) {
        allTime++;
      }
    });
    return allTime;
  }

  _countTotalDuration(data) {
    let duration = 0;
    const result = {};
    Object.values(data).forEach((it) => {
      if (it.state.isWatched) {
        duration += it.duration;
      }
    });
    result.hours = moment.duration(duration, `minutes`).hours();
    result.minutes = moment.duration(duration, `minutes`).minutes();
    return result;
  }

  update(data) {
    this._genres = this._formGenresArray(data);
    this._watches = this._countWatchedFilms(data);
    this._duration = this._countTotalDuration(data);
  }

  get template() {
    return `
      <section class="statistic visually-hidden">
        <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
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
            <p class="statistic__item-text">${this._sortGenresByPopular(this._genres)[0]}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`
      .trim();
  }

  chartView() {
    const statisticCtx = document.querySelector(`.statistic__chart`);
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;
    const labels = this._sortGenresByPopular(this._genres);
    const data = [];
    labels.forEach((it) => {
      data.push(this._genres[it]);
    });

    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
    return myChart;
  }


}

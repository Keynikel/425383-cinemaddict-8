export const FILMS_LOADING_STEP = 5;

export const FILTERS_DATA = [
  {
    name: `All movies`,
    anchor: `all`,
    state: `active`
  },
  {
    name: `Watchlist`,
    anchor: `watchlist`
  },
  {
    name: `History`,
    anchor: `history`
  },
  {
    name: `Favorites`,
    anchor: `favorites`
  },
  {
    name: `Stats`,
    anchor: `stats`,
    state: `additional`
  }
];

export const CHART_FILTERS = [
  {
    label: `All time`,
    id: `statistic-all-time`,
    value: `all-time`,
    checked: true
  },
  {
    label: `Today`,
    id: `statistic-today`,
    value: `today`
  },
  {
    label: `Week`,
    id: `statistic-week`,
    value: `week`
  },
  {
    label: `Month`,
    id: `statistic-month`,
    value: `month`
  },
  {
    label: `Year`,
    id: `statistic-year`,
    value: `year`},
];

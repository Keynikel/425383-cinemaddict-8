export const getFilters = () => {
  return [
    {
      label: `All movies`,
      anchor: `all`,
      state: `active`
    },
    {
      label: `Watchlist`,
      anchor: `watchlist`,
      count: 13
    },
    {
      label: `History`,
      anchor: `history`,
      count: 4
    },
    {
      label: `Stats`,
      anchor: `stats`,
      state: `additional`
    }
  ];
};

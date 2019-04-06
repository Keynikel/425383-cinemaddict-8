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
    },
    {
      label: `History`,
      anchor: `history`,
    },
    {
      label: `Stats`,
      anchor: `stats`,
      state: `additional`
    }
  ];
};

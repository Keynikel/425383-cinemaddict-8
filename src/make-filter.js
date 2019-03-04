export const getFilter = function (filter) {
  return `
    <a href="#${filter.anchor}"
      class="main-navigation__item  ${filter.state ? `main-navigation__item--` + filter.state : ``}">
      ${filter.label}
      ${filter.count ? `<span class="main-navigation__item-count">` + filter.count + `</span>` : ``}
      </a>`;
};

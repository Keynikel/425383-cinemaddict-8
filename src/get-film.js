import * as utils from './utils';
let moment = require(`moment`);

const MIN_RATING = 1;
const MAX_RATING = 10;

const titles = [`Once Upon a Time in Hollywood`, `Joker`, `Dumbo`, `Zeroville`, `The Batman`, `Spider-Man: Far From Home`, `Aladdin`, `Dune`, `It: Chapter Two`, `Bond  25`, `The Lion King`, `Dark Phoenix`, `Avengers: Endgame`, `John Wick: Chapter 3 - Parabellum`, `Men in Black International`];
const genres = [`Comedy`, `Thriller`, `Horror`, `Adventure `, `Drama`, `Crime`, `Sci-fi`];
const posters = [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`];
const descriptionsFish = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

/* Генерация описания фаильма. На вход подаем массив, в функции генерируем случайное количество предложений от 1 до 3 и выбираем в массиве случайные значения. Объедиянем в строку, в конце ее возвращаем*/
const generateDescription = (descriptionArray) => {
  const amount = Math.round(utils.getRandomNumber(1, 3));
  let description = ``;
  for (let i = 1; i <= amount; i++) {
    const key = Math.floor(utils.getRandomNumber(1, descriptionArray.length - 1));
    const frase = descriptionArray[key];
    description += frase + `. `;
  }
  return description;
};

/*
  заголовок-случайный из массива titles
  рейтинг - число от MIN_RATING до MAX_RATING с точностью до десятых
  год - число от MIN_YEAR до MAX_YEAR
  длительность - часов от MIN_HOURS до MAX_HOURS, минут от 5 до 60
  жанр - случаный из массива genres
  постер - случайный из массива posters
  комментарии - случайное число от MIN_COMMENTS до MAX_COMMENTS,
  если 1 то подпись comment, любое другое значение - comments
*/
export const getFilm = () => ({
  title: titles[Math.floor(Math.random() * titles.length)],
  rating: (utils.getRandomNumber(MIN_RATING, MAX_RATING)).toFixed(1),
  year: `2015-03-12`,
  duration: `2:15`,
  genre: genres[Math.floor(Math.random() * genres.length)],
  poster: `./images/posters/${posters[Math.floor(Math.random() * posters.length)]}`,
  description: generateDescription(descriptionsFish.split(`. `)),
  comments: [
    {
      icon: `😴`,
      text: `So long-long story, boring!`,
      author: `Tim Macoveev`,
      date: moment().add(5, `days`)
    },
    {
      icon: `😐`,
      text: `Wll its totally okey`,
      author: `Olika Kell`,
      date: moment().add(2, `days`)
    }
  ],
  yourScore: (Math.round(utils.getRandomNumber(MIN_RATING, MAX_RATING))),

});

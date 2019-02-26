import * as additional from './additional-functions';

const MIN_RATING = 1;
const MAX_RATING = 10;
const MIN_YEAR = 1991;
const MAX_YEAR = 2019;
const MIN_HOURS = 1;
const MAX_HOURS = 3;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 40;

/* todo: поменяить тип структуры на set*/
const titlesArray = [`Once Upon a Time in Hollywood`, `Joker`, `Dumbo`, `Zeroville`, `The Batman`, `Spider-Man: Far From Home`, `Aladdin`, `Dune`, `It: Chapter Two`, `Bond  25`, `The Lion King`, `Dark Phoenix`, `Avengers: Endgame`, `John Wick: Chapter 3 - Parabellum`, `Men in Black International`];
const genreSet = [`Comedy`, `Thriller`, `Horror`, `Adventure `, `Drama`, `Crime`, `Sci-fi`];
const posters = [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`];

/* проверить, как еще это можно сделать*/
const descriptionsFish = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
console.log(descriptionsFish.split('. '));
/*
заголовок-случайный из массива titlesArray
рейтинг - число от 1 до 10 с точностью до десятых
год - число от 1991 до 2019
длительность - часов от 1 до 3, минут от 5 до 60


*/
export const film = {
  title: titlesArray[Math.floor(Math.random() * titlesArray.length)],
  rating: (additional.getRandomNumber(MIN_RATING, MAX_RATING)).toFixed(1),
  year: Math.floor(additional.getRandomNumber(MIN_YEAR, MAX_YEAR)),
  duration: `${Math.floor(additional.getRandomNumber(MIN_HOURS, MAX_HOURS))}h ${Math.floor(additional.getRandomNumber(5, 60))}m`,
  genre: genreSet[Math.floor(Math.random() * genreSet.length)],
  poster: `./images/posters/${posters[Math.floor(Math.random() * posters.length)]}`,
  description: ``,
  comments: `${Math.floor(additional.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)) === 1 ? Math.floor(additional.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)) + ` comment` : Math.floor(additional.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)) + ` comments` }`
};

/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const { pool } = require('./index.js');

faker.locale = 'en';

const urlSeed = ['test1.url', 'test2.url', 'test3.url', 'test4.url', 'test5.url', 'test6.url', 'test7.url'];

const createSeed = (num) => {
  const queryString = 'INSERT INTO reviews (userName, postDate, title, review, rating, recommended, images) VALUES ($1,$2,$3,$4,$5,$6,$7)';
  let params;
  let date;
  for (let i = 0; i < num; i += 1) {
    date = JSON.stringify(faker.date.past(10, '2019-05-01')).slice(0, 11).split("-").join("");
    params = [
      faker.name.findName(),
      moment(date, 'YYYYMMDD').fromNow(),
      faker.lorem.sentence(),
      faker.lorem.paragraph(),
      faker.random.number({
        min: 0,
        max: 5,
      }),
      faker.random.boolean(),
      'randomUrl.url',
    ];
    // if (i % 7 === 0) {
    //   params[params.length - 1] = urlSeed.shift();
    // }
    pool.query(queryString, params, (err) => {
      if (err) {
        return console.error(err.message);
      }
    });
  }
};

createSeed(100);

module.exports = createSeed;

const Yelp = require('yelp');
const YelpV3 = require('yelp-v3');

const config = require('../../config');

const yelpV3 = new YelpV3({
  access_token: config.yelpAccessToken
});

const yelp = new Yelp({
  consumer_key: config.yelpConsumerKey,
  consumer_secret: config.yelpConsumerSecret,
  token: config.yelpToken,
  token_secret: config.yelpTokenSecret
});

function replaceDiacritics(str) {

  const diacritics = [
    {char: 'A', base: /[\300-\306]/g},
    {char: 'a', base: /[\340-\346]/g},
    {char: 'E', base: /[\310-\313]/g},
    {char: 'e', base: /[\350-\353]/g},
    {char: 'I', base: /[\314-\317]/g},
    {char: 'i', base: /[\354-\357]/g},
    {char: 'O', base: /[\322-\330]/g},
    {char: 'o', base: /[\362-\370]/g},
    {char: 'U', base: /[\331-\334]/g},
    {char: 'u', base: /[\371-\374]/g},
    {char: 'N', base: /[\321]/g},
    {char: 'n', base: /[\361]/g},
    {char: 'C', base: /[\307]/g},
    {char: 'c', base: /[\347]/g}
  ];

  diacritics.forEach(function(letter){
    str = str.replace(letter.base, letter.char);
  });

  return str;
}

module.exports.index = function(req, res) {
  const { term, location } = req.body;

  yelpV3.search({ term, location })
    .then(data => res.send(data))
    .catch(function (err) {
      console.log('err', err);
      res.status(500).send('Yelp Error!');
    });
};

module.exports.show = function(req, res) {
  yelpV3.businesses(replaceDiacritics(req.body.id))
    .then(business => {
      yelp.business(business.id)
        .then(data => {
          res.send({
            ...business,
            neighborhoods: data.location ? data.location.neighborhoods : []
          })

        })
        .catch(console.error);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    });
};

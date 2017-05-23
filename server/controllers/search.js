const compact = require('lodash/compact');
const size = require('lodash/size');
const isObject = require('lodash/isObject');
const { Base64 } = require('js-base64');
const axios = require('axios');
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

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

function addBase64Id(obj) {
  return {
    ...obj,
    id: Base64.encode(JSON.stringify(obj))
  };
}

module.exports.index = function(req, res) {
  const { term, location, page } = req.query;

  const limit = 50;

  const url = [
    `${config.parseHostURI}/Location?count=1`,
    limit ? `&limit=${limit}` : null,
    page && (page > 1) ? `&skip=${(page - 1) * limit}` : null,
    `&where=${JSON.stringify({
      name: { $regex: term, $options: 'i' },
      $or: [
        { metro_city: { $regex: location, $options: 'i' } },
        { 'metro_city2.name': { $regex: location, $options: 'i' } },
      ]
    })}`
  ].join('');

  console.log('url', url);

  axios.get(url, { headers })
    .then(({ data: { results, count } }) => {
      console.log('count', count, size(results));
      if (size(results) > 0) {
        res.json({
          total_count: count,
          items: results.map(({ objectId, name, phone, address, category, yelp_id }) => addBase64Id({
            id: objectId,
            name,
            phone,
            address,
            category,
            yelp_id,
            type: 'Location'
          }))
        });
      } else {
        yelpV3.search({ term, location, limit, offset: page ? (page - 1) * limit : null })
          .then(({ businesses, total }) => {

            res.json({
              total_count: total,
              items: businesses.map(({ id, name, phone, location, categories }) => addBase64Id({
                id,
                name,
                phone,
                address: isObject(location) ? compact([location.address1, location.address2, location.address3]).join(', ') : null,
                category: (categories || []).map(c => c.title).join(', '),
                yelp_id: id,
                type: 'Yelp'
              }))
            });
          })
          .catch(err => {
            console.log('err', err);
            res.status(500).send('Yelp Error!');
          });
      }
    })
    .catch(err => {

      console.log('err', err);
      res.status(500).json({ error: 'Something went wrong' })
    });
};
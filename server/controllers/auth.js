const isObject = require('lodash/isObject');
const compact = require('lodash/compact');
const first = require('lodash/first');
const omit = require('lodash/omit');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const Promise = require('bluebird');

const config = require('../../config');

const stripe = require('stripe')(config.stripeApiKey);

const Partner = require('../models/partner');

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

function tokenForPartner(partner) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: partner.objectId, iat: timestamp }, config.authSecret);
}

function persistLocation({ business }) {
  return new Promise(function(resolve, reject) {
    if (business.type === 'Location') {
      resolve({
        __type: 'Pointer',
        className: 'Location',
        objectId: business.id
      });
    } else {
      axios.post(`http://${config.host}${config.port ===  80 ? '' : `:${config.port}`}/yelp/show`, { id: business.yelp_id })
        .then(({ data: yelpData }) => axios.post(`${config.parseHostURI}/Location`, {
          yelp_id: yelpData.id,
          name: yelpData.name,
          address: isObject(yelpData.location) ? compact([yelpData.location.address1, yelpData.location.address2, yelpData.location.address3]).join(', ') : null,
          phone: yelpData.display_phone,
          category: (yelpData.categories || []).map(c => c.title).join(', '),
          neighborhood: (yelpData.neighborhoods || []).join(', '),
          metro_city: isObject(yelpData.location) ? compact([yelpData.location.city, yelpData.location.state]).join(', ') : null,
          latitude: isObject(yelpData.coordinates) ? yelpData.coordinates.latitude : null,
          longitude: isObject(yelpData.coordinates) ? yelpData.coordinates.longitude : null,
          rating: yelpData.rating,
          neighborhoods: yelpData.neighborhoods || [],
          hours: yelpData.hours && yelpData.hours[0] ? yelpData.hours[0].open : []
        }, { headers })
          .then(({ data: locationData }) => resolve({
            __type: 'Pointer',
            className: 'Location',
            objectId: locationData.objectId
          }))
          .catch(err => reject(err)))
        .catch(err => reject(err));
    }
  });
}

exports.token = function (req, res) {
  axios.get(`${config.parseHostURI}/Partner/${req.user.get('_id')}`, { headers })
    .then(({ data }) => {

      console.log('data', data, {
        token: tokenForPartner(data),
        user: omit(data, 'password') || data
      });
      res.json({
        token: tokenForPartner(data),
        user: omit(data, 'password') || data
      });
    })
    .catch(err => {
      console.log('token err', err);
      res.status(500).json({ error: 'Something went wrong' })
    });
};

exports.signin = function(req, res) {
  res.send({ token: tokenForPartner(req.user), user: req.user });
};

exports.signup = function({
  body: {
    email,
    password,
    first_name,
    last_name,
    personal_phone,
    job_title,
    business
  }
}, res, next) {
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  Partner.findOne({ email }, (err, existingPartner) => {
    if (err) { return next(err); }

    if (existingPartner) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      persistLocation({ business })
        .then(location => {
          stripe.customers.create({ email })
            .then(customer =>
              axios.post(`${config.parseHostURI}/Partner`, {
                email,
                password: hash,
                is_partner: true,
                first_name,
                last_name,
                personal_phone,
                job_title,
                location,
                stripe_customer_id: customer.id
              }, { headers })
                .then(({ data }) => axios.get(`${config.parseHostURI}/Partner?where=${JSON.stringify({ email })}`, { headers })
                  .then(response => res.json({
                    token: tokenForPartner(data),
                    user: omit(first(response.data.results), 'password') || data
                  }))
                  .catch(err1 => res.status(500).json({ err1: console.log('err1', err1), error: 'Something went wrong' })))
                .catch(err2 => res.status(500).json({ err2: console.log('err2', err2), error: 'Something went wrong' }))
            )
            .catch(err3 => res.status(500).json({ err3: console.log('err3', err3), error: 'Something went wrong' }));
        })
          .catch(err4 => res.status(500).json({ err4: console.log('err4', err4), error: 'Something went wrong' }));
    });
  });
};

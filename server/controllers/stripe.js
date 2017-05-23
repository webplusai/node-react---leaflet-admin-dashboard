const keys = require('lodash/keys');
const axios = require('axios');
const config = require('../../config');

const stripe = require('stripe')(config.stripeApiKey);

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

module.exports.week = function(req, res, next) {
  // stripe.charges.create({
  //   amount: 65,
  //   currency: 'usd',
  //   customer: req.user.get('stripe_customer_id'),
  //   description: 'Charge for Boost "Test Max Budget" 13 Feb - 19 Feb'
  // });

  axios.get(`${config.parseHostURI}/Boost?include="user"`, { headers })
    .then(({ data }) => {

      console.log('data', data);

      res.json(data);

    })



};

module.exports.list = function (req, res, next) {
  stripe.charges.list(
    { customer: req.user.get('stripe_customer_id'), limit: 100, 'include[]': 'total_count' },
    function(err, invoices) {
      if (err) { return next(err); }

      res.json({ invoices });
    }
  );
};

module.exports.create = function(req, res) {
  const { number, exp_year, exp_month, cvc } = req.body;

  stripe.customers.createSource(req.user.get('stripe_customer_id'), {
    source: {
      object: 'card',
      exp_month,
      exp_year,
      number,
      cvc
    }
  })
    .then(source => axios.post(`${config.parseHostURI}/PaymentMethod`, {
      number: number.substr(number.length - 4),
      exp_year,
      exp_month,
      type: 'stripe',
      stripe_id: source.id,
      stripe_object: source.object,
      stripe_customer: source.customer,
      user: {
        __type: 'Pointer',
        className: 'Partner',
        objectId: req.user.get('_id')
      }
    }, { headers })
      .then(({ data }) => res.json(data))
      .catch(() => res.status(500).json({ error: 'Something went wrong' })))
    .catch(err => {
      console.log('err', err);
      res.status(500).json({ error: 'Something went wrong' })
    });
};

module.exports.remove = function(req, res, next) {
  const { id } = req.params;
  axios.get(`${config.parseHostURI}/PaymentMethod/${id}`, { headers })
    .then(({ data }) => stripe.customers.deleteCard(
      req.user.get('stripe_customer_id'),
      data.stripe_id,
      function(err, confirmation) {
        if (err) { return next(err); }

        if (confirmation.deleted) {
          axios.delete(`${config.parseHostURI}/PaymentMethod/${id}`, { headers })
            .then(() => res.json({ confirmation }))
            .catch(() => res.status(500).json({ error: 'Something went wrong' }));
        } else {
          res.status(500).json({ error: 'Something went wrong' })
        }
      }
    ))
    .catch(() => res.status(500).json({ error: 'Something went wrong' }));
};
const axios = require('axios');

const EVENTBRITE_API_HOST = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_TOKEN = 'AGY7OC55ANSDBBKQ7XUY';

module.exports.search = function(req, res) {
  const { q } = req.body;
  const url = `${EVENTBRITE_API_HOST}/events/search/?q=${q}&token=${EVENTBRITE_TOKEN}`;

  axios.get(url)
    .then(({ data }) => {
      console.log('data', data);
      res.send(data);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err)
    });
};

module.exports.tickets = function(req, res) {
  axios.get(`${EVENTBRITE_API_HOST}/events/${req.params.id}/ticket_classes?token=${EVENTBRITE_TOKEN}`)
    .then(({ data }) => {
      console.log('data', data);
      res.send(data);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err)
    });
};

module.exports.organizers = function(req, res) {
  axios.get(`${EVENTBRITE_API_HOST}/organizers/${req.params.id}?token=${EVENTBRITE_TOKEN}`)
    .then(({ data}) => {
      console.log('data', data);
      res.send(data);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    });
};

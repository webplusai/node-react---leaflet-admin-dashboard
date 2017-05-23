const moment = require('moment');
const size = require('lodash/size');
const isNaN = require('lodash/isNaN');
const fromPairs = require('lodash/fromPairs');
const last = require('lodash/last');
const sortBy = require('lodash/sortBy');
const toPairs = require('lodash/toPairs');
const Promise = require('bluebird');

const User = require('../models/user');
const EventDetail = require('../models/event_detail');

module.exports = function(req, res) {
  Promise.all([
    new Promise((resolve, reject) => {
      User.count({}, function(err, users_count) {
        if (err) { return reject(err); }

        const query = User.find().select({ age_count: 1 });

        query.exec(function(err, users) {
          if (err) { return reject(err); }

          const ageCount = {};

          users.map(user => {
            const age_count = Number(user.get('age_count'));
            if (ageCount[age_count]) {
              ageCount[age_count]++;
            } else {
              ageCount[age_count] = 1;
            }
          });

          const users_ages = [];

          sortBy(toPairs(ageCount), a => -(last(a))).map(sortedAge => {

            if (!isNaN(sortedAge[0]) && sortedAge[0] && sortedAge[1]) {
              users_ages.push({ age: [sortedAge[0]], per_cent: sortedAge[1] * 100 / users_count });
            }
          });

          User.find({ createdAt: { $gte: moment().startOf('month').toDate().toISOString() } }, function(err, new_users) {
            if (err) { return reject(err); }

            EventDetail.find({ 'date.iso': { $gte: moment().startOf('month').toDate().toISOString() } }, function(err, event_details) {
              if (err) { return reject(err); }

              EventDetail.find({
                'date.iso': {
                  $gte: moment().startOf('day').toDate().toISOString(),
                  $lte: moment().startOf('day').add(7, 'days').toDate().toISOString()
                }
              }, function(err, plans_expiring) {
                if (err) { return reject(err); }

                resolve({
                  users_count,
                  users_ages,
                  new_users_count: size(new_users),
                  event_details_count: size(event_details),
                  plans_expiring_count: size(plans_expiring)
                });
              });
            });
          });
        });
      });
    })
  ]).then(values => {
    res.send({
      tags: [],
      users_count: values[0].users_count,
      users_ages: values[0].users_ages,
      new_users_count: values[0].new_users_count,
      available_itineraries: values[0].event_details_count,
      plans_expiring_count: values[0].plans_expiring_count
    });
  });
};

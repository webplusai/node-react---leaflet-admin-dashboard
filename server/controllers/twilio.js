const xml = require('xml');
const twilio = require('twilio');

const fs = require('fs');
const path = require('path');

const config = require('../../config');

const twilioPhone = config.twilioPhone;

const client = new twilio.RestClient(config.twilioAccountSid, config.twilioAuthToken);

module.exports.index = function({ body: { phone, code } }, res, next) {
  client.calls.create({
    to: phone,
    from: twilioPhone,
    url: `http://${config.host}${config.port ===  80 ? '' : `:${config.port}`}/twilio/${code}`,
    record: true
  }, function(err, responseData) {
    if (err) {
      console.log('err', err);
      return next(err);
    }
    console.log('responseData', responseData);

    return res.send(responseData);
  });
};

module.exports.show = function(req, res) {
  res.set('Content-Type', 'text/xml').send(xml({
    Response: [
      {
        Say: [
          { _attr: { voice: 'alice', loop: 3 } },
          `Hello! Your verification code is: ${req.params.code}`
        ]
      }
    ]
  }, { declaration: true }));
};

module.exports.test = function(req, res, next) {
  const fileName = path.join(__dirname, '..', '..', 'log', 'twilio.log');
  fs.writeFile(fileName, `\n${JSON.stringify(req.body)}`, { flag: 'a' }, function (err) {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    return res.send({});
  });
};

module.exports.showCall = function (req, res, next) {
  client.calls(req.params.id).get(function(err, call) {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    console.log('call', call);
    res.json(call);
  });
};

module.exports.recordings = function (req, res, next) {
  client.calls(req.params.id).get(function(err, call) {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    console.log('call', call);
    res.json(call);
  });
};
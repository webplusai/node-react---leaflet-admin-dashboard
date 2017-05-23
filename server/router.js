const passport = require('passport');

const authController = require('./controllers/auth');
const dataController = require('./controllers/data');
const uploadController = require('./controllers/upload');
const eventbriteController = require('./controllers/eventbrite');
const yelpController = require('./controllers/yelp');
const twilioController = require('./controllers/twilio');
const searchController = require('./controllers/search');
const stripeController = require('./controllers/stripe');

const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signin', requireSignin, authController.signin);
  app.post('/signup', authController.signup);
  app.get('/token', requireAuth, authController.token);
  app.get('/data', dataController);
  app.post('/upload', uploadController);
  app.post('/eventbrite/search', eventbriteController.search);
  app.get('/eventbrite/organizers/:id', eventbriteController.organizers);
  app.get('/eventbrite/events/:id/tickets', eventbriteController.tickets);
  app.post('/yelp', yelpController.index);
  app.post('/yelp/show', yelpController.show);
  app.post('/twilio', twilioController.index);
  app.post('/twilio/test', twilioController.test);
  app.get('/twilio/:code', twilioController.show);
  app.post('/twilio/:code', twilioController.show);
  app.get('/twilio/calls/:id', twilioController.showCall);
  app.get('/search', searchController.index);
  app.get('/stripe/list', requireAuth, stripeController.list);
  app.post('/stripe/week', requireAuth, stripeController.week);
  app.post('/stripe', requireAuth, stripeController.create);
  app.delete('/stripe/:id', requireAuth, stripeController.remove);
};

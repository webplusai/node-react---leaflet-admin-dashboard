module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  mongodb: process.env.MONGODB,

  // Auth

  authSecret: process.env.AUTH_SECRET,

  // Yelp
  yelpConsumerKey: process.env.YELP_CONSUMER_KEY,
  yelpConsumerSecret: process.env.YELP_CONSUMER_SECRET,
  yelpToken: process.env.YELP_TOKEN,
  yelpTokenSecret: process.env.YELP_TOKEN_SECRET,
  yelpAccessToken: process.env.YELP_ACCESS_TOKEN,

  // Parse

  parseHostURI: `http://${process.env.API_HOST}/parse/classes`,
  parseApplicationId: process.env.PARSE_APPLICATION_ID,
  parseMasterKey: process.env.PARSE_MASTER_KEY,

  // Twilio

  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE,

  // Stripe

  stripeApiKey: process.env.STRIPE_API_KEY
};

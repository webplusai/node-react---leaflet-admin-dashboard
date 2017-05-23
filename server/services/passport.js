const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const Partner = require('../models/partner');

const config = require('../../config');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  Partner.findOne({ email }, function(err, partner) {
    if (err) { return done(err); }
    if (!partner) { return done(null, false); }

    partner.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      partner.objectId = partner._id;
      return done(null, partner);
    });
  });
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.authSecret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  Partner.findById(payload.sub, function(err, user) {
    if (err) {  return done(err, false); }

    if (user) {
      // user.objectId = user._id;
      // user.full_name = [user.first_name, user.last_name].join(' ');
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

const passport = require('passport');
const { User } = require('../models/User');
const { createToken } = require('./createToken');

require('dotenv').config();
const secret = process.env.SECRET_KEY;

passport.serializeUser((user, done) => {
  const jwt = createToken(user.name, secret);
  User.updateOne({ name: user.name }, { jwt }, (err, user) => {
    if (err) {
      return err.message;
    }
    done(null, user);
  }).then(user => console.log('>>> user with geterated jwt:', user));
})

passport.deserializeUser((user, done) => {
  done(null, user);
})
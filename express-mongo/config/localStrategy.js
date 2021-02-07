const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/User');

const localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    User.findOne({ name: username })
      .then((user) => {
        console.log('>>>> user that I found: ', user)
        if (!user) {
          return done(null, false, { errors: { 'not found': 'User does not exist!' } });
        }
        if (user.password !== password) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      })
      .catch(done);
  }
)
module.exports = localStrategy;
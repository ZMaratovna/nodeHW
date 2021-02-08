const passport = require('passport');
const util = require('util');

const { User } = require('./models/User');

const mockUser = {
  name: 'John',
  password: 'qwerty12345',
  jwt: 'vjhvhhiy8y'
};

const localStrategyCallback = (username, password, done) => {
  User.findOne({ name: username })
    .then((user) => {
      console.log('>>>> user that I found: ', user)
      if (!user) {
        return done(null, false, { errors: { 'not found': 'User does not exist!' } });
      }
      if (user.password !== password) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, { name: username });
    })
    .catch(done);
}
const bearerStrategyCallback = (jwt, done) => {
  User.findOne({ jwt }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'all' });
  });;
}

function Strategy(name, callback) {
  if (!name || name.length === 0) { throw new TypeError('Strategy requires a Strategy name'); }
  passport.Strategy.call(this);
  this.name = mockUser.name;
  this._user = mockUser;
  this._cb = callback;
}

Strategy.prototype.authenticate = function () {
  this._cb(null, null, this._user, (error, user) => {
    this.success(user);
  });
}
util.inherits(Strategy, passport.Strategy);

module.exports = {
  Strategy,
  localStrategyCallback,
  bearerStrategyCallback,
  mockUser
}

const BearerStrategy = require('passport-http-bearer').Strategy;

const bearerStrategy = new BearerStrategy((jwt, done) => {
  User.findOne({ jwt }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'all' });
  });;
})

module.exports = bearerStrategy;
const router = require('express').Router();;
const passport = require('passport');

router.post('/token', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
})
);

router.get(
  '/:name',
  passport.authenticate(
    'bearer', { session: false },
  ),
  (req, res) => {
    console.log(`Authorized user ${req.params.name} send GET request with JWT`);
    res.send(`Hello ${req.params.name}`);
  })

module.exports = router;
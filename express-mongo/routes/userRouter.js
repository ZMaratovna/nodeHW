const express = require('express');
const router = express.Router();
let { User } = require('../models/User');

// router.use((req, res, next) => {
//   if (req.headers.iknowyoursecret &&
//     req.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem') {
//     next()
//   } else {
//     res.status(401).send('Unauthorized!')
//   }
// });

//get list of usernames
router.route('/users')
  .get(async (_req, res) => {
    try {
      const users = await User.find({})
      res.send(`Hello, ${users.map(user => user.name).join(', ')}`)
    } catch (e) {
      res.status(404).send('Empty users collection')
    }
  });

//add new user
router.route('/add').post((async (req, res) => {
  try {
    console.log('>>request data', req.body)
    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    await newUser.save();
    res.send(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbName = 'db.json';
let data = [];

router.use((_req, _res, next) => {
  if (fs.existsSync(dbName)) {
    data = JSON.parse(fs.readFileSync(dbName, 'utf8'));
    console.log('>>data', data);
  }
  next()
});

router.get('/:name', (req, res, next) => {
  const ip = req.connection.remoteAddress;
  res.status(200).send({ name: req.params.name, ip });
  next();
});

// authorization by header
router.post('/login', (req, res, next) => {
  console.log('login request')
  req.headers.iknowyoursecret &&
    req.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem' ?
    res.status(200).send('Successfully authorized!') :
    res.status(401).json('Error: Unauthorized!')
  next();
});

// write name into file
router.post('/add/:name', (req, res, next) => {
  const ip = req.connection.remoteAddress;
  if (req.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem') {
    data.push({ name: req.params.name, ip });
    fs.writeFile(dbName, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
      }
    })
    res.send({ name: req.params.name, ip })
  } else {
    res.send('You don\'t know my secret!')
  }
  next();
});


module.exports = router;
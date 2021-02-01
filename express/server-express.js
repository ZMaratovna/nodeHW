const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 8080;
const dbName = 'db.json';
let data = [];
const app = express();

app.use(express.json());


if (fs.existsSync(dbName)) {
  data = JSON.parse(fs.readFileSync(dbName, 'utf8'));
  console.log('>> data', data);
}

app.get('/:name', (req, res, next) => {
  const ip = req.connection.remoteAddress;
  res.status(200).send({ name: req.params.name, ip });
  next();
});

// authorization by header
app.post('/login', (req, res, next) => {
  console.log('login request')
  req.headers.iknowyoursecret &&
    req.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem' ?
    res.status(200).send('Successfully authorized!') :
    res.status(401).json('Error: Unauthorized!')
  next();
});

// write name into file
app.post('/add/:name', (req, res, next) => {
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
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
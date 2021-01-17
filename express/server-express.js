const express = require('express');
const router = require('./routes');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

require('dotenv').config();
const uri = process.env.MONGO_URI;

const app = express()
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./router');
app.use('/', userRouter)

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
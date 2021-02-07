const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const localStrategy = require('./config/localStrategy');
const bearerStrategy = require('./config/bearerStrategy');
require('./config/passport');

const app = express();
const port = process.env.PORT || 8080;

require('dotenv').config();
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);
app.use(passport.initialize());

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

const userRouter = require('./routes/userRouter');
app.use('/', userRouter)

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
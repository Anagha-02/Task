const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const users = require('./routes/user');
app.use('/users', users);

mongoose.connect(`mongodb://localhost:27017/login-app-db`, { useNewUrlParser: true })
.then(() => {
    app.listen(9000, () => console.log('Server Started'));
    console.log('Connected to Database')
  })
  .catch(error => {
    console.log(error);
  });


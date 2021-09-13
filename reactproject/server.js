const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/user');

const app = express()

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
  res.setHeader('Access-Control-Allow-Headers',"*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', "GET, POST, DELETE, PATCH");
  next();
});

app.use(express.json())

app.use('/users', users);

mongoose.connect(`mongodb://localhost:27017/login-app-db`, { useNewUrlParser: true })
.then(() => {
    app.listen(9000)//, () => console.log('Server Started'));
  //  console.log('Connected to Database')
  })
  .catch(error => {
    console.log(error);
  });


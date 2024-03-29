const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const http = require('http');

const app = express()
const server = http.createServer(app)

const route = require('./routes');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const port = 8000;

/*
var checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://pulse-polaris.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://polaris-api.com/',
  issuer: 'https://pulse-polaris.auth0.com/',
  algorithms: ['RS256'],
  
})
*/

var checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://your-tenant.auth0.com/.well-known/jwks.json',
  }),
  algorithms: ['RS256']
})

app.use(express.json());
app.use('/api',
  checkJwt,
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json(err)
    } else {
      next()
    }
  },
  route);

server.listen(port);
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ------------------ Morgan custom token for client IP ------------------
morgan.token('remote-ip', (req) => {
 return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
});

// ------------------ Middleware ------------------

// Security headers
app.use(helmet());

// Enable CORS for specific origins
app.use(
 cors({
  origin: [
   'http://localhost:3000',
   'http://192.168.0.100:3000',
   'http://192.168.0.101:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
 })
);

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Compress responses
app.use(compression());

// Logging
app.use(morgan(':method :url :status - :remote-ip - :response-time ms'));

// ------------------ Entry point Routes ------------------
app.get('/', (req, res, next) => {
 res.send('Hello World from Express 🚀');
 next()
});


// * Register user
const Register_user = require('../Router/Register-user')
app.use(Register_user)





// ------------------ Start server ------------------
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
 console.log(`Express server running at http://${hostname}:${port}`);
});

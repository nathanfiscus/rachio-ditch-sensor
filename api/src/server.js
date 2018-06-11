import 'babel-polyfill';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local'
import ensureLogin from 'connect-ensure-login'

import config from './config';
import Rachio from './services/rachio';
import Sensor from './services/sensor';

import './sampler';

const app = express();


passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username === 'admin' && password === 'test'){
      return done(null, false, { message: 'Incorrect password.' });
        }else{
          return done(null, {username:'admin'});
        }
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, 'admin');
  });
  
  passport.deserializeUser(function(id, cb) {
    if(id !== 'admin'){return cb(err);}
    cb(null, {username:'admin'});
  });

//
// Middleware
// -----------------------------------------------------------------------------
// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());
// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());
// Cookie parsing middleware
// https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());
// HTTP request logger middleware for node.js
// https://github.com/expressjs/morgan
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.use('/rachio', ensureLogin.ensureLoggedIn(), Rachio);
app.use('/sensor', ensureLogin.ensureLoggedIn(), Sensor);

app.get('/', (req, res) => {
  res.send('Rachio Ditch Sensor');
});



app.listen(config.port, () => {
  console.log(`Rachio Ditch Sensor API listening on port ${config.port}!`); // eslint-disable-line no-console
});
import express from 'express';
import {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import './config/env';
import { createModels } from './models';
import apiCtrl from './controllers/apiController';
import authCtrl from './controllers/authController';
import msgCtrl from './controllers/msgController';

const sequelizeConfig = require(__dirname + '/config/sequelizeConfig.js');
const PORT = process.env.CB_API_EXPRESS_PORT || 4000;

const app: express.Application = express();

const db = createModels(sequelizeConfig);

app.set('DB', db);

//----------------- MIDDLEWARE ---------------//
// Express CORS Middleware

// configure CORS options and add whitelist
const corsOptions = {
  origin: '*',
  credentials: true
}
app.options('*', cors());
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

//----------------- HTML ENDPOINT ---------------//
app.get('/', (req: Request, res: Response) => res.sendFile('./views/', {root:__dirname}));


//----------------- API ENDPOINT ---------------//
app.use('/api/v1', apiCtrl);


//----------------- AUTH ENDPOINT ---------------//
app.use('/auth', authCtrl);

//----------------- MESSAGING ENDPOINT ---------------//
app.use('/msg', msgCtrl);


//----------------- START 'ER UP ---------------//
// if NODE_ENV production or explicitly want HTTPS
if (process.env.NODE_ENV === 'production' || process.env.FORCE_HTTPS) {
  const httpsServer = https.createServer({
    key: fs.readFileSync(process.env.HTTPS_KEY_FILE),
    cert: fs.readFileSync(process.env.HTTPS_CERT_FILE)
  }, app)
  httpsServer.listen(PORT, () => console.log(`API (HTTPS) started on port ${PORT}`))
} else {
  app.listen(PORT, () => console.log(`API (http) started on port ${PORT}`));
}


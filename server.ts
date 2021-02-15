import express from 'express';
import {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
app.listen(PORT, () => console.log(`API started on port ${PORT}`));

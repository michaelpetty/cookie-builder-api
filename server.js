const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//----------------- MIDDLEWARE ---------------//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//----------------- API ENDPOINT ---------------//


//----------------- START 'ER UP ---------------//
app.listen(3000, () => console.log(`API started on port 3000`));

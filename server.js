const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Ingredient} = require('./models');


//----------------- MIDDLEWARE ---------------//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//----------------- HTML ENDPOINT ---------------//
app.get('/', (req, res) => res.send('<h1>Welcome to Cookie Builder API</h1>'));


//----------------- API ENDPOINT ---------------//
app.get('/api/v1/ingredients', (req, res) => {
  Ingredient.findAll()
    .then(ingredients => res.json(ingredients));
})

app.post('/api/v1/ingredients', (req, res) => {
  Ingredient.create(req.body)
    .then(ingredient => res.json(ingredient));
})

//----------------- START 'ER UP ---------------//
app.listen(3000, () => console.log(`API started on port 3000`));

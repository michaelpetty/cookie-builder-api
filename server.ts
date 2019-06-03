import express from 'express';
import {Request, Response} from 'express';
import bodyParser from 'body-parser';
import { createModels } from './models';
import { RecipeInstance } from  'models/recipe';
import { IngredientInstance } from 'models/ingredient';
const sequelizeConfig = require('./config/sequelizeConfig.json');

const app: express.Application = express();

const db = createModels(sequelizeConfig);
// db.sequelize.sync({force: true})
//   .then(() => {
//     console.log('Database and tables created');
//   })

//----------------- MIDDLEWARE ---------------//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//----------------- HTML ENDPOINT ---------------//
app.get('/', (req: Request, res: Response) => res.send('<h1>Welcome to Cookie Builder API</h1>'));


//----------------- API ENDPOINT ---------------//
// Ingredients
app.get('/api/v1/ingredients', (req: Request, res: Response) => {
  db.Ingredient.findAll()
    .then((ingredients: IngredientInstance[]) => res.json(ingredients));
})

app.post('/api/v1/ingredients', (req: Request, res: Response) => {
  db.Ingredient.create(req.body)
    .then((ingredient: IngredientInstance) => res.json(ingredient));
})

// Recipe/Ingredient Map


// Recipes
app.get('/api/v1/recipes', (req: Request, res: Response) => {
  db.Recipe.findAll()
    .then((recipes: RecipeInstance[]) => res.json(recipes));
})

app.post('/api/v1/recipes', (req: Request, res: Response) => {
  db.Recipe.create(req.body)
    .then((recipe: RecipeInstance) => res.json(recipe));
})

// Recipe Steps


//----------------- START 'ER UP ---------------//
app.listen(3000, () => console.log(`API started on port 3000`));

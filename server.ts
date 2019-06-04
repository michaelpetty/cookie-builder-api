import express from 'express';
import {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import { createModels } from './models';
import { RecipeInstance } from  'models/recipe';
import { RecipeStepInstance } from  'models/recipestep';
import { IngredientInstance } from 'models/ingredient';
const sequelizeConfig = require('./config/sequelizeConfig.json');
const PORT = process.env.PORT || 4000;

const app: express.Application = express();

const db = createModels(sequelizeConfig);
// db.sequelize.sync({force: true})
//   .then(() => {
//     console.log('Database and tables created');
//   })

//----------------- MIDDLEWARE ---------------//
// Express CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.get('/api/v1/recipes/:id', (req: Request, res: Response) => {
  db.Recipe.findById(req.params.id)
    .then((recipe: RecipeInstance) => res.json(recipe))
})

app.get('/api/v1/recipes/:id/full', async (req: Request, res: Response) => {
  const recipe = await db.Recipe.findById(req.params.id);
  const recipeSteps = await recipe.getRecipeSteps();
  const recings = await recipe.getRecIngs();
  res.json({recipe: recipe, recipeSteps: recipeSteps, ingredients:recings});
    // .then(recipe => recipe.getRecipeSteps())
    // .then(recipeSteps => res.json({recipeSteps: recipeSteps, recipe: recipe } ))
})

// Recipe Steps
app.get('/api/v1/recipes/:id/steps', (req: Request, res: Response) => {
  db.RecipeStep.findAll({where:{RecipeId: req.params.id}})
    .then((recipesteps: RecipeStepInstance[]) => res.json(recipesteps))
})


//----------------- START 'ER UP ---------------//
app.listen(PORT, () => console.log(`API started on port ${PORT}`));

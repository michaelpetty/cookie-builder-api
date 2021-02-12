import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Recipe } from  'models/recipe';
import { RecipeStep } from  'models/recipestep';
import { Ingredient } from 'models/ingredient';

const router: express.Application = express();

// Ingredients
router.get('/ingredients', (req: Request, res: Response) => {
  req.app.get('DB').Ingredient.findAll()
    .then((ingredients: Ingredient[]) => res.json(ingredients));
})

router.post('/ingredients', (req: Request, res: Response) => {
  req.app.get('DB').Ingredient.create(req.body)
    .then((ingredient: Ingredient) => res.json(ingredient));
})

router.get('/ingredients/top', (req: Request, res: Response) => {
  req.app.get('DB').Ingredient.findAll({order: ['popularity'], limit: 5})
    .then((ingredients: Ingredient[]) => res.json(ingredients));
})

// Recipe/Ingredient Map


// Recipes
router.get('/recipes', async (req: Request, res: Response) => {
  const db = req.app.get('DB');
  if (req.query.ingredient) {
    res.json(await db.RecIng.findAll({where: {IngredientId: req.query.ingredient}, include: [{model: db.Recipe}]}));
  } else {
    res.json(await db.Recipe.findAll());
  }
})

router.post('/recipes', (req: Request, res: Response) => {
  req.app.get('DB').Recipe.create(req.body)
    .then((recipe: Recipe) => res.json(recipe));
})

router.get('/recipes/:id', (req: Request, res: Response) => {
  req.app.get('DB').Recipe.findByPk(req.params.id)
    .then((recipe: Recipe) => res.json(recipe))
})

router.get('/recipes/:id/full', async (req: Request, res: Response) => {
  const db = req.app.get('DB');
  const recipe = await db.Recipe.findByPk(req.params.id);
  const recipeSteps = await recipe.getRecipeSteps();
  const recings = await db.RecIng.findAll({where: {RecipeId: req.params.id}, include: [{model: db.Ingredient}]});
  res.json({recipe: recipe, recipeSteps: recipeSteps, ingredients:recings});
})

// Recipe Steps
router.get('/recipes/:id/steps', (req: Request, res: Response) => {
  req.app.get('DB').RecipeStep.findAll({where:{RecipeId: req.params.id}})
    .then((recipesteps: RecipeStep[]) => res.json(recipesteps))
})

export default router;

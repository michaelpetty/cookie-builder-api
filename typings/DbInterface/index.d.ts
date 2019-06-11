import * as Sequelize from 'sequelize';
import { RecipeAttributes, RecipeInstance } from 'models/recipe';
import { RecipeStepAttributes, RecipeStepInstance } from 'models/recipestep';
import { RecIngAttributes, RecIngInstance } from 'models/recipeingredient';
import {IngredientAttributes, IngredientInstance } from 'models/ingredient';
import {UserAttributes, UserInstance } from 'models/user';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Recipe: Sequelize.Model<RecipeInstance, RecipeAttributes>;
  RecipeStep: Sequelize.Model<RecipeStepInstance, RecipeStepAttributes>;
  RecIng: Sequelize.Model<RecIngInstance, RecIngAttributes>;
  Ingredient: Sequelize.Model<IngredientInstance, IngredientAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
}

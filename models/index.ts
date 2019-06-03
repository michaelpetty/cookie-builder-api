import Sequelize from 'sequelize';
import { DbInterface } from 'typings/DbInterface';
import { RecipeFactory } from './recipe';
import { RecipeStepFactory } from './recipestep';
import { RecIngFactory } from './recipeingredient';
import {IngredientFactory } from './ingredient';

export const createModels = (sequelizeConfig: any): DbInterface => {
  // const { database, username, password, params } = sequelizeConfig;
  // const sequelize = new Sequelize(database, username, password, params);
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.development.sqlite'
  })

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Recipe: RecipeFactory(sequelize, Sequelize),
    RecipeStep: RecipeStepFactory(sequelize, Sequelize),
    RecIng: RecIngFactory(sequelize, Sequelize),
    Ingredient: IngredientFactory(sequelize, Sequelize)
  }

  return db;
}

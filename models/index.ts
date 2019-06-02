import Sequelize from 'sequelize';
import { DbInterface } from 'typings/DbInterface';
import { RecipeFactory } from './recipe';

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
    Recipe: RecipeFactory(sequelize, Sequelize)
  }

  return db;
}

//const RecipeModel = require('./models/recipe');
//const RecipeIngredientModel = require('./models/recipeingredient');
//import IngredientModel from './ingredient';

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db.development.sqlite'
// })

//const Recipe = RecipeModel(sequelize, Sequelize);
//const RecipeIngredient = RecipeIngredientModel(sequelize, Sequelize);
//export const Ingredient = IngredientModel.init(sequelize, Sequelize);

//Recipe.belongs

// sequelize.sync({force:true})
//   .then(() => {
//     console.log('Database and tables created');
//   })

// module.exports = {
//   Ingredient
// }

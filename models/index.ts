import {Sequelize} from 'sequelize';
import { DbInterface } from 'typings/DbInterface';
import { RecipeFactory } from './recipe';
import { RecipeStepFactory } from './recipestep';
import { RecIngFactory } from './recipeingredient';
import {IngredientFactory} from './ingredient';
import { UserFactory } from './user';
import { PurchaseFactory } from './purchase';
import { FaveFactory } from './fave';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  sequelize.authenticate()
    .then(res => console.log(`Connected to ${database}`))
    .catch(err => console.log(`Unable to connect${database}`, err))

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Recipe: RecipeFactory(sequelize),
    RecipeStep: RecipeStepFactory(sequelize),
    RecIng: RecIngFactory(sequelize),
    Ingredient: IngredientFactory(sequelize),
    // User: UserFactory(sequelize, Sequelize),
    // Purchase: PurchaseFactory(sequelize, Sequelize),
    // Fave: FaveFactory(sequelize, Sequelize)
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  })

  return db;
}

import {Sequelize} from 'sequelize';
// import { DbInterface } from 'typings/DbInterface';
import { RecipeFactory } from './recipe';
import { RecipeStepFactory } from './recipestep';
import { RecIngFactory } from './recipeingredient';
import {IngredientFactory} from './ingredient';
import { UserFactory } from './user';
import { PurchaseFactory } from './purchase';
import { FaveFactory } from './fave';

export const createModels = (sequelizeConfig: any) => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  sequelize.authenticate()
    .then(res => console.log(`Connected to ${database}`))
    .catch(err => console.log(`Unable to connect${database}`, err))

  const db = {
    sequelize,
    Recipe: RecipeFactory(sequelize),
    RecipeStep: RecipeStepFactory(sequelize),
    RecIng: RecIngFactory(sequelize),
    Ingredient: IngredientFactory(sequelize),
    User: UserFactory(sequelize),
    Purchase: PurchaseFactory(sequelize),
    Fave: FaveFactory(sequelize)
  }

  // Object.keys(db).forEach(modelName => {
  //   if (db[modelName].associate) {
  //     db[modelName].associate(db);
  //   }
  // })
  db.Recipe.hasMany(db.RecipeStep, {
    sourceKey: 'id',
    foreignKey: 'RecipeId',
    as: 'recipeSteps'
  })
  db.Recipe.hasMany(db.RecIng, {
    sourceKey: 'id',
    foreignKey: 'RecipeId',
    as: 'recIngs'
  })
  db.RecipeStep.belongsTo(db.Recipe);
  db.RecIng.belongsTo(db.Recipe);
  db.RecIng.belongsTo(db.Ingredient);
  db.User.hasMany(db.Purchase);
  db.User.hasMany(db.Fave);
  db.Purchase.belongsTo(db.Recipe);
  db.Purchase.belongsTo(db.User);
  db.Fave.belongsTo(db.Recipe);
  db.Fave.belongsTo(db.User);

  return db;
}

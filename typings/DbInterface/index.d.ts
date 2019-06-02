import * as Sequelize from 'sequelize';
import { RecipeAttributes, RecipeInstance } from 'models/recipe';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Recipe: Sequelize.Model<RecipeInstance, RecipeAttributes>;
}

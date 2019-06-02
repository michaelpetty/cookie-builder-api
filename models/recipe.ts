import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface RecipeAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RecipeInstance extends Sequelize.Instance<RecipeAttributes>, RecipeAttributes {

}

export const RecipeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecipeInstance, RecipeAttributes> => {
  const attributes: SequelizeAttributes<RecipeAttributes> = {
    name: {
      type: DataTypes.STRING
    }
  }

  const Recipe = sequelize.define<RecipeInstance, RecipeAttributes>("Recipe", attributes);

  return Recipe;
}

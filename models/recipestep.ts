import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface RecipeStepAttributes {
  id?: number;
  body: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RecipeStepInstance extends Sequelize.Instance<RecipeStepAttributes>, RecipeStepAttributes {

}

export const RecipeStepFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecipeStepInstance, RecipeStepAttributes> => {
  const attributes: SequelizeAttributes<RecipeStepAttributes> = {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }

  const RecipeStep = sequelize.define<RecipeStepInstance, RecipeStepAttributes>('RecipeStep', attributes);

  return RecipeStep;
}

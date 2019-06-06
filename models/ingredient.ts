import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface IngredientAttributes {
  id?: number;
  name: string;
  popularity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IngredientInstance extends Sequelize.Instance<IngredientAttributes>, IngredientAttributes {}

export const IngredientFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IngredientInstance, IngredientAttributes> => {
  const attributes: SequelizeAttributes<IngredientAttributes> = {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    }
  }

  const Ingredient = sequelize.define<IngredientInstance, IngredientAttributes>('Ingredient', attributes);

  return Ingredient;
}

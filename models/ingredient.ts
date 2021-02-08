import { Sequelize, Model, DataTypes } from 'sequelize';

export class Ingredient extends Model {
  public id!: number;
  public name!: string;
  public popularity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const IngredientFactory = (sequelize: Sequelize) => {
  Ingredient.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
  }, {
    sequelize,
    tableName: 'Ingredients'
  })

  return Ingredient;
}

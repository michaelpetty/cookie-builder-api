import { Sequelize, Model, DataTypes } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Association } from 'sequelize';

import { RecipeStep } from './recipestep';
import { RecIng } from './recipeingredient';
// import { DbInterface } from '../typings/DbInterface';


export class Recipe extends Model {
  public id!: number;
  public name!: string;
  public picture!: string;
  public price!: number;
  public yield!: string;
  public activeTime!: string;
  public totalTime!: string;
  public preheat!: string;
  public intro!: string;
  public note!: string;
  public source!: string;
  public sourceURL!: string;
  public RecipeStep!: RecipeStep['id'][];
  public RecIng!: RecIng['id'][];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRecIngs: HasManyGetAssociationsMixin<RecIng>;
  public setRecIngs: HasManySetAssociationsMixin<RecIng, RecIng['id']>;
  public getRecipeSteps: HasManyGetAssociationsMixin<RecipeStep>;
  public setRecipeSteps: HasManySetAssociationsMixin<RecipeStep, RecipeStep['id']>;

  // public static associate(models: DbInterface): void {};

  public static associations: {
    recIngs: Association<Recipe, RecIng>;
    recipeSteps: Association<Recipe, RecipeStep>;
  }

}

export const RecipeFactory = (sequelize: Sequelize) => {
  Recipe.init({
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
    picture: {
      type: DataTypes.STRING(1234)
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    yield: {
      type: DataTypes.STRING(100)
    },
    activeTime: {
      type: DataTypes.STRING(100)
    },
    totalTime: {
      type: DataTypes.STRING(100)
    },
    preheat: {
      type: DataTypes.STRING(100)
    },
    intro: {
      type: DataTypes.STRING(1234)
    },
    note: {
      type: DataTypes.STRING(1234)
    },
    source: {
      type: DataTypes.STRING
    },
    sourceURL: {
      type: DataTypes.STRING(1234)
    }
  }, {
    sequelize,
    tableName: 'Recipes'
  })

  // Recipe.associate = (models: DbInterface) => {
    // Recipe.hasMany(models.RecipeStep, {
    //   sourceKey: 'id',
    //   foreignKey: 'RecipeId',
    //   as: 'recipeSteps'
    // });
    // Recipe.hasMany(models.RecIng, {
    //   sourceKey: 'id',
    //   foreignKey: 'RecipeId',
    //   as: 'recIngs'
    // });
  // }

  return Recipe;
}

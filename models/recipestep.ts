import { Sequelize, Model, DataTypes } from 'sequelize';
import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, Association } from 'sequelize';

import { Recipe } from './recipe'

export class RecipeStep extends Model {
  public id!: number;
  public body!: string;
  public stepOrder!: number;
  public RecipeId!: Recipe['id'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRecipe: BelongsToGetAssociationMixin<Recipe>
  public setRecipe: BelongsToSetAssociationMixin<Recipe, Recipe['id']>

  public static associations: {
    recipe: Association<Recipe>;
  }
}

export const RecipeStepFactory = (sequelize: Sequelize) => {
  RecipeStep.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'recOrderIndex',
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stepOrder: {
      type: DataTypes.INTEGER,
      unique: 'recOrderIndex',
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RecipeSteps'
  })

  return RecipeStep;
}

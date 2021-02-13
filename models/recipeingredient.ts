import { Sequelize, Model, DataTypes } from 'sequelize';
import { BelongsToGetAssociationMixin, Association } from 'sequelize';

import { Recipe } from './recipe'
import { Ingredient } from './ingredient'
// import { DbInterface } from '../typings/DbInterface';

export class RecIng extends Model {
  public id!: number;
  public recIngOrder!: number;
  public preparation!: string | null;
  public amount!: string;
  public unit!: string | null;
  public RecipeId!: Recipe['id'];
  public IngredientId!: Ingredient['id'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

   // public static associate(models: DbInterface): void {};

   public getIngredient: BelongsToGetAssociationMixin<Ingredient>
   public getRecipe: BelongsToGetAssociationMixin<Recipe>

  public static associations: {
    recipe: Association<Recipe>;
    ingredient: Association<Ingredient>;
  }
}

export const RecIngFactory = (sequelize: Sequelize) => {
  RecIng.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ingredients',
        key: 'id'
      }
    },
    recIngOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preparation: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'RecIngs'
  })

  // RecIng.associate = (models: DbInterface) => {
    // RecIng.belongsTo(Recipe);
    // RecIng.belongsTo(Ingredient);
  // }

  return RecIng;

}

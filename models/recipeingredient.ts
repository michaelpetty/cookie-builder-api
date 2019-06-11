import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { RecipeAttributes, RecipeInstance } from 'models/recipe'
import { IngredientAttributes, IngredientInstance } from 'models/ingredient'

export interface RecIngAttributes {
  id?: number;
  recIngOrder: number;
  preparation?: string;
  amount: string;
  unit?: string;
  createdAt?: Date;
  updatedAt?: Date;
  RecipeId: RecipeAttributes | RecipeAttributes['id'];
  IngredientId: IngredientAttributes | IngredientAttributes['id'];
}

export interface RecIngInstance extends Sequelize.Instance<RecIngAttributes>, RecIngAttributes {
  getRecipe: Sequelize.BelongsToGetAssociationMixin<RecipeInstance>;
  getIngredient: Sequelize.BelongsToGetAssociationMixin<IngredientInstance>;
}

export const RecIngFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecIngInstance, RecIngAttributes> => {
  const attributes: SequelizeAttributes<RecIngAttributes> = {
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
  }

  const RecIng = sequelize.define<RecIngInstance, RecIngAttributes>('RecIng', attributes);

  RecIng.associate = models => {
    RecIng.belongsTo(models.Recipe);
    RecIng.belongsTo(models.Ingredient);
  }

  return RecIng;

}

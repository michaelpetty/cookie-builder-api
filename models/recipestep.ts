import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { RecipeAttributes, RecipeInstance } from 'models/recipe'

export interface RecipeStepAttributes {
  id?: number;
  body: string;
  stepOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
  RecipeId: RecipeAttributes | RecipeAttributes['id'];
}

export interface RecipeStepInstance extends Sequelize.Instance<RecipeStepAttributes>, RecipeStepAttributes {
  getRecipe: Sequelize.BelongsToGetAssociationMixin<RecipeInstance>;
  setRecipe: Sequelize.BelongsToSetAssociationMixin<RecipeInstance, RecipeInstance['id']>;
}

export const RecipeStepFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecipeStepInstance, RecipeStepAttributes> => {
  const attributes: SequelizeAttributes<RecipeStepAttributes> = {
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
  }

  const RecipeStep = sequelize.define<RecipeStepInstance, RecipeStepAttributes>('RecipeStep', attributes);

  RecipeStep.associate = models => {
    RecipeStep.belongsTo(models.Recipe);
  }

  return RecipeStep;
}

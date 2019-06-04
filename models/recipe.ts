import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { RecipeStepAttributes, RecipeStepInstance } from 'models/recipestep';
import { RecIngAttributes, RecIngInstance } from 'models/recipeingredient';

export interface RecipeAttributes {
  id?: number;
  name: string;
  picture: string;
  price: number;
  yield: string;
  activeTime: string;
  totalTime: string;
  preheat: string;
  intro: string;
  note: string;
  source: string;
  sourceURL: string;
  createdAt?: Date;
  updatedAt?: Date;
  RecipeStep?: RecipeStepAttributes[] | RecipeStepAttributes['id'][];
  RecIng?: RecIngAttributes[] | RecIngAttributes['id'][];
}

export interface RecipeInstance extends Sequelize.Instance<RecipeAttributes>, RecipeAttributes {
  getRecipeSteps: Sequelize.HasManyGetAssociationsMixin<RecipeStepInstance>;
  setRecipeSteps: Sequelize.HasManySetAssociationsMixin<RecipeStepInstance, RecipeStepInstance['id']>;
  getRecIngs: Sequelize.HasManyGetAssociationsMixin<RecIngInstance>;
  setRecIngs: Sequelize.HasManySetAssociationsMixin<RecIngInstance, RecIngInstance['id']>;
}

export const RecipeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecipeInstance, RecipeAttributes> => {
  const attributes: SequelizeAttributes<RecipeAttributes> = {
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
  }

  const Recipe = sequelize.define<RecipeInstance, RecipeAttributes>('Recipe', attributes);

  Recipe.associate = models => {
    Recipe.hasMany(models.RecipeStep);
    Recipe.hasMany(models.RecIng);
  }

  return Recipe;
}

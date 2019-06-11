import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { RecipeAttributes, RecipeInstance } from 'models/recipe'
import { UserAttributes, UserInstance } from 'models/user'

export interface FaveAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  RecipeId: RecipeAttributes | RecipeAttributes['id'];
  UserId: UserAttributes | UserAttributes['id'];
}

export interface FaveInstance extends Sequelize.Instance<FaveAttributes>, FaveAttributes {
  getRecipe: Sequelize.BelongsToGetAssociationMixin<RecipeInstance>;
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export const FaveFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<FaveInstance, FaveAttributes> => {
  const attributes: SequelizeAttributes<FaveAttributes> = {
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }

  const Fave = sequelize.define<FaveInstance, FaveAttributes>('Fave', attributes);

  Fave.associate = models => {
    Fave.belongsTo(models.Recipe);
    Fave.belongsTo(models.User);
  }

  return Fave;

}

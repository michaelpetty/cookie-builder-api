import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { RecipeAttributes, RecipeInstance } from 'models/recipe'
import { UserAttributes, UserInstance } from 'models/user'

export interface PurchaseAttributes {
  id?: number;
  expectedDelivery: Date;
  deliveredOn?: Date;
  quantity: number;
  paid: number;
  createdAt?: Date;
  updatedAt?: Date;
  RecipeId: RecipeAttributes | RecipeAttributes['id'];
  UserId: UserAttributes | UserAttributes['id'];
}

export interface PurchaseInstance extends Sequelize.Instance<PurchaseAttributes>, PurchaseAttributes {
  getRecipe: Sequelize.BelongsToGetAssociationMixin<RecipeInstance>;
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export const PurchaseFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PurchaseInstance, PurchaseAttributes> => {
  const attributes: SequelizeAttributes<PurchaseAttributes> = {
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
    },
    paid: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    expectedDelivery: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deliveredOn: {
      type: DataTypes.DATE
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }

  const Purchase = sequelize.define<PurchaseInstance, PurchaseAttributes>('Purchase', attributes);

  Purchase.associate = models => {
    Purchase.belongsTo(models.Recipe);
    Purchase.belongsTo(models.User);
  }

  return Purchase;

}

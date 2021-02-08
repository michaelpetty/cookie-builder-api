import { Sequelize, Model, DataTypes } from 'sequelize';
import { BelongsToGetAssociationMixin, Association } from 'sequelize';

import { Recipe } from './recipe'
// import { User } from './user'
import { DbInterface } from '../typings/DbInterface';

export class Purchase extends Model {
  public id!: number;
  public expectedDelivery!: Date;
  public deliveredOn?: Date;
  public quantity!: number;
  public paid!: number;
  public RecipeId!: Recipe['id'];
  // public UserId!: User['id'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: DbInterface): void {};

  // public getUser: BelongsToGetAssociationMixin<User>
  public getRecipe: BelongsToGetAssociationMixin<Recipe>

 public static associations: {
   recipe: Association<Recipe>;
   // user: Association<User>;
 }
}

export const PurchaseFactory = (sequelize: Sequelize) => {
  Purchase.init({
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
  }, {
    sequelize,
    tableName: 'Purchases'
  })

  Purchase.associate = (models: DbInterface) => {
    Purchase.belongsTo(models.Recipe);
    // Purchase.belongsTo(models.User);
  }

  return Purchase;

}

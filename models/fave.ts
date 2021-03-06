import { Sequelize, Model, DataTypes } from 'sequelize';
import { BelongsToGetAssociationMixin, Association } from 'sequelize';

import { Recipe } from './recipe'
import { User } from './user'

export class Fave extends Model {
  public id!: number;
  public RecipeId!: Recipe['id'];
  public UserId: User['id'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRecipe: BelongsToGetAssociationMixin<Recipe>;
  public getUser: BelongsToGetAssociationMixin<User>;

  public static associations: {
    recipe: Association<Recipe>;
    user: Association<User>;
  }
}

export const FaveFactory = (sequelize: Sequelize) => {
  Fave.init({
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
    }
  }, {
    sequelize,
    tableName: 'Faves'
  })

  return Fave;

}

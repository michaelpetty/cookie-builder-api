import { Sequelize, Model, DataTypes } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Association } from 'sequelize';

import { Purchase } from './purchase';
import { Fave } from './fave';
// import { DbInterface } from '../typings/DbInterface';


export class User extends Model {
  public id!: number;
  public name?: string;
  public email!: string;
  public password!: string;
  public password2?: string;
  public street1?: string;
  public street2?: string;
  public city?: string;
  public state?: string;
  public postalCode?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public getPurchases: HasManyGetAssociationsMixin<Purchase>;
  public setPurchase: HasManySetAssociationsMixin<Purchase, Purchase['id']>;
  public getFaves: HasManyGetAssociationsMixin<Fave>;
  public setFave: HasManySetAssociationsMixin<Fave, Fave['id']>;

  // public static associate(models: DbInterface): void {};

  public static associations: {
    purchases: Association<User, Purchase>;
    faves: Association<User, Fave>;
  }
}

export const UserFactory = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        is: /^[a-z ,\.]+$/i,
        len: [2,40]
      }
    },
    email: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [3,40]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street1: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        is: /^[a-z0-9 ,\.#]+$/i,
        len: [2,40]
      }
    },
    street2: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        is: /^[a-z0-9 ,\.#]+$/i,
        len: [2,40]
      }
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        is: /^[a-z ]+$/i,
        len: [2,40]
      }
    },
    state: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        is: /^[a-z ]+$/i,
        len: [2,40]
      }
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: /^[a-z0-9]+(-[a-z0-9]+)?$/i
      }
    }
  }, {
    sequelize,
    tableName: 'Users'
  })

  // User.associate = (models: DbInterface) => {
    // User.hasMany(Purchase);
    // User.hasMany(Fave);
  // }

  return User;
}

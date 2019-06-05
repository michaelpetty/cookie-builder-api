import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  password2?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {}

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
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
      allowNull: false,
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
      allowNull: false,
      validate: {
        is: /^[a-z ]+$/i,
        len: [2,40]
      }
    },
    state: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        is: /^[a-z ]+$/i,
        len: [2,40]
      }
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: /^[a-z0-9]+(-[a-z0-9]+)?$/i
      }
    }
  }

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
}

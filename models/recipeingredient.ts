import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface RecIngAttributes {
  id?: number,
  preparation: string,
  amount: string,
  unit: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface RecIngInstance extends Sequelize.Instance<RecIngAttributes>, RecIngAttributes {

}

export const RecIngFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RecIngInstance, RecIngAttributes> => {
  const attributes: SequelizeAttributes<RecIngAttributes> = {
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

  return RecIng;

}

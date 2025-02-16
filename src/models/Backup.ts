import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Backup extends Model {
  public id!: number;
  public content!: any;
  public readonly createdAt!: Date;
}

Backup.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Backup',
  timestamps: true,
  updatedAt: false,
});
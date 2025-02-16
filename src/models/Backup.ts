import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface BackupAttributes {
  id: number;
  content: any;
  createdAt?: Date;
  updatedAt?: Date;
}

class Backup extends Model<BackupAttributes> implements BackupAttributes {
  public id!: number;
  public content!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Backup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Backup',
    timestamps: true,
  }
);

export { Backup };
export type { BackupAttributes };
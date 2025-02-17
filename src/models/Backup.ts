import { Model, DataTypes } from '../config/sequelize';
import { sequelize } from '../config/sequelize';

class Backup extends Model<any> {
  public id!: number;
  public content!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
});

export { Backup };
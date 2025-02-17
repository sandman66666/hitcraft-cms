import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/sequelize';

class Content extends Model<any> {
  public id!: number;
  public content!: any;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Content.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Content',
  timestamps: true,
});

export { Content };
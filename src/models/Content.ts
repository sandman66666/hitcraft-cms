import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface ContentAttributes {
  id: number;
  content: any;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Content extends Model<ContentAttributes> implements ContentAttributes {
  public id!: number;
  public content!: any;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Content.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Content',
    timestamps: true,
  }
);

export { Content };
export type { ContentAttributes };
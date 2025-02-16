import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/hitcraft';

const config = {
  dialect: 'postgres' as const,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: false
};

const sequelize = new Sequelize(databaseUrl, config);

export default sequelize;
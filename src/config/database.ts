const SequelizeORM = require('sequelize');

// PostgreSQL Configuration
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/hitcraft';

const config = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Initialize PostgreSQL with retry logic
const dbInstance = new SequelizeORM.Sequelize(databaseUrl, config);

const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await dbInstance.authenticate();
      console.log('Database connection established successfully.');
      
      // Sync models
      await dbInstance.sync();
      console.log('Database models synchronized successfully');
      
      return dbInstance;
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = { sequelize: dbInstance, connectDB };
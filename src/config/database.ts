import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

// PostgreSQL Configuration
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/hitcraft';

const postgresConfig = {
  dialect: 'postgres' as const,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: false
};

// MongoDB Configuration
const mongoUri = process.env.MONGODB_URI || process.env.ORMONGO_URL || 'mongodb://localhost:27017/hitcraft';

// Initialize PostgreSQL
const sequelize = new Sequelize(databaseUrl, postgresConfig);

// Initialize MongoDB with retry logic
const connectMongo = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUri, {
        ssl: process.env.NODE_ENV === 'production'
      });
      console.log('MongoDB Connected');
      return mongoose.connection;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Migration utility
export const migrateMongoToPostgres = async (Content: any, MongoContent: any) => {
  try {
    // Get all content from MongoDB
    const mongoContents = await MongoContent.find({ isActive: true });
    
    if (mongoContents.length > 0) {
      console.log('Found content in MongoDB, migrating to PostgreSQL...');
      
      // Migrate each content document
      for (const mongoContent of mongoContents) {
        const existingContent = await Content.findOne({
          where: { 
            isActive: true,
            createdAt: mongoContent.createdAt 
          }
        });

        if (!existingContent) {
          await Content.create({
            content: mongoContent.content,
            isActive: mongoContent.isActive,
            createdAt: mongoContent.createdAt
          });
          console.log('Content migrated successfully');
        }
      }
    }
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

export { sequelize, connectMongo };
export default sequelize;
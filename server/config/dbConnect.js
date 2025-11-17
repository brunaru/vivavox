import mongoose from 'mongoose';

async function db() {
  try {
    const nodeEnv = process.env.NODE_ENV || 'dev';
    const connectionString = nodeEnv === 'prod' 
      ? process.env.PROD_DB_CONNECTION_STRING 
      : process.env.DEV_DB_CONNECTION_STRING;

    console.log(`Connecting to MongoDB in ${nodeEnv} mode...`);
    mongoose.connect(connectionString);
  } catch(error) {
    console.log(error);
  }

  return mongoose.connection;
}

export default db;
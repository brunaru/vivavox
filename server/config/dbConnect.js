import mongoose from 'mongoose';

async function db() {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;

    console.log(`Connecting to MongoDB`);
    mongoose.connect(connectionString);
  } catch(error) {
    console.log(error);
  }

  return mongoose.connection;
}

export default db;
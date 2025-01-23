import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';
import dotenv from 'dotenv';
import cellRoutes from './routes/cell.routes.js';
import boardRoutes from './routes/board.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

async function connectDB() {
  // Create a database connection:
  const connection = await db();

  // Catches connection error:
  connection.on("error", (error) => {
    console.error("Connection error", error);
  });

  // Captures connection successfully:
  connection.once("open", () => {
    console.log("Database connection successful");
  });
}

connectDB();

const app = express();

app.use(express.static('puclib'));
app.use(express.json());
app.use(cors());

app.use('/cell', cellRoutes);
app.use('/board', boardRoutes);
app.use('/user', userRoutes);

app.listen(3001,  () => {
  console.log('Server listening on port 3001');
});
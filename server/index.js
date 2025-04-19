import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';
import dotenv from 'dotenv';
import cellRoutes from './routes/cell.routes.js';
import boardRoutes from './routes/board.routes.js';
import userRoutes from './routes/user.routes.js';
import userCellRoutes from './routes/userCell.routes.js';

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

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
   origin: ['http://localhost:3000', 'https://624d-179-125-135-210.ngrok-free.app']
}));

app.use('/cell', cellRoutes);
app.use('/board', boardRoutes);
app.use('/user', userRoutes);
app.use('/userCell', userCellRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server listening on port 5000');
});
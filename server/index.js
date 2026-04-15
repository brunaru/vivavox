import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';
import dotenv from 'dotenv';
import cellRoutes from './routes/cell.routes.js';
import boardRoutes from './routes/board.routes.js';
import userRoutes from './routes/user.routes.js';
import userCellRoutes from './routes/userCell.routes.js';
import bcrypt from "bcrypt";
import User from "./models/user.models.js";

dotenv.config();

async function createDefaultUser() {
  try {
    const email = "admin@email.com";

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash("123456", salt);

      await User.create({
        name: "Admin",
        email: email,
        password: passwordHash,
        type: "admin",
        currentBoard: null
      });

      console.log("Usuário padrão criado!");
    }
  } catch (error){
    console.error("Erro ao criar usuáro padrão")
  }
}

async function connectDB() {
  // Create a database connection:
  const connection = await db();

  // Catches connection error:
  connection.on("error", (error) => {
    console.error("Connection error", error);
  });

  // Captures connection successfully:
  connection.once("open", async () => {
    console.log("Database connection successful");

    await createDefaultUser();
  });
}

connectDB();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
   origin: ['http://localhost:3000']
}));

app.use('/cell', cellRoutes);
app.use('/board', boardRoutes);
app.use('/user', userRoutes);
app.use('/userCell', userCellRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server listening on port 5000');
});
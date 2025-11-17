import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Board from '../models/board.models.js';
import Cell from '../models/cell.models.js';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'dev';
const connectionString = nodeEnv === 'prod' 
  ? process.env.PROD_DB_CONNECTION_STRING 
  : process.env.DEV_DB_CONNECTION_STRING;

async function seedDatabase() {
  try {
    console.log(`🌱 Iniciando seed do banco de dados em modo ${nodeEnv}...`);
    console.log(`Conectando a: ${connectionString}`);

    // Connect to MongoDB
    await mongoose.connect(connectionString);
    console.log('✅ Conectado ao MongoDB');

    // Clear existing data
    console.log('🗑️  Limpando dados existentes...');
    await Cell.deleteMany({});
    await Board.deleteMany({});
    console.log('✅ Dados antigos removidos');

    // Read cells from all_cells_backup.json
    console.log('📝 Lendo células do arquivo...');
    const cellsFilePath = path.join(process.cwd(), 'scripts', 'all_cells_backup.json');
    const cellsData = JSON.parse(fs.readFileSync(cellsFilePath, 'utf8'));
    console.log(`✅ ${cellsData.length} células lidas do arquivo`);

    // Read board structure from board_1.json
    console.log('📋 Lendo estrutura da prancha...');
    const boardFilePath = path.join(process.cwd(), 'scripts', 'board_1.json');
    const boardData = JSON.parse(fs.readFileSync(boardFilePath, 'utf8'));
    console.log(`✅ Estrutura da prancha "${boardData.name}" lida`);

    // Insert all cells
    console.log('💾 Salvando células no banco de dados...');
    const createdCells = await Cell.insertMany(cellsData);
    console.log(`✅ ${createdCells.length} células criadas no banco`);

    // Create mapping from old IDs to new IDs
    const idMapping = {};
    cellsData.forEach((originalCell, index) => {
      idMapping[originalCell._id] = createdCells[index]._id;
    });

    // Map board cells to new IDs
    const mappedCells = boardData.cells.map((cell) => ({
      cellId: idMapping[cell.cellId] || cell.cellId, // Use new ID if exists, otherwise keep original
      cellType: cell.cellType
    }));

    // Create a fake userId for the default board (seed boards don't have a real owner)
    const fakeUserId = new mongoose.Types.ObjectId();

    // Create the board with mapped cells
    const defaultBoard = new Board({
      name: boardData.name,
      numCells: mappedCells.length,
      dimensions: boardData.dimensions || [4, 6], // Default 4x6 if not specified
      imgPreview: boardData.imgPreview || 'https://via.placeholder.com/200?text=Padrão+1',
      type: boardData.type || '0',
      userId: fakeUserId,
      tags: boardData.tags || ['default', 'starter'],
      cells: mappedCells
    });

    await defaultBoard.save();
    console.log(`✅ Board "${boardData.name}" criado com sucesso`);

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`📊 Resumo:`);
    console.log(`   - ${createdCells.length} células criadas`);
    console.log(`   - 1 board padrão criado: "${boardData.name}"`);
    console.log(`   - ${mappedCells.length} células mapeadas para a prancha`);
    console.log(`   - Board ID: ${defaultBoard._id}`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error.message);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Conexão com MongoDB fechada');
  }
}

// Run the seed
seedDatabase();

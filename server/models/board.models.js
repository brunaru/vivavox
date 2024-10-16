import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  numCells: {
    type: Number,
    required: true
  },
  cells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cell'
  }]
}, { versionKey: false });

const Board = mongoose.model('board', boardSchema);

export default Board;
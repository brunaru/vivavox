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
    cellId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'cells.cellType'
    },
    cellType: {
      type: String,
      required: true,
      enum: ['cell', 'userCell']
    }
  }]
}, { versionKey: false });

const Board = mongoose.model('board', boardSchema);

export default Board;
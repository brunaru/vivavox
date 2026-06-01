import mongoose from 'mongoose';

const cellSchema = new mongoose.Schema({
  text: {
    type: String
  },
  img: {
    type: String,
    unique: true,
    required: false
  },
  color: {
    type: String
  },
  categories: {
    type: [String], 
    default: []     
  }
}, { versionKey: false });

const Cell = mongoose.model("cell", cellSchema);

export default Cell;
import mongoose from 'mongoose';

const cellSchema = new mongoose.Schema({
  text: {
    type: String
  },
  img: {
    type: String,
    unique: true,
    required: true
  },
  color: {
    type: String
  }
}, { versionKey: false });

const Cell = mongoose.model("cell", cellSchema);

export default Cell;
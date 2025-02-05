import mongoose from "mongoose";

const userCellSchema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  //   required: true
  // },
  originalCellId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cell",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
}, { versionKey: false });

const UserCell = mongoose.model("userCell", userCellSchema);

export default UserCell;
import mongoose from "mongoose";

const commandSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  command: [{ type: String, required: true }],
  answer: { type: String, required: true },
});
const Command = mongoose.model('Command', commandSchema);
export default Command;
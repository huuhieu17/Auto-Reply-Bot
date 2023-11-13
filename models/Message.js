import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

messageSchema.index({ question: "text" }); // Create a text index on the 'question' array
const Message = mongoose.model('Message', messageSchema);
export default Message;
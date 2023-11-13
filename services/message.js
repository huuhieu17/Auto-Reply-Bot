import Message from "../models/Message.js";
import { genSnowFlake } from "../utils/index.js";


const getListMessage = async () => {
    let messages = await Message.find({});
    return messages;
}

const findAnswerByQuestion = async (question) => {
    const messages = await  Message.findOne({ $text: { $search: question } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } });
    return messages
}

const findById = (messageID) => {
    return Message.findById({_id: messageID}).then(res=>{
        if (res == null) {
            return;
        }
            return res
    })
}

const createMessageReply = async (question, answer) => {
    const newMessage = new Message({
        _id: genSnowFlake(),
        question,
        answer,
    });
    await newMessage.save().then(res => {
        console.log('Message saved successfully');
    });
}

const editMessageReply = (messageData) => {
    return Message.findById(messageData._id).then(res=> {
        if (!res) {
            console.error('Message not found');
            return;
        }
        res.answer = messageData.answer;
        res.question = messageData.question;
        return res.save().then(res=> {
            if (!res) {
                console.error('Error saving message:', res);
                return;
            }
            console.log('Message edited successfully');
        });
    });
}

const deleteMessageReply = async (messageId) => {
    return await Message.findByIdAndDelete(messageId).then(res=> {
        if (!res) {
            console.error('Error deleting message:', res);
            return;
        }
        console.log('Message deleted successfully');
    });
}

export { getListMessage, findAnswerByQuestion, createMessageReply, editMessageReply, deleteMessageReply, findById }
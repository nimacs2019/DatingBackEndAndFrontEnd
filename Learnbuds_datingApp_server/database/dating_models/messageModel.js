const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId, 
            ref: "chats", 
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;

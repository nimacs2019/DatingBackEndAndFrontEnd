const ChatModel = require("../database/dating_models/chatModel");

const addToChatList = async (req, res) => {
    senderId = req.user;
    receiverId = req.body.receiverId;
    console.log(`the sender and the receiver ${senderId._id}'''''''${receiverId}`);
    try {
        const existingChat = await ChatModel.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!existingChat) {
            const newChat = new ChatModel({
                members: [senderId, receiverId],
            });
            await newChat.save();
        }
        res.status(200).json({ message: "User added to chat list successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userChats = async (req, res) => {
    Auth_userId = req.user;
    console.log('Auth_user ID',Auth_userId);
    
    try {
        // Fetch chats where the authenticated user is a member
        const chats = await ChatModel.find
        ({
            members: { $in: [Auth_userId] },
        });

        // Send the chats as a response
        res.status(200).json(chats);
        console.log('...............chat details.......',chats);
    } catch (error) {
        console.error(`Error fetching chats for user ${Auth_userId}:`, error);
        
        // Send a more descriptive error response
        res.status(500).json({ message: 'An error occurred while fetching chat details', error });
    }
};

const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { addToChatList, userChats, findChat };

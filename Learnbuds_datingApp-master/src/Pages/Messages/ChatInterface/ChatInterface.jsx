import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import styles from "./ChatInterface.module.css";
import { addMessage, getMessages } from "../ChatRequest";

const ChatInterface = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messageEndRef = useRef(null);

    // Fetching data for chat header
    useEffect(() => {
        if (!chat || !currentUser) return;
        const userId = chat.members.find((id) => id !== currentUser.userId);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user-details/${userId}`, {
                    withCredentials: true,
                });
                const result = response.data;
                setUserData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        if (chat !== null) fetchData();
    }, [chat, currentUser]);

    // Fetching messages
    useEffect(() => {
        if (!chat) return;
        const fetchMessage = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };
        fetchMessage();
    }, [chat]);

    // Handle text input change
    const handleChange = (e) => {
        setNewMessage(e.target.value); // Directly update the input value
    };

    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Prevent sending empty messages

        const message = {
            senderId: currentUser.userId,
            text: newMessage,
            chatId: chat._id,
        };

        // Send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser.userId);
        setSendMessage({ ...message, receiverId });

        // Send message to the database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage(""); // Clear the input after sending
        } catch {
            console.log("Error sending message");
        }
    };

    // Handle received message
    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
    }, [receivedMessage, chat]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return (
        <div className={styles.ChatBoxContainer}>
            {chat ? (
                <>
                    {/* Chat header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.follower}>
                            {userData &&
                                userData.map((user, index) => (
                                    <div key={index}>
                                        <img
                                            className={styles.name}
                                            src={`http://localhost:8080/${user.profilePicture}`}
                                            alt="profile"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                        <div className={styles.name} style={{ fontSize: "0.8rem" }}>
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                ))}
                            <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px" }} />
                        </div>
                    </div>

                    {/* Chat body */}
                    <div className={styles.chatBody}>
                        {messages &&
                            messages.map((message) => (
                                <div
                                    key={message._id}
                                    className={
                                        message.senderId === currentUser.userId
                                            ? `${styles.message} ${styles.own}`
                                            : `${styles.message} ${styles.received}`
                                    }
                                >
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                    </div>

                    {/* Chat sender */}
                    <div className={styles.chatSender}>
                        <div className={styles.inputSection}>
                            {/* Message input */}
                            <input
                                type="text"
                                value={newMessage}
                                onChange={handleChange}
                                placeholder="Type a message..."
                                className={styles.messageInput}
                            />

                            {/* Send button */}
                            <button className={styles.sendButton} onClick={handleSend}>
                                <i className="fas fa-paper-plane"></i>
                            </button>

                            {/* Hidden file input (if needed) */}
                            <input type="file" style={{ display: "none" }} />
                        </div>
                    </div>
                </>
            ) : (
                <span className={styles.chatboxEmptyMessage}>Tap on a chat to start conversation...</span>
            )}
        </div>
    );
};

export default ChatInterface;

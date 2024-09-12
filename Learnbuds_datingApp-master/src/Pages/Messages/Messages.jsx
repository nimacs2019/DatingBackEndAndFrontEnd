import React, { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./Messages.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ChatInterface from "./ChatInterface/ChatInterface";
import Chats from "./Chats/Chats";
import axios from "axios";
import { io } from "socket.io-client";
import { userChats } from "./ChatRequest";

const contacts = [
    {
        name: "Team Align",
        date: "Today, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        likes: 120,
    },
    {
        name: "Jhon Abraham",
        date: "03/07/22, 07:30 AM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1679865371012-92b8ce5e6d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWVufGVufDB8fDB8fHww",
        likes: 200,
    },
    {
        name: "Jhon Abraham",
        date: "Today, 07:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
        likes: 150,
    },
    {
        name: "Alex Linderson",
        date: "Monday, 09:30 AM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1682096186855-3f32647abe68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW58ZW58MHx8MHx8fDA%3D",
        likes: 180,
    },
    {
        name: "Sabila Sayma",
        date: "Yesterday, 07:35 PM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
        likes: 220,
    },
    {
        name: "Binoj varghes",
        date: "Today, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        likes: 95,
    },
    {
        name: "John Borino",
        date: "Monday, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
        likes: 175,
    },
];

const Messages = () => {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef(null);

    useEffect(() => {
        const getProfileAndChats = async () => {
            try {
                // Fetch user profile data
                const profileResponse = await axios.get("http://localhost:8080/api/my-profile", { withCredentials: true });
                const profileData = profileResponse.data;
                setUser(profileData);
                console.log(profileData);

                // Fetch chat data using the profile data
                if (profileData?.userId) {
                    const chatsResponse = await userChats(profileData.userId);
                    setChats(chatsResponse.data);
                    console.log(chatsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getProfileAndChats();
    }, []);

    // Connect to Socket.io
    useEffect(() => {
        if (user?.userId) {
            socket.current = io("http://localhost:8000");
            socket.current.emit("new-user-add", user.userId);
            socket.current.on("get-users", (users) => {
                setOnlineUsers(users);
                console.log(onlineUsers);
            });
        }
    }, [user]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive-message", (data) => {
                console.log(data);
                setReceivedMessage(data);
            });
        }
    }, []);

    // sending message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // receive message from socket server

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header pageName="Message" />
            <div className={styles.recentMatches}>
                <h2 style={{ color: "white" }}>Recent Matches</h2>
                <div className={styles.recentMatchesList}>
                    {contacts.slice(0, 6).map((contact, index) => (
                        <div key={index} className={styles.recentMatchItem}>
                            <div className={styles.contactImgContainer}>
                                <img src={contact.imgSrc} alt={contact.name} className={styles.recentMatchImg} />
                                <div className={styles.overlayContainer}>
                                    <div className={styles.heartIcon}>
                                        <FaHeart />
                                    </div>
                                    <div className={styles.likeCount}>{contact.likes}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className={styles.app}> */}
            <div className={styles.Chat}>
                {/* Left Side */}

                <div className={styles.LeftSideChat}>
                    <div className={styles.ChatContainer}>
                        <h2>Chats</h2>
                        <div className={styles.ChatList}>
                            {chats.map((chat) => (
                                <div key={chat._id} onClick={() => setCurrentChat(chat)} className={styles.Conversation}>
                                    <Chats data={chat} currentUserID={user.userId} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className={styles.RightSideChat}>
                    <ChatInterface
                        chat={currentChat}
                        currentUser={user}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Messages;

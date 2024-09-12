import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Received.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { NotificationContext } from "../../StateManagement/NotificationContext";

const groupContacts = (contacts) => {
    const sortedContacts = contacts.filter((contact) => contact.name).sort((a, b) => a.name.localeCompare(b.name));

    return sortedContacts.reduce((acc, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Received = () => {
    const [users, setUsers] = useState([]);
    const { reqNotifications, hasRequests, checkForRequests } = useContext(NotificationContext);

    const getReceivedRequests = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/request-received", {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const data = response.data;
                if (Array.isArray(data)) {
                    const flattenedData = data.flat();
                    setUsers(flattenedData);
                    console.log("Flattened data:", flattenedData);
                } else {
                    console.error("Unexpected data format:", data);
                }
            }
        } catch (error) {
            console.error("Error fetching short list:", error);
        }
    };

    useEffect(() => {
        getReceivedRequests();
    }, []);
    console.log("hdhfsjhd", users);

    const handleAcceptRequest = async (userId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/accept-request`,
                { senderID: userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response && response.data && response.data.message) {
                alert(response.data.message);
                setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
                checkForRequests();
            } else {
                console.error("Invalid response format:", response);
                alert("Error: Invalid response format");
            }
        } catch (error) {
            console.error("Error accepting notification:", error);
            alert("Error: Unable to accept the request");
        }
    };

    const handleRejectRequest = async (userId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/reject-request`,
                { senderID: userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response && response.data && response.data.message) {
                alert(response.data.message);
                setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
                checkForRequests();
            } else {
                console.error("Invalid response format:", response);
                alert("Error: Invalid response format");
            }
        } catch (error) {
            console.error("Error accepting notification:", error);
            alert("Error: Unable to accept the request");
        }
    };

    const groupedContacts = groupContacts(users);

    return (
        <>
            <Header pageName="Received" />{" "}
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(groupedContacts).length === 0 ? (
                        <p>No one has viewed your profile yet.</p>
                    ) : (
                        Object.keys(groupedContacts).map((letter) => (
                            <div key={letter} className={styles.contactGroup}>
                                <div className={styles.contactGroupLetter}>{letter}</div>
                                {groupedContacts[letter].map((contact, index) => (
                                    <div key={index} className={styles.contactItem}>
                                        <img
                                            src={`http://localhost:8080/${contact.profilePicture}` || "default-img-url"}
                                            alt={contact.name || "No Name"}
                                            className={styles.contactImg}
                                        />{" "}
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.name}</p>
                                            <p className={styles.contactDate}>
                                                {new Date(contact.updatedAt).toLocaleDateString() || "No Date"}
                                            </p>{" "}
                                        </div>
                                        <div className={styles.contactActions}>
                                            <FaHeart
                                                className={styles.heartIcon}
                                                onClick={() => handleAcceptRequest(contact.userId)}
                                            />
                                            &nbsp;&nbsp;
                                            <FaTimes
                                                className={styles.closeIcon}
                                                onClick={() => handleRejectRequest(contact.userId)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Received;

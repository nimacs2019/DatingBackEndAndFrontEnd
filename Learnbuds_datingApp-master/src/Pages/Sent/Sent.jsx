import React, { useEffect, useState } from "react";
import styles from "./Sent.module.css";
import { FaTimes } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const groupContacts = (contacts) => {
    if (!contacts || contacts.length === 0) return {};

    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    return sortedContacts.reduce((acc, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Sent = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const getRequestSentUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/view-requestSentList", {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const data = response.data; 
                setUsers(data); 
            }
        } catch (error) {
            console.error("Error fetching request Users list:", error);
        }
    };

    useEffect(() => {
        getRequestSentUser();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group filtered users by the first letter of their name
    const groupedContacts = groupContacts(filteredUsers);

    return (
        <>
            <Header pageName="Sent" onSearch={(term) => setSearchTerm(term)}/>
            <div className={styles.app}>
            <div className={styles.line}></div>
                <div className={styles.contactList}>
                    <div className={styles.contactListContent}>
                        {Object.keys(groupedContacts).map((letter) => (
                            <div key={letter} className={styles.contactGroup}>
                                <div className={styles.contactGroupLetter}>{letter}</div>
                                {groupedContacts[letter].map((contact, index) => (
                                    <div key={index} className={styles.contactItem}>
                                        <img
                                            src={`http://localhost:8080/${contact.profilePicture}` || "default-img-url"}
                                            alt={contact.name}
                                            className={styles.contactImg}
                                        />
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.name}</p>
                                            <p className={styles.contactDate}>
                                                {new Date(contact.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className={styles.contactActions}>
                                            <FaTimes className={styles.closeIcon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Sent;

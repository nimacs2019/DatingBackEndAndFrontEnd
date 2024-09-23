import React, { useEffect, useState } from "react";
import styles from "./Rejected.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const groupContacts = (contacts) => {
    const sortedContacts = contacts.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return sortedContacts.reduce((acc, contact) => {
        const firstLetter = (contact.name || "").charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Rejected = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const getRejectedRequest = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/rejected-request", {
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

    console.log(".....///////........", users);

    useEffect(() => {
        getRejectedRequest();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group filtered users by the first letter of their name
    const groupedContacts = groupContacts(filteredUsers);

    return (
        <>
            <Header pageName="Rejected" onSearch={(term) => setSearchTerm(term)}/>{" "}
            <div className={styles.app}>
            <div className={styles.line}></div>
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
                                            src={
                                                `http://localhost:8080/${contact.receiver.profilePicture}` ||
                                                "default-img-url"
                                            }
                                            alt={contact.name || "No Name"}
                                            className={styles.contactImg}
                                        />{" "}
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.receiver.name || "Unknown"}</p>
                                            <p className={styles.contactDate}>
                                                {new Date(contact.updatedAt).toLocaleDateString() || "No Date"}
                                            </p>
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

export default Rejected;

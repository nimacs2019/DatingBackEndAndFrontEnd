import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Shortlisted.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

// Utility function to group contacts
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

const Shortlisted = () => {
    const [users, setUsers] = useState([]);

    const getShortListedUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/myShortlistedUsers", {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const data = response.data;
                if (Array.isArray(data)) {
                    const flattenedData = data.flat(); // Flatten the array
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
        getShortListedUser();
    }, []);

    const groupedContacts = groupContacts(users);

    return (
        <>
            <Header pageName="Shortlisted" />
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
                                        />
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.name || "Unknown"}</p>
                                            <p className={styles.contactDate}>
                                                {new Date(contact.updatedAt).toLocaleDateString() || "No Date"}
                                            </p>
                                        </div>
                                        <div className={styles.contactActions}>
                                            <FaHeart className={styles.heartIcon} />
                                            &nbsp;&nbsp;
                                            <FaTimes className={styles.closeIcon} />
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

export default Shortlisted;

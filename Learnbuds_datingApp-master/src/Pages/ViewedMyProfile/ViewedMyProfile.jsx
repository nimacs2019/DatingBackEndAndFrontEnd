import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./ViewedMyProfile.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

// Function to group contacts by the first letter of their name
const groupContacts = (contacts) => {
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

const ViewedMyProfile = () => {
    const [users, setUsers] = useState({ viewedProfiles: [] });
    const [searchTerm, setSearchTerm] = useState(""); 

    const getViewedMyProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/view-profile", { withCredentials: true });

            if (response.status === 200) {
                const data = response.data;
                setUsers(data);
            }
        } catch (error) {
            console.error("Error retrieving profile views:", error.message);
        }
    };

    useEffect(() => {
        getViewedMyProfile();
    }, []);

    // Filter contacts based on search term
    const filteredContacts = users.viewedProfiles.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group filtered contacts by the first letter of their name
    const groupedContacts = filteredContacts.length > 0 ? groupContacts(filteredContacts) : {};

    return (
        <>
            <Header
                pageName="Viewed My Profile"
                onSearch={(term) => setSearchTerm(term)} // Update the search term
            />
            <div className={styles.app}>
            <div className={styles.line}></div>
                <div className={styles.contactList}>
                    {Object.keys(groupedContacts).length === 0 ? (
                        <div className={styles.noResultsContainer}>
                            <p className={styles.noResultsText}>
                                {searchTerm
                                    ? `No results found for "${searchTerm}".`
                                    : "No one has viewed your profile yet."}
                            </p>
                        </div>
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
                                            <p className={styles.contactName}>{contact.name}</p>
                                            <p className={styles.contactDate}>{contact.date}</p>
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

export default ViewedMyProfile;

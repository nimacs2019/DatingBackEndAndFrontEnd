import React, { useEffect, useState } from "react";
import styles from "./Accept.module.css";
import axios from "axios";
import { FaPhone, FaVideo } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Accepted = () => {
    const [users, setUsers] = useState([]);

    const getAcceptedRequest = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/accepted-request", {
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
        getAcceptedRequest();
    }, []);
    return (
        <>
            <Header pageName="Accepted" />{" "}
            <div className={styles.app}>
                <div className={styles.contactList}>
                    <div className={styles.contactListContent}>
                        {users.length === 0 ? (
                            <p>No one has viewed your profile yet.</p>
                        ) : (
                            users.map((user, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <img
                                        src={`http://localhost:8080/${user.receiver.profilePicture}` || "default-img-url"}
                                        alt={user.receiver.name || "No Name"}
                                        className={styles.contactImg}
                                    />{" "}
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{user.receiver.name}</p>
                                        <p className={styles.contactDate}>{user.receiver.date}</p>
                                    </div>
                                    <div className={styles.contactActions}>
                                        <FaPhone className={styles.callIcon} />
                                        <FaVideo className={styles.videoIcon} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Accepted;

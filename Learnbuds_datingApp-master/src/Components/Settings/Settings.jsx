import React from "react";
import styles from "./Settings.module.css";
import Profile from "../../assets/Profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Settings = () => {
    return (
        <>
            <Header pageName={"Settings"} />
            <div className={styles.settingsContainer}>
                
                <div className={styles.profileSection}>
                    <img src={Profile} alt="Profile" className={styles.profilePic} />
                    <div className={styles.profileInfo}>
                        <h3>Nazrul Islam</h3>
                        <p>Never give up 💪</p>
                    </div>
                    <i className={`fas fa-qrcode ${styles.qrIcon}`}></i>
                </div>
                <div className={styles.settingsList}>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-lock"></i>

                        <Link to={"/privacysettings"} style={{ textDecoration: "none", color: "inherit" }}>
                            <div>
                                <h4>Account</h4>
                                <p>Privacy, security, change number</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-comment-dots"></i>
                        <div>
                            <h4>Chat</h4>
                            <p>Chat history, theme, wallpapers</p>
                        </div>
                    </div>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-bell"></i>
                        <div>
                            <h4>Notifications</h4>
                            <p>Messages, group and others</p>
                        </div>
                    </div>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-question-circle"></i>
                        <div>
                            <h4>Help</h4>
                            <p>Help center, contact us, privacy policy</p>
                        </div>
                    </div>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-database"></i>
                        <div>
                            <h4>Storage and data</h4>
                            <p>Network usage, storage usage</p>
                        </div>
                    </div>
                    <div className={styles.settingsItem}>
                        <i className="fas fa-user-friends"></i>
                        <div>
                            <h4>Invite a friend</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Settings;

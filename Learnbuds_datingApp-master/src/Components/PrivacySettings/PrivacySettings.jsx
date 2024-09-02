import React from "react";
import styles from "./PrivacySettings.module.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PrivacySettings = () => {
    return (
        <>
            <Header pageName={"Privacy & Settings"} />
            <div className={styles.privacySettingsContainer}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <div className={styles.item}>
                            <span className={styles.label}>Sign-in Email</span>
                            <span className={styles.value}>johnsmith@gmail.com</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.label}>Password</span>
                            <Link to={"/change-password"} className={styles.changePassword}>
                                Change password
                            </Link>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.item}>
                            <span className={styles.label}>2-FA authentication</span>
                            <label className={styles.switch}>
                                <input type="checkbox" />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.label}>Phone number</span>
                            <span className={styles.value}>+380 93 123 45 67</span>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <Link to={"/partner-preference"} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className={styles.item}>
                                <span className={styles.label}>Partner Preference</span>
                                <span className={styles.value}></span>
                            </div>
                        </Link>
                        <div className={styles.item}>
                            <span className={styles.label}>Last sign in</span>
                            <span className={styles.value}>today at 18:34, Safari 198.123.23.23</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.item}>
                            <span className={styles.label}>Total active sessions (5)</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.value}>
                                DESKTOP-6TIG6EC • Kyiv, Ukraine
                                <br />
                                Chrome • Used right now
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.value}>
                                Iphone 11 • Kyiv, Ukraine
                                <br />
                                Chrome • 04/19/2022
                            </span>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <button className={styles.resetButton}>
                            <i className="fa fa-plus" aria-hidden="true"></i>Reset all active sessions
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default PrivacySettings;

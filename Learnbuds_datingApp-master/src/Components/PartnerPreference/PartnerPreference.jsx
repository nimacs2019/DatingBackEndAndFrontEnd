import React from "react";
import styles from "./PartnerPreference.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PartnerPreference = () => {
    return (
        <>
            <Header pageName={"Privacy & Settings"} />
            <div className={styles.container}>
                <h3 className={styles.title}>Partner Preference</h3>

                <div className={styles.preferencesGrid}>
                    <div className={styles.preferenceItem}>
                        <label>Age</label>
                        <input type="range" min="18" max="35" className={styles.rangeInput} />
                        <span>18-35</span>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Gender</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Locations</label>
                        <div className={styles.tagContainer}>
                            {["Kochi", "Kollam", "Aluva"].map((location) => (
                                <span key={location} className={styles.tag}>
                                    {location} <span className={styles.tagClose}>&times;</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Interest & Hobbies</label>
                        <div className={styles.tagContainer}>
                            {["yoga", "jazz", "reading"].map((hobby) => (
                                <span key={hobby} className={styles.tag}>
                                    {hobby} <span className={styles.tagClose}>&times;</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Relationship Goals</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Education Level</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Height</label>
                        <input type="range" min="100" max="220" className={styles.rangeInput} />
                        <span>cm100-220</span>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Weight</label>
                        <input type="range" min="40" max="150" className={styles.rangeInput} />
                        <span>kg40-150</span>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Lifestyle Choices</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Religion</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <label>Occupation</label>
                        <select className={styles.selectInput}>
                            <option>Value</option>
                        </select>
                    </div>

                    <div className={styles.preferenceItem}>
                        <button type="submit" className={styles.updateButton}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default PartnerPreference;

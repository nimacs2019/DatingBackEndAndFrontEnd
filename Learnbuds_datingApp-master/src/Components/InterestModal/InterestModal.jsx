import React from "react";
import styles from "./interestModal.module.css";

const InterestModal = ({ show, handleClose }) => {
    const handleSelectInterest = (interest) => {
        handleClose(interest);
    };

    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h5 className={styles.modalTitle}>Interested in</h5>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => handleSelectInterest("MEN")}>
                    MEN
                </button>
                <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleSelectInterest("WOMEN")}>
                    WOMEN
                </button>
                <button className={`${styles.btn} ${styles.btnInfo}`} onClick={() => handleSelectInterest("BOTH")}>
                    BOTH
                </button>
            </div>
        </div>
    );
};

export default InterestModal;

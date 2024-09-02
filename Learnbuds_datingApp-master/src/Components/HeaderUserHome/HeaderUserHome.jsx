import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./headerUserHome.module.css";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import { ModalContext } from "../../StateManagement/ModalContext";
import { ProfileContext } from "../../StateManagement/ProfileContext";

const Header = ({ setNotificationView }) => {
    const { toggleModal } = useContext(ModalContext);
    const { profileData } = useContext(ProfileContext);
    const [service, setService] = useState(false);

    // Determine profile image URL
    const profilePicture = profileData?.profilePicture;
    const correctedPath = profilePicture ? profilePicture.replace(/^\.\.\//, "uploads/") : "";
    const profilePictureUrl = correctedPath
        ? `http://localhost:8080/${correctedPath.replace(/\\/g, "/")}` // Replace backslashes with forward slashes
        : "/path/to/default-avatar.jpg"; // Provide a fallback image URL

    return (
        <>
            <header className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.menuIcon}
                        onClick={() => setService((prev) => !prev)}
                    />
                    <h1 className={styles.title}>BuddyPair</h1>
                </div>
                <div className="d-flex align-items-center">
                    <div className={styles.notificationIcon}>
                        <div className={styles.iconCircle}>
                            <FontAwesomeIcon icon={faBellRegular} onClick={() => setNotificationView(true)} />
                            <div className={styles.notificationDot}></div>
                        </div>
                    </div>
                    <img src={profilePictureUrl} alt="User Avatar" className={styles.avatar} onClick={toggleModal} />{" "}
                </div>
            </header>
            <LeftSideMenu isService={service} />
        </>
    );
};

export default Header;

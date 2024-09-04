import React, { useContext } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RightSideModal.module.css";
import { ModalContext } from "../../StateManagement/ModalContext";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import { AuthContext } from "../../StateManagement/AuthContext";

const RightSideModal = () => {
    const { isModalOpen, toggleModal } = useContext(ModalContext);
    const { profileData } = useContext(ProfileContext);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const profilePicture = profileData?.profilePicture;
    const correctedPath = profilePicture ? profilePicture.replace(/^\.\.\//, "uploads/") : "";
    const profilePictureUrl = correctedPath ? `http://localhost:8080/${correctedPath.replace(/\\/g, "/")}` : "";

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    console.log("login in ", isLoggedIn);

    return (
        <>
            {isLoggedIn && isModalOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
            <div className={`${styles["right-side-modal"]} ${isLoggedIn && isModalOpen ? styles.open : ""}`}>
                <div className={styles["modal-content"]}>
                    <div className={styles["modal-header"]}>
                        <div className={styles["profile-section"]}>
                            <div className={styles["profile-image-container"]}>
                                <img
                                    src={
                                        profilePictureUrl ||
                                        "https://images.unsplash.com/photo-1706943262459-3ef6ce03305c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
                                    }
                                    alt="Profile"
                                    className={styles["profile-pic"]}
                                />
                                <span className={styles["online-status"]}></span>
                            </div>
                            <div className={styles["profile-info"]}>
                                <h3>{profileData?.name}</h3>
                                <h4>Prime Member</h4>
                                <p>Online</p>
                            </div>
                        </div>
                        <FaTimes className={styles["close-icon"]} onClick={toggleModal} />
                    </div>
                    <div className={styles["modal-body"]}>
                        <ul>
                            <Link to={"/myProfile"}>
                                <li>My Profile</li>
                            </Link>
                            <Link to={`/sent`}>
                                <li>Sent Request</li>
                            </Link>
                            <Link to={"/viewed-my-profile"}>
                                <li>Viewed My Profile</li>
                            </Link>
                            <Link to={"/accepted"}>
                                <li>Accept Request</li>
                            </Link>
                            <Link to={"/rejected"}>
                                <li>Reject</li>
                            </Link>
                            <Link to={"/received"}>
                                <li>Received</li>
                            </Link>
                            <Link to={"/shortlistedBy"}>
                                <li>Shortlisted By</li>
                            </Link>
                            <Link to={"/shortlisted"}>
                                <li>Shortlisted</li>
                            </Link>
                            <Link to={"/messages"}>
                                <li>Message</li>
                            </Link>
                            <Link to={"/settings"}>
                                <li>Settings</li>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles["modal-footer"]}>
                        <button className={styles["logout-button"]} onClick={handleLogout}>
                            <FaSignOutAlt />
                            &nbsp; Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightSideModal;

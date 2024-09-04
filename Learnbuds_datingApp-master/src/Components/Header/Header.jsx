import React, { useContext } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import styles from "./Header.module.css";
import { ModalContext } from "../../StateManagement/ModalContext";
import { useNavigate } from "react-router-dom";

const Header = ({ pageName }) => {
    const { toggleModal } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const pagesWithBackArrow = ["Change Password", "Filter", "Message", "Edit My Profile", "Privacy & Settings","Settings"];
    const showBackArrow = pagesWithBackArrow.includes(pageName);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.container}>
                {!showBackArrow && (
                    <div className={styles.menuIcon}>
                        <FaSearch className={styles.humburgeIcon}  />
                    </div>
                )}
                <div className={styles.headerName}>
                    <h2>
                        {showBackArrow && <MdArrowBackIos className={styles.icon} onClick={handleBackClick} />}

                        {pageName}
                    </h2>
                </div>
                {!showBackArrow && (
                    <div className={styles.menuIcon}>
                        <FaBars className={styles.humburgeIcon} onClick={toggleModal} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

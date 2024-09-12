import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import styles from "./Header.module.css";
import { ModalContext } from "../../StateManagement/ModalContext";
import { useNavigate } from "react-router-dom";

const Header = ({ pageName, onSearch }) => {
    const { toggleModal } = useContext(ModalContext);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search input
    const [showSearchInput, setShowSearchInput] = useState(false); // State to show/hide the search input

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm); // Trigger the search callback with the entered term
            setSearchTerm("");
        }
    };

    const toggleSearchInput = () => {
        setShowSearchInput((prev) => !prev); // Toggle the search input visibility
    };
    useEffect(() => {
        if (showSearchInput && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearchInput]);

    const pagesWithBackArrow = [
        "Change Password",
        "Filter",
        "Message",
        "Edit My Profile",
        "Privacy & Settings",
        "Settings",
    ];
    const showBackArrow = pagesWithBackArrow.includes(pageName);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.container}>
                {!showBackArrow && (
                    <>
                        {!showSearchInput ? (
                            <div className={styles.menuIcon}>
                                <FaSearch className={styles.humburgeIcon} onClick={toggleSearchInput} />
                            </div>
                        ) : (
                            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search..."
                                    className={styles.searchInput}
                                />
                            </form>
                        )}
                    </>
                )}

                <div className={styles.headerName}>
                    <h2 style={{ color: "white" }}>
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

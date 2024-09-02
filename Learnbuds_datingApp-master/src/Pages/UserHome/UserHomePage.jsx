import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/HeaderUserHome/HeaderUserHome";
import Stories from "../../Components/Stories/Stories";
import Filters from "../../Components/Filters/Filters";
import Profiles from "../../Components/Profiles/Profiles";
import Footer from "../../Components/Footer/Footer";
import InterestModal from "../../Components/InterestModal/InterestModal";
import LeftSideMenu from "../../Components/LeftSideMenu/LeftSideMenu";
import styles from "./userHomePage.module.css";
import Notifications from "../Notifaction/Notifications";

function UserHomePage() {
    const [modalShow, setModalShow] = useState(false);
    const [notificationView, setNotificationView] = useState(false);
    const [leftSideNavBar, setLeftSideNavBar] = useState(false);
    const [activeFilter, setActiveFilter] = useState("nearby"); // State to manage active filter

    useEffect(() => {
        const userInterest = localStorage.getItem("userInterest");
        const hasSeenModal = localStorage.getItem("hasSeenInterestModal");

        if (!userInterest && !hasSeenModal) {
            setModalShow(true);
        }
    }, []);

    const handleModalClose = (interest) => {
        if (interest) {
            localStorage.setItem("userInterest", interest);
        }
        localStorage.setItem("hasSeenInterestModal", "true");
        setModalShow(false);
    };

    const handleLeftsideMenu = () => {
        leftSideNavBar && setLeftSideNavBar(false);
    };

    return (
        <Container fluid className={styles.appContainer} onClick={handleLeftsideMenu}>
            {modalShow && <InterestModal show={modalShow} handleClose={handleModalClose} />}
            <div className={modalShow ? styles.blurBackground : ""}>
                <Header setLeftSideNavBar={setLeftSideNavBar} setNotificationView={setNotificationView} />
                {leftSideNavBar && <LeftSideMenu />}
                {notificationView && <Notifications setNotificationView={setNotificationView} />}
                <Stories />
                <Filters setActiveFilter={setActiveFilter} activeFilter={activeFilter} /> {/* Pass state */}
                <Profiles activeFilter={activeFilter} /> {/* Pass active filter to Profiles */}
                <Footer />
            </div>
        </Container>
    );
}

export default UserHomePage;

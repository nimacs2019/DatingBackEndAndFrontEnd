import React, { useContext, useEffect, useState } from "react";
import styles from "./OwnProfileView.module.css";
import backgroundImage from "../../assets/ladyImage1.jpg";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import { Link, useNavigate } from "react-router-dom";

const OwnProfileView = () => {
    const { profileData, loading, error } = useContext(ProfileContext);
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const profilePicture = profileData?.profilePicture;
    console.log("Raw Profile Picture Path:", profilePicture);

    const correctedPath = profilePicture ? profilePicture.replace(/^\.\.\//, "uploads/") : "";
    const profilePictureUrl = correctedPath
        ? `http://localhost:8080/${correctedPath.replace(/\\/g, "/")}` // Replace backslashes with forward slashes
        : backgroundImage;

    console.log("Formatted Profile Picture URL:", profilePictureUrl);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleEditClick = () => {
        navigate("/privacysettings");
    };
    return (
        <div
            className={styles.profileViewContainer}
            style={{
                backgroundImage: `url(${profilePictureUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                height: "100vh",
            }}
        >
            <div className={`${styles.topContainer} ${styles.torchEffect}`}>
                <div className={styles.topLeftArrow}>
                    <i className="fas fa-less-than" aria-label="Back" onClick={handleBackClick}></i>
                </div>

                <div className={styles.topRightLocation}>
                    <i className="fa-solid fa-location-arrow fs-5" aria-label="Location"></i>
                    <Link to={"/edit-myProfile"} style={{ textDecoration: "none", color: "inherit" }}>
                        {" "}
                        <p style={{ cursor: "pointer",fontSize:"18px",paddingTop:"15px"}}>Edit</p>
                    </Link>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>
                        {profileData?.name}, <span>{profileData.age}</span>
                    </p>
                    <p className={styles.userPlace}>{profileData.dist}</p>
                </div>

                <div className={styles.matchingContainer}>
                    <div className={styles.matchingPercentage}>
                        <div className={styles.circle}>
                            <div className={styles.innerCircle}>
                                <p className={styles.percentageNumber}>80</p>
                                <p className={styles.percentageIcon}>%</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.matchText}>Profile Complete</p>
                </div>
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.about}>
                    <p className={styles.aboutHeading}>About</p>
                    <p className={styles.aboutContent}>
                        A good listener. I love having a good talk to know each other's side 😍.
                    </p>
                </div>

                <div className={styles.interests}>
                    <p className={styles.interestHeading}>Interest</p>
                    <div className={styles.interestTags}>
                        <span className={styles.interestTag}>🌿 Nature</span>
                        <span className={styles.interestTag}>🏝️ Travel</span>
                        <span className={styles.interestTag}>✍️ Writing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnProfileView;

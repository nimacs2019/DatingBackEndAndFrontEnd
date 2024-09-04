import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfileView.module.css";
import backgroundImage from "../../assets/ladyImage1.jpg";
import upgradeView from "../UpgradeView/UpgradeView";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "../../StateManagement/NotificationContext";

const ProfileView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userProfileData, setUserProfileData] = useState(null);
    const { setReqNotifications, reqNotifications, setHasRequests, hasRequests, checkForRequests } =
        useContext(NotificationContext);

    const getSelectedUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user-details/${id}`, { withCredentials: true });
            setUserProfileData(response.data[0]);
        } catch (error) {
            console.error("Error :", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSelectedUserProfile();
        checkForRequests(id);
    }, [id]);

    console.log("request notification ", reqNotifications, hasRequests);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!userProfileData) {
        return <div>No user data found</div>;
    }

    // Use the user's profile picture if available, otherwise use the default background image

    const profilePictureUrl = userProfileData.profilePicture
        ? `http://localhost:8080/${userProfileData.profilePicture.replace(/\\/g, "/")}`
        : backgroundImage;

    const handleBackClick = () => {
        navigate(-1); // Navigates back to the previous page
    };

    const handleShortList = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/shortlist",
                { receiverId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            alert(response.data.message);

            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response.data);
                alert(error.response.data.message);
            }
        }
    };

    const handleRequestSend = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/request-send",
                { receiverId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            alert(response.data.message);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response.data);
                alert(error.response.data.message);
            }
        }
    };

    // const handleMessage = async () => {
    //     try {
    //         const response = await addToChatList({ receiverId: id });
    //         console.log("User added to chat list:", response.data);
    //         navigate(`/chat-application`);
    //     } catch (error) {
    //         console.error("Error adding user to chat list:", error);
    //         alert("Error: Unable to add the user to chat list");
    //     }
    // };

    return (
        <div
            className={styles.profileViewContainer}
            style={{
                backgroundImage: `url(${profilePictureUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundBlendMode: "overlay",
            }}
        >
            <div className={`${styles.topContainer} ${styles.torchEffect}`}>
                <div className={styles.topLeftArrow}>
                    <i className="fas fa-less-than" onClick={handleBackClick}></i>
                </div>

                <div className={styles.topRightLocation}>
                    <i className="fa-solid fa-location-arrow"></i>
                    <p>2.5 km</p>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>
                        {userProfileData?.name}, <span>{userProfileData?.age}</span>
                    </p>
                    <p className={styles.userPlace}>HAMBURG, GERMANY</p>
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
                    <p className={styles.matchText}>Match</p>
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

                <div className={styles.footerContainer}>
                    <button className={`${styles.footerButton} ${styles.dislikeButton}`} onClick={handleBackClick}>
                        X
                    </button>
                    <button className={`${styles.footerButton} ${styles.starButton}`} onClick={handleShortList}>
                        ★
                    </button>
                    <button
                        className={`${styles.footerButton} ${styles.likeButton}`}
                        onClick={() => {
                            if (hasRequests && reqNotifications.length > 0) {
                                navigate("/received");
                            } else {
                                handleRequestSend();
                            }
                        }}
                    >
                        {hasRequests && reqNotifications.length > 0 && <span className={styles.greenDot}></span>}
                        <i className="fas fa-heart"></i>
                    </button>

                    {/* onClick={handleMessage} */}
                    <button className={`${styles.footerButton} ${styles.chatButton}`}>💬</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;

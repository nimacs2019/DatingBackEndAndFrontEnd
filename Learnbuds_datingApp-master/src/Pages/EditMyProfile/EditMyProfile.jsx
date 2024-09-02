import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditMyProfile.module.css";
import Header from "../../Components/Header/Header";
import { ProfileContext } from "../../StateManagement/ProfileContext";

const EditProfile = () => {
    const { profileData, setProfileData } = useContext(ProfileContext);
    const [updatedProfileData, setUpdatedProfileData] = useState({});
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    useEffect(() => {
        if (profileData) {
            setUpdatedProfileData(profileData);
        }
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const profilePicture = profileData?.profilePicture;
    const correctedProfilePicturePath = profilePicture ? profilePicture.replace(/^\.\.\//, "uploads/") : "";
    const profilePictureUrl = correctedProfilePicturePath
        ? `http://localhost:8080/${correctedProfilePicturePath.replace(/\\/g, "/")}`
        : "";

    const correctedImages = profileData?.moreImages?.map((image) => {
        const correctedImagePath = image.replace(/^\.\.\//, "uploads/");
        return `http://localhost:8080/${correctedImagePath.replace(/\\/g, "/")}`;
    });

    const handleProfilePictureClick = () => {
        document.getElementById("profilePictureInput").click();
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(file);
            const previewUrl = URL.createObjectURL(file);
            setProfileData((prevData) => ({
                ...prevData,
                profilePicture: previewUrl,
            }));
        }
    };

    const editProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (newProfilePicture) {
            formData.append("profilePicture", newProfilePicture);
        }
        Object.keys(updatedProfileData).forEach((key) => {
            formData.append(key, updatedProfileData[key]);
        });

        try {
            const response = await axios.put("http://localhost:8080/api/update-profile", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                setProfileData({
                    ...profileData,
                    ...updatedProfileData,
                });
                alert("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <>
            <Header pageName="Edit My Profile" />

            <div className={styles.editContainer}>
                <div className={styles.line}></div>

                <div className={styles.profileSection}>
                    <div className={styles.profilePicture}>
                        <img src={profilePictureUrl} alt="Profile" className={styles.profileImage} />
                        <div className={styles.editIcon} onClick={handleProfilePictureClick}>
                            ✎
                        </div>
                        <input
                            type="file"
                            id="profilePictureInput"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <h2>{profileData?.name}</h2>
                        <p>{profileData?.bio || "Never give up 💪"}</p>
                    </div>
                </div>
                <p className={styles.infoText}>
                    All your account information can be accessed and edited here but your email will remain unchanged.
                </p>
                <form className={styles.form} onSubmit={editProfile}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updatedProfileData.name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={updatedProfileData.username || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={updatedProfileData.email || ""} disabled />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="mob"
                            value={updatedProfileData.mob || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="bio">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={updatedProfileData.bio || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.mediaSection}>
                        <div className={styles.images}>
                            <p>Images</p>
                            <div className={styles.mediaGrid}>
                                {correctedImages?.map((image, index) => (
                                    <img key={index} src={image} alt={`Image ${index + 1}`} />
                                ))}
                                <div className={styles.addIcon}>+</div>
                            </div>
                        </div>
                        <div className={styles.reels}>
                            <p>Reels</p>
                            <div className={styles.mediaGrid}>
                                {profileData?.reels?.map((reel, index) => (
                                    <video key={index} src={reel} controls alt={`Reel ${index + 1}`} />
                                ))}
                                <div className={styles.addIcon}>+</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={styles.updateButton}>
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;

import React, { useContext, useEffect, useState } from "react";
import { Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styles from "./profiles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import { UsersProfileContext } from "../../StateManagement/UsersProfileContext";

const Profiles = ({ activeFilter }) => {
    const { profileData } = useContext(ProfileContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { profiles, setProfiles, hiddenProfiles } = useContext(UsersProfileContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:8080/api/user-details", { withCredentials: true });
                setProfiles(userResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchUserData();
    }, []);

    const filterUsers = (users) => {
        if (!profileData) return [];

        // switch (activeFilter) {
        //     case "nearby":
        //         return users.filter((user) => user.dist === profileData.dist && user._id !== profileData._id);
        //     case "education":
        //         return users.filter((user) => user.job === profileData.job && user._id !== profileData._id);
        //     case "qualification":
        //         return users.filter(
        //             (user) => user.qualification === profileData.qualification && user._id !== profileData._id
        //         );
        //     default:
        //         return users;
        // }

        const visibleUsers = users.filter((user) => !hiddenProfiles.includes(user._id));

        switch (activeFilter) {
            case "nearby":
                return visibleUsers.filter((user) => user.dist === profileData.dist && user._id !== profileData._id);
            case "education":
                return visibleUsers.filter((user) => user.job === profileData.job && user._id !== profileData._id);
            case "qualification":
                return visibleUsers.filter(
                    (user) => user.qualification === profileData.qualification && user._id !== profileData._id
                );
            default:
                return visibleUsers;
        }
    };

    const filteredUsers = filterUsers(profiles);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (filteredUsers.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>{`No users found based on the ${activeFilter}.`}</p>
            </div>
        );
    }

    return (
        <section className={styles.profiles}>
            <Row className="mb-4">
                {filteredUsers.map((user, index) => (
                    <div
                        key={index}
                        className={`${styles.col} ${styles["col-xs-6"]} ${styles["col-md-4"]} ${styles["col-lg-2"]} ${styles.marginBottom4}`}
                        onClick={() => navigate(`/profileview/${user.userId}`)}
                    >
                        <div className={styles.profileCard}>
                            <Image
                                src={`http://localhost:8080/${user.profilePicture}`}
                                rounded
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    display: "block",
                                    margin: "0 auto",
                                    border: "2px solid #ddd",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                }}
                            />
                            <div className={styles.status}>Online</div>
                            <div className={styles.profileInfo}>
                                <p className={styles.name}>
                                    {user.name}{" "}
                                    <span className={styles.ageRole}>
                                        {user.sex}
                                        {user.age}YRS
                                    </span>
                                </p>
                                <p className={styles.role}>{user.role}</p>
                            </div>
                            <div className={styles.actionButtons}>
                                <button className={styles.iconButton}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                                <button className={styles.iconButton}>
                                    <FontAwesomeIcon icon={faComment} />
                                </button>
                                <button className={styles.iconButton}>
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Row>
        </section>
    );
};

export default Profiles;

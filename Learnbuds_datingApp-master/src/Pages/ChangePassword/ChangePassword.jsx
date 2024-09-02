

import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Header from "../../Components/Header/Header";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <>
            <Header pageName="Change Password" />

            <div className={styles.changePasswordContainer}>
            <div className={styles.line}></div>

                <p className={styles.infoText}>
                    Feeling worried about your account being easily preyed on? Then change that password now!
                </p>
                <form className={styles.passwordForm}>
                    <div className={styles.changePasswordInputContainer}>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword.currentPassword ? "text" : "password"}
                                id="currentPassword"
                                name="currentPassword"
                                placeholder="Current Password"
                            />
                            <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("currentPassword")}>
                                {showPassword.currentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </span>
                        </div>

                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                placeholder="New Password"
                            />
                            <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("newPassword")}>
                                {showPassword.newPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </span>
                        </div>

                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("confirmPassword")}>
                                {showPassword.confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </span>
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

export default ChangePassword;

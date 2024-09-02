import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import avatar1 from "../../assets/WomanWearingPinkCollaredHalfSleevedTop1036623.jpeg";
import avatar2 from "../../assets/Ellipse13.png";
import avatar3 from "../../assets/PexelsDzianaHasanbekava5480696.jpeg";
import avatar4 from "../../assets/PexelsJonaorle4626207.jpeg";
import avatar5 from "../../assets/Rectangle.jpeg";
import avatar6 from "../../assets/User2.png";
import avatar7 from "../../assets/User21.png";
import avatar8 from "../../assets/WomanWearingPinkCollaredHalfSleevedTop1036623.jpeg";
import locationIcon from "../../assets/Vector48_x2.svg";
import messageIcon from "../../assets/message.svg";
import { ReactComponent as GoogleLogo } from "../../assets/FlatColorIconsgoogle18_x2.svg"; // Import SVG as React component
import { ReactComponent as PhoneIcon } from "../../assets/Group6_x2.svg"; // Import SVG as React component
import axios from "axios";
const avatars = [
    { src: avatar1, top: "20%", left: "-2%" },
    { src: avatar2, top: "1%", left: "70%" },
    { src: avatar3, top: "65%", left: "-2%" },
    { src: avatar4, top: "50%", left: "92%" },
    { src: avatar5, top: "43%", left: "43%" },
    { src: avatar6, top: "72%", left: "22%" },
    { src: avatar7, top: "25%", left: "75%" },
    { src: avatar8, top: "85%", left: "70%" },
    { src: locationIcon, top: "-6%", left: "28%" },
    { src: messageIcon, top: "91%", left: "30%" },
];

const LandingPage = ({ setIsLoggedIn }) => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [generateOtp, setGenerateOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        otp: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
        setIsLoginModalOpen(false);
        setGenerateOtp(false);
    };

    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);
        setGenerateOtp(false);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsSignUpModalOpen(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const loginWithGoogle = () => {
        window.open("http://localhost:8080/auth/google/callback", "_self");
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email address is invalid";
        if (!formData.mobile) errors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = "Mobile number is invalid";
        if (!formData.password) errors.password = "Password is required";
        if (!formData.confirmPassword) errors.confirmPassword = "Confirm password is required";
        else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log("Initial form data", formData);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:8080/api/signup", formData);
            console.log("User signed up successfully:", response.data);
            closeSignUpModal();
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            setServerError(error.response?.data?.message || "An error occurred during sign-up");
        }
    };

    const handleLogin = async (e) => {
        e.stopPropagation()
        setError("");
        console.log("Login attempt with:", email, password);
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }
        const loginData = { email, password };
        try {
            const response = await axios.post("http://localhost:8080/auth/login", loginData, { withCredentials: true });
            console.log("Response from backend:", response);
            if (response.data.success) {
                console.log("login successful");
                setIsLoggedIn(true);
                navigate('/userhome');
                // window.location.href = "/userhome"; 
            } else {
                setError("Invalid email or password.");
                console.log("Error message:", error);
                
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            setError(errorMessage);
        }
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.circleContainer}>
                <div className={`${styles.circle} ${styles.large}`}></div>
                <div className={`${styles.circle} ${styles.medium}`}></div>
                <div className={`${styles.circle} ${styles.small}`}></div>
                {avatars.map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar.src}
                        className={styles.avatar}
                        style={{ top: avatar.top, left: avatar.left }}
                        alt={`avatar ${index + 1}`}
                    />
                ))}
            </div>
            <h1 className={styles.title}>Let’s meeting new people around you</h1>
            <button className={`${styles.btn} ${styles.primary}`} onClick={openLoginModal}>
                <PhoneIcon className={styles.iconImage} />
                Login with Phone
            </button>
            <button className={`${styles.btn} ${styles.secondary}`} onClick={loginWithGoogle}>
                <span>
                    <GoogleLogo className={styles.iconImage} />
                </span>
                Login with Google
            </button>
            <p className={styles.signupText}>
                Don't have an account?{" "}
                <a href="#signup" onClick={openSignUpModal}>
                    Sign Up
                </a>
            </p>
            {/* Sign up form  */}
            {isSignUpModalOpen && (
                <div className={styles.modalOverlay} onClick={closeSignUpModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Sign up</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Value"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {formErrors.name && <p className={styles.errorText}>{formErrors.name}</p>}

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Value"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && <p className={styles.errorText}>{formErrors.email}</p>}

                            <label>Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Value"
                                value={formData.mobile}
                                onChange={handleInputChange}
                            />
                            {formErrors.mobile && <p className={styles.errorText}>{formErrors.mobile}</p>}

                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Value"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {formErrors.password && <p className={styles.errorText}>{formErrors.password}</p>}

                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Value"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            {formErrors.confirmPassword && <p className={styles.errorText}>{formErrors.confirmPassword}</p>}

                            {!generateOtp && (
                                <a href="#generate-otp" onClick={() => setGenerateOtp(true)}>
                                    Generate OTP
                                </a>
                            )}
                            {generateOtp && (
                                <>
                                    <label>OTP</label>
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="We sent a code to Email/Phone"
                                        value={formData.otp}
                                        onChange={handleInputChange}
                                    />
                                </>
                            )}
                            <button type="submit" className={`${styles.btn} ${styles.register}`}>
                                Register
                            </button>
                            {serverError && <p className={styles.errorText}>{serverError}</p>}
                        </form>
                        <p className={styles.signupText}>
                            Already have an account?{" "}
                            <a href="#signup" onClick={openLoginModal}>
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            )}
            {isLoginModalOpen && (
                <div className={styles.modalOverlay} onClick={closeLoginModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <label>Email/Mobile</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />{" "}
                            <label>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />{" "}
                            <button type="submit" className={`${styles.btn} ${styles.register}`} >Log In</button>
                        </form>
                        <p className={styles.forgotPassword}>
                            <a href="#forgot-password">Forgot password?</a>
                        </p>
                        <p className={styles.signupText}>
                            Don't have an account?{" "}
                            <a href="#signup" onClick={openSignUpModal}>
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;

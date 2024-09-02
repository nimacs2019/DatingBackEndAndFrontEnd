import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const ProfileContext = createContext();

// Create a provider component
const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMyProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/my-profile", { withCredentials: true });
            setProfileData(response.data);
        } catch (error) {
            setError("Failed to load profile data. Please try again later.");
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData, loading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Export the context and provider
export { ProfileContext, ProfileProvider };

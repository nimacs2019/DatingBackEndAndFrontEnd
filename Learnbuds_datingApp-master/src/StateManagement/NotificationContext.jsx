import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [reqNotifications, setReqNotifications] = useState([]);
    const [hasRequests, setHasRequests] = useState(false);

    const checkForRequests = async (userId) => {
        try {
            const response = await axios.get("http://localhost:8080/api/req-notifications", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const filteredNotifications = response.data.filter((notification) => notification.sender.userId === userId);
            setHasRequests(filteredNotifications.length > 0);
            setReqNotifications(filteredNotifications);
        } catch (error) {
            console.error("Error checking for requests:", error);
        }
    };

    // useEffect(() => {
    //     checkForRequests();
    // }, []);

    return (
        <NotificationContext.Provider
            value={{ setReqNotifications, reqNotifications, setHasRequests, hasRequests, checkForRequests }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
// Export the context and provider
export { NotificationContext, NotificationProvider };

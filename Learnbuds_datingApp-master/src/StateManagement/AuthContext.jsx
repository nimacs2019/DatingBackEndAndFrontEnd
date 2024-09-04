import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthStatus = () => {
        const connectionId = Cookies.get("connect.sid");
        const userToken = Cookies.get("jwt");
        setIsLoggedIn(!!connectionId || !!userToken);
    };

    const logout = () => {
        Cookies.remove("connect.sid");
        Cookies.remove("jwt");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return <AuthContext.Provider value={{ setIsLoggedIn,isLoggedIn, checkAuthStatus, logout }}>{children}</AuthContext.Provider>;
};
